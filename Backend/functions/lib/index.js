"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTrainingReminders = exports.issueTrainingCertificate = exports.calculateMonthlyAttendance = exports.onRequestUpdated = exports.onRequestCreated = exports.updateUserRole = exports.createUser = void 0;
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-functions/v2/firestore");
const scheduler_1 = require("firebase-functions/v2/scheduler");
const admin = __importStar(require("firebase-admin"));
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
exports.createUser = (0, https_1.onCall)(async (request) => {
    // Only super admins can create users
    if (!request.auth || !(await isSuperAdmin(request.auth.uid))) {
        throw new https_1.HttpsError('permission-denied', 'Only super admins can create users');
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
        await db.collection('users').doc(userRecord.uid).set(Object.assign(Object.assign({ uid: userRecord.uid, email }, userData), { isActive: true, createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() }));
        // Send notification
        await createNotification({
            userId: userRecord.uid,
            title: 'Welcome to SMG Portal',
            message: `Your account has been created. Use ${email} to login.`,
            type: 'info',
            category: 'announcement',
        });
        return { success: true, userId: userRecord.uid };
    }
    catch (error) {
        throw new https_1.HttpsError('internal', error.message);
    }
});
/**
 * Update user role and custom claims
 */
exports.updateUserRole = (0, https_1.onCall)(async (request) => {
    if (!request.auth || !(await isSuperAdmin(request.auth.uid))) {
        throw new https_1.HttpsError('permission-denied', 'Only super admins can update roles');
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
    }
    catch (error) {
        throw new https_1.HttpsError('internal', error.message);
    }
});
// ========================================
// REQUEST APPROVAL WORKFLOW
// ========================================
/**
 * Trigger when a request is created
 */
exports.onRequestCreated = (0, firestore_1.onDocumentCreated)('requests/{requestId}', async (event) => {
    var _a;
    const request = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    const requestId = event.params.requestId;
    if (!request)
        return;
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
exports.onRequestUpdated = (0, firestore_1.onDocumentUpdated)('requests/{requestId}', async (event) => {
    var _a, _b;
    const before = (_a = event.data) === null || _a === void 0 ? void 0 : _a.before.data();
    const after = (_b = event.data) === null || _b === void 0 ? void 0 : _b.after.data();
    const requestId = event.params.requestId;
    if (!before || !after)
        return;
    // If status changed
    if (before.status !== after.status) {
        let notifType = 'info';
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
exports.calculateMonthlyAttendance = (0, scheduler_1.onSchedule)({
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
exports.issueTrainingCertificate = (0, firestore_1.onDocumentUpdated)('training/enrollments/{enrollmentId}', async (event) => {
    var _a, _b;
    const before = (_a = event.data) === null || _a === void 0 ? void 0 : _a.before.data();
    const after = (_b = event.data) === null || _b === void 0 ? void 0 : _b.after.data();
    const enrollmentId = event.params.enrollmentId;
    if (!before || !after)
        return;
    // If enrollment just completed and passed
    if (before.enrollmentStatus !== 'completed' &&
        after.enrollmentStatus === 'completed' &&
        after.passed) {
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
});
/**
 * Send reminder for upcoming mandatory training
 * Runs daily at 9 AM IST
 */
exports.sendTrainingReminders = (0, scheduler_1.onSchedule)({
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
async function isSuperAdmin(uid) {
    var _a;
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists && ((_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.role) === 'super_admin';
}
async function createNotification(data) {
    await db.collection(`notifications/${data.userId}/messages`).add(Object.assign(Object.assign({}, data), { isRead: false, createdAt: admin.firestore.FieldValue.serverTimestamp(), expiresAt: getExpiryDate(30) }));
}
function getExpiryDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return admin.firestore.Timestamp.fromDate(date);
}
//# sourceMappingURL=index.js.map