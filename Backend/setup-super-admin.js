/**
 * Setup Script: Create Super Admin User in Firestore
 * Run this once to create the first super admin user
 */

const admin = require('firebase-admin');
const serviceAccount = require('./smg-employee-portal-firebase-adminsdk.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const SUPER_ADMIN_UID = 'Qo0hfHS7m6eQpQElylhe54HPDRG2';

async function setupSuperAdmin() {
  try {
    console.log('🚀 Setting up Super Admin user...\n');

    // 1. Get user info from Authentication
    const userRecord = await auth.getUser(SUPER_ADMIN_UID);
    console.log('✅ Found user in Authentication:');
    console.log(`   Email: ${userRecord.email}`);
    console.log(`   UID: ${userRecord.uid}\n`);

    // 2. Set custom claims for role-based access
    await auth.setCustomUserClaims(SUPER_ADMIN_UID, {
      role: 'super_admin'
    });
    console.log('✅ Set custom claims: { role: "super_admin" }\n');

    // 3. Create user document in Firestore
    const userData = {
      email: userRecord.email,
      fullName: 'Super Admin',
      role: 'super_admin',
      department: 'IT',
      employeeId: 'SA001',
      phoneNumber: '+91XXXXXXXXXX',
      dateOfJoining: '2024-01-01',
      designation: 'System Administrator',
      isActive: true,
      profilePicture: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phoneNumber: ''
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('users').doc(SUPER_ADMIN_UID).set(userData);
    console.log('✅ Created user document in Firestore\n');

    // 4. Verify the setup
    const userDoc = await db.collection('users').doc(SUPER_ADMIN_UID).get();
    if (userDoc.exists) {
      console.log('✅ Verification successful!');
      console.log('   User document created with data:');
      console.log(JSON.stringify(userDoc.data(), null, 2));
      console.log('\n🎉 Super Admin setup complete!\n');
      console.log('📝 You can now login with:');
      console.log(`   Email: ${userRecord.email}`);
      console.log('   Password: (the password you set in Firebase Console)\n');
      console.log('🔐 Custom claims set - user has super_admin role');
      console.log('📊 Access the portal and all admin features are now available!\n');
    } else {
      console.error('❌ Verification failed - user document not found');
    }

  } catch (error) {
    console.error('❌ Error setting up super admin:', error);
    process.exit(1);
  }

  process.exit(0);
}

setupSuperAdmin();
