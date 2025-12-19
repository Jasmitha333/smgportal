/**
 * Simple Setup Script: Create Super Admin User in Firestore
 * Uses Firebase CLI authentication (no service account key needed)
 * 
 * Run: node setup-super-admin-simple.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Firebase configuration (from your .env.local)
const firebaseConfig = {
  apiKey: "AIzaSyDhOd3yN2S3f_sxBh-s7W9kWAJt_m_Qzac",
  authDomain: "smg-employee-portal.firebaseapp.com",
  projectId: "smg-employee-portal",
  storageBucket: "smg-employee-portal.firebasestorage.app",
  messagingSenderId: "717700936442",
  appId: "1:717700936442:web:b6b8ad87e81aed1e8a9e2b",
  measurementId: "G-JNWS92KG84"
};

const SUPER_ADMIN_UID = 'Qo0hfHS7m6eQpQElylhe54HPDRG2';

async function setupSuperAdmin() {
  try {
    console.log('🚀 Setting up Super Admin user...\n');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // User data
    const userData = {
      email: '', // You'll need to fill this from Firebase Console
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
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Create user document
    const userRef = doc(db, 'users', SUPER_ADMIN_UID);
    await setDoc(userRef, userData);

    console.log('✅ User document created successfully!\n');
    console.log('📝 User ID:', SUPER_ADMIN_UID);
    console.log('📊 Role: super_admin\n');
    console.log('⚠️  IMPORTANT: You still need to update the email field!');
    console.log('   Go to Firestore Console and add the email address:\n');
    console.log('   https://console.firebase.google.com/project/smg-employee-portal/firestore/data/users/' + SUPER_ADMIN_UID);
    console.log('\n🎉 Setup complete! You can now login with super admin credentials.\n');

  } catch (error) {
    console.error('❌ Error setting up super admin:', error);
    if (error.code === 'permission-denied') {
      console.log('\n💡 TIP: This might fail due to security rules.');
      console.log('   Use the Firebase Console manual method instead.');
      console.log('   See SETUP_SUPER_ADMIN.md for instructions.\n');
    }
    process.exit(1);
  }

  process.exit(0);
}

setupSuperAdmin();
