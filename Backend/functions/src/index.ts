import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// ========================================
// USER MANAGEMENT FUNCTIONS
// ========================================

/**
 * Create a new user with custom claims for role-based access
 */
export const createUser = onCall(async (request) => {
    // Only super admins can create users
    if (!request.auth || !(await isSuperAdmin(request.auth.uid))) {
        throw new HttpsError('permission-denied', 'Only super admins can create users');
    }

    const { email, password, userData } = request.data;

    try {
        // Create authentication user
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: userData.fullName,
        });

        // Set custom claims for role
        await auth.setCustomUserClaims(userRecord.uid, {
            role: userData.role,
            department: userData.department,
        });

        // Create user document in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            uid: userRecord.uid,
            email,
            ...userData,
            isActive: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Send notification
        await createNotification({
            userId: userRecord.uid,
            title: 'Welcome to SMG Portal',
            message: `Your account has been created. Use ${email} to login.`,
            type: 'info',
            category: 'announcement',
        });

        return { success: true, userId: userRecord.uid };
    } catch (error: any) {
        throw new HttpsError('internal', error.message);
    }
});

/**
 * Update user role and custom claims
 */
export const updateUserRole = onCall(async (request) => {
    if (!request.auth || !(await isSuperAdmin(request.auth.uid))) {
        throw new HttpsError('permission-denied', 'Only super admins can update roles');
    }

    const { userId, role, permissions, adminDepartments } = request.data;

    try {
        // Update custom claims
        await auth.setCustomUserClaims(userId, { role });

        // Update Firestore document
        await db.collection('users').doc(userId).update({
            role,
            permissions: permissions || [],
            adminDepartments: adminDepartments || [],
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return { success: true };
    } catch (error: any) {
        throw new HttpsError('internal', error.message);
    }
});

// ========================================
// REQUEST APPROVAL WORKFLOW
// ========================================

/**
 * Trigger when a request is created
 */
export const onRequestCreated = onDocumentCreated('requests/{requestId}', async (event) => {
    const request = event.data?.data();
    const requestId = event.params.requestId;

    if (!request) return;

    // Notify approvers
    const approvers = request.approvers || [];
    for (const approver of approvers) {
        await createNotification({
            userId: approver.userId,
            title: 'New Request for Approval',
            message: `${request.employeeName} submitted ${request.requestType}: ${request.title}`,
            type: 'info',
            category: 'approval',
            actionUrl: `/requests/${requestId}`,
            actionRequired: true,
        });
    }

    // Notify user
    await createNotification({
        userId: request.userId,
        title: 'Request Submitted',
        message: `Your ${request.requestType} request has been submitted successfully.`,
        type: 'success',
        category: 'request',
    });
});

/**
 * Trigger when request status changes
 */
export const onRequestUpdated = onDocumentUpdated('requests/{requestId}', async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    const requestId = event.params.requestId;

    if (!before || !after) return;

    // If status changed
    if (before.status !== after.status) {
        let notifType: 'success' | 'error' | 'info' = 'info';
        let notifMessage = '';

        switch (after.status) {
            case 'approved':
                notifType = 'success';
                notifMessage = `Your ${after.requestType} request has been approved!`;
                break;
            case 'rejected':
                notifType = 'error';
                notifMessage = `Your ${after.requestType} request has been rejected.`;
                break;
            case 'in_progress':
                notifType = 'info';
                notifMessage = `Your ${after.requestType} request is being processed.`;
                break;
            case 'completed':
                notifType = 'success';
                notifMessage = `Your ${after.requestType} request has been completed!`;
                break;
        }

        if (notifMessage) {
            await createNotification({
                userId: after.userId,
                title: 'Request Status Updated',
                message: notifMessage,
                type: notifType,
                category: 'request',
                actionUrl: `/requests/${requestId}`,
            });
        }
    }
});

// ========================================
// ATTENDANCE AUTO-CALCULATIONS
// ========================================

/**
 * Calculate monthly attendance summary
 * Runs daily at midnight IST
 */
export const calculateMonthlyAttendance = onSchedule({
    schedule: '0 0 * * *',
    timeZone: 'Asia/Kolkata',
}, async () => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Get all users
    const usersSnapshot = await db.collection('users')
        .where('isActive', '==', true)
        .where('role', '==', 'employee')
        .get();

    const batch = db.batch();

    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;

        // Get attendance records for current month
        const recordsSnapshot = await db.collection(`attendance/${userId}/records`)
            .where('date', '>=', new Date(now.getFullYear(), now.getMonth(), 1))
            .get();

        let presentDays = 0;
        let absentDays = 0;
        let halfDays = 0;
        let leaveDays = 0;
        let totalWorkHours = 0;
        let overtimeHours = 0;

        recordsSnapshot.forEach(doc => {
            const record = doc.data();
            switch (record.status) {
                case 'present':
                    presentDays++;
                    break;
                case 'absent':
                    absentDays++;
                    break;
                case 'half_day':
                    halfDays++;
                    break;
                case 'leave':
                    leaveDays++;
                    break;
            }
            totalWorkHours += record.workHours || 0;
            overtimeHours += record.overtimeHours || 0;
        });

        // Update monthly summary
        const summaryRef = db.doc(`attendance/${userId}/monthlySummary/${currentMonth}`);
        batch.set(summaryRef, {
            month: currentMonth,
            totalDays: recordsSnapshot.size,
            presentDays,
            absentDays,
            halfDays,
            leaveDays,
            totalWorkHours,
            overtimeHours,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    }

    await batch.commit();
    console.log(`Updated monthly attendance for ${usersSnapshot.size} users`);
});

// ========================================
// TRAINING MANAGEMENT
// ========================================

/**
 * Issue certificate when training is completed
 */
export const issueTrainingCertificate = onDocumentUpdated(
    'training/enrollments/{enrollmentId}',
    async (event) => {
        const before = event.data?.before.data();
        const after = event.data?.after.data();
        const enrollmentId = event.params.enrollmentId;

        if (!before || !after) return;

        // If enrollment just completed and passed
        if (
            before.enrollmentStatus !== 'completed' &&
            after.enrollmentStatus === 'completed' &&
            after.passed
        ) {
            // Generate certificate (in real app, use a PDF library or external service)
            const certificateUrl = `https://certificates.smg-portal.com/${enrollmentId}`;

            // Update enrollment with certificate
            if (event.data) {
                await event.data.after.ref.update({
                    certificateIssued: true,
                    certificateUrl,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            }

            // Add to user's training history
            await db.collection(`training/userHistory/${after.userId}/courses`).add({
                sessionId: after.sessionId,
                title: after.sessionTitle,
                completedDate: after.completionDate,
                duration: after.duration || '',
                hoursCompleted: after.hoursCompleted || 0,
                certificateUrl,
                score: after.assessmentScore || 0,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            // Notify user
            await createNotification({
                userId: after.userId,
                title: 'Certificate Issued!',
                message: `Congratulations! Your certificate for "${after.sessionTitle}" is ready.`,
                type: 'success',
                category: 'training',
                actionUrl: certificateUrl,
            });
        }
    }
);

/**
 * Send reminder for upcoming mandatory training
 * Runs daily at 9 AM IST
 */
export const sendTrainingReminders = onSchedule({
    schedule: '0 9 * * *',
    timeZone: 'Asia/Kolkata',
}, async () => {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    // Get upcoming mandatory sessions in next 3 days
    const sessionsSnapshot = await db.collection('training/sessions')
        .where('isMandatory', '==', true)
        .where('status', '==', 'upcoming')
        .where('startDate', '<=', threeDaysFromNow)
        .get();

    for (const sessionDoc of sessionsSnapshot.docs) {
        const session = sessionDoc.data();

        // Get all active employees
        const usersSnapshot = await db.collection('users')
            .where('isActive', '==', true)
            .where('role', '==', 'employee')
            .get();

        for (const userDoc of usersSnapshot.docs) {
            const userId = userDoc.id;

            // Check if already enrolled
            const enrollmentSnapshot = await db.collection('training/enrollments')
                .where('userId', '==', userId)
                .where('sessionId', '==', sessionDoc.id)
                .get();

            if (enrollmentSnapshot.empty) {
                // Send reminder
                await createNotification({
                    userId,
                    title: 'Mandatory Training Reminder',
                    message: `Don't forget to enroll in "${session.title}" starting on ${session.startDate.toDate().toLocaleDateString()}`,
                    type: 'warning',
                    category: 'reminder',
                    actionUrl: `/training/sessions/${sessionDoc.id}`,
                    actionRequired: true,
                });
            }
        }
    }
});

// ========================================
// HELPER FUNCTIONS
// ========================================

async function isSuperAdmin(uid: string): Promise<boolean> {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists && userDoc.data()?.role === 'super_admin';
}

async function createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    category: string;
    actionUrl?: string;
    actionRequired?: boolean;
}): Promise<void> {
    await db.collection(`notifications/${data.userId}/messages`).add({
        ...data,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: getExpiryDate(30), // 30 days expiry
    });
}

function getExpiryDate(days: number): admin.firestore.Timestamp {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return admin.firestore.Timestamp.fromDate(date);
}
