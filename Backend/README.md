# SMG Employee Portal - Firebase Backend Setup Guide

## ✅ **Deployment Status**

**All backend services successfully deployed!**

- ✅ Firestore Security Rules
- ✅ Firestore Indexes  
- ✅ Storage Security Rules
- ✅ Cloud Functions (7 functions)
  - `createUser` - User creation with role assignment
  - `updateUserRole` - Role management for admins
  - `onRequestCreated` - Auto-notification on new requests
  - `onRequestUpdated` - Status change notifications
  - `calculateMonthlyAttendance` - Daily cron job (5:00 AM IST)
  - `issueTrainingCertificate` - Auto-certificate on course completion
  - `sendTrainingReminders` - Daily training reminders (9:00 AM IST)

**Firebase Console:** https://console.firebase.google.com/project/smg-employee-portal/overview

---

## 📋 **Prerequisites**

Before you begin, ensure you have:
- Node.js 18 or higher installed
- npm or yarn package manager
- A Google account for Firebase
- Firebase CLI installed globally

```bash
npm install -g firebase-tools
```

---

## 🚀 **Step-by-Step Setup Instructions**

### **STEP 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `SMG-Employee-Portal`
4. Disable Google Analytics (optional)
5. Click "Create Project"

---

### **STEP 2: Enable Firebase Services**

#### **2.1 Enable Authentication**
1. In Firebase Console, go to **Build** → **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. (Optional) Enable **Google** sign-in for easier login

#### **2.2 Create Firestore Database**
1. Go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Select **Start in production mode**
4. Choose location: **asia-south1 (Mumbai)** or closest to you
5. Click **Enable**

#### **2.3 Enable Storage**
1. Go to **Build** → **Storage**
2. Click **Get Started**
3. Start in **production mode**
4. Use same location as Firestore
5. Click **Done**

---

### **STEP 3: Get Firebase Configuration**

1. In Firebase Console, click ⚙️ **Project Settings**
2. Scroll down to **Your apps**
3. Click **</> Web** icon
4. Register app name: `SMG Portal Web`
5. Copy the `firebaseConfig` object

You'll get something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "smg-employee-portal.firebaseapp.com",
  projectId: "smg-employee-portal",
  storageBucket: "smg-employee-portal.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXX"
};
```

---

### **STEP 4: Configure Backend**

#### **4.1 Login to Firebase CLI**
```bash
cd backend
firebase login
```

#### **4.2 Link to Your Firebase Project**
```bash
firebase use --add
```
- Select your project `SMG-Employee-Portal`
- Set alias as `default`

#### **4.3 Update `.firebaserc`**
Edit `backend/.firebaserc`:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

#### **4.4 Install Dependencies**
```bash
npm install
```

---

### **STEP 5: Deploy Firestore Rules & Indexes**

```bash
# Deploy Firestore security rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes
```

Wait for indexes to build (check Firebase Console → Firestore → Indexes)

---

### **STEP 6: Deploy Storage Rules**

```bash
firebase deploy --only storage
```

---

### **STEP 7: Build & Deploy Cloud Functions**

```bash
# Build TypeScript
npm run build

# Deploy all functions
firebase deploy --only functions
```

This will deploy:
- `createUser` - User management
- `updateUserRole` - Role updates
- `onRequestCreated` - Request notifications
- `onRequestUpdated` - Status change notifications
- `calculateMonthlyAttendance` - Automated attendance summary
- `issueTrainingCertificate` - Auto-certificate generation
- `sendTrainingReminders` - Daily training reminders

---

### **STEP 8: Configure Frontend**

#### **8.1 Create Environment File**
In your **frontend project root** (`smgintern/`), create `.env.local`:

```bash
# Copy from .env.example
cp .env.example .env.local
```

#### **8.2 Add Firebase Credentials**
Edit `.env.local` with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=smg-employee-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=smg-employee-portal
VITE_FIREBASE_STORAGE_BUCKET=smg-employee-portal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
```

#### **8.3 Create Firebase Config in Frontend**
Create `src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

---

### **STEP 9: Create Initial Super Admin User**

Use Firebase Console to create first super admin:

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Email: `admin@smg-portal.com`
4. Password: `Admin@123` (change after first login)
5. Click **Add User**
6. Note the **User UID**

Now manually create user document in Firestore:

1. Go to **Firestore Database**
2. Click **+ Start collection**
3. Collection ID: `users`
4. Document ID: `<paste the User UID>`
5. Add fields:

```javascript
{
  uid: "<User UID>",
  email: "admin@smg-portal.com",
  role: "super_admin",
  employeeId: "SMG-ADMIN-001",
  firstName: "Super",
  lastName: "Admin",
  fullName: "Super Admin",
  department: "Administration",
  designation: "System Administrator",
  location: "Head Office",
  isActive: true,
  permissions: ["*"],
  phone: "+91 9999900000",
  dateOfJoining: <current timestamp>,
  createdAt: <current timestamp>,
  updatedAt: <current timestamp>
}
```

7. Set custom claims in Firebase Console:
   - Click on the user
   - Scroll to **Custom claims**
   - Add: `{"role": "super_admin"}`

---

### **STEP 10: Test Your Setup**

#### **10.1 Test Authentication**
```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebase';

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'admin@smg-portal.com',
      'Admin@123'
    );
    console.log('Logged in:', userCredential.user);
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

#### **10.2 Test Firestore Read**
```typescript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';

const getUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  console.log('User data:', userDoc.data());
};
```

#### **10.3 Test Cloud Function**
Use Firebase Console **Functions** tab or test locally:

```bash
# Run functions emulator
cd backend
npm run serve
```

---

## 📁 **Backend Folder Structure**

```
backend/
├── functions/
│   ├── src/
│   │   └── index.ts          # Cloud Functions code
│   └── lib/                  # Compiled JavaScript (auto-generated)
├── firestore-rules/
│   ├── firestore.rules       # Database security rules
│   └── firestore.indexes.json # Database indexes
├── storage-rules/
│   └── storage.rules         # Storage security rules
├── firebase.json             # Firebase configuration
├── .firebaserc              # Firebase project mapping
├── package.json
├── tsconfig.json
└── DATABASE_SCHEMA.md        # Complete database documentation
```

---

## 🔒 **Security Rules Summary**

### **Employee Can:**
✅ Read/update own profile (limited fields)
✅ Read/create own requests
✅ Read/create attendance records
✅ Enroll in training
✅ Read own documents
✅ Upload own documents

### **Admin Can:**
✅ Everything employees can do
✅ Read all employees in their department
✅ Approve/reject requests from their department
✅ Create announcements
✅ Manage assets

### **Super Admin Can:**
✅ Full access to all collections
✅ Create/update/delete users
✅ Manage all requests
✅ System configuration
✅ Access payroll

---

## 📊 **Database Collections**

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema documentation.

**Main Collections:**
1. `users/` - All users (employees, admins, super admins)
2. `attendance/` - Attendance records and summaries
3. `requests/` - All request types (leave, asset, etc.)
4. `training/` - Training sessions and enrollments
5. `assets/` - Company assets tracking
6. `documents/` - User documents
7. `payroll/` - Salary records
8. `services/` - Transport, canteen, uniform, etc.
9. `notifications/` - User notifications
10. `departments/` - Department info
11. `announcements/` - Company announcements

---

## 🛠️ **Common Commands**

```bash
# Backend commands (run from backend/ folder)
npm run build              # Compile TypeScript
npm run serve              # Run functions locally
firebase deploy            # Deploy everything
firebase deploy --only functions  # Deploy only functions
firebase deploy --only firestore  # Deploy only Firestore rules
firebase deploy --only storage    # Deploy only Storage rules

# View logs
firebase functions:log

# Check deployment status
firebase projects:list
```

---

## 🚨 **Troubleshooting**

### **Issue: Firestore rules deployment fails**
**Solution:** Check for syntax errors in `firestore.rules`

### **Issue: Functions not deploying**
**Solution:** 
```bash
cd functions
npm run build
# Check for TypeScript errors
```

### **Issue: Authentication not working**
**Solution:** 
1. Check `.env.local` has correct values
2. Verify Email/Password is enabled in Firebase Console
3. Check browser console for CORS errors

### **Issue: Permission denied errors**
**Solution:** 
1. Verify user has correct role in Firestore `users/` collection
2. Check custom claims: `firebase auth:export users.json`
3. Re-deploy Firestore rules

---

## 📞 **Support**

- Firebase Documentation: https://firebase.google.com/docs
- Firestore Rules: https://firebase.google.com/docs/firestore/security/get-started
- Cloud Functions: https://firebase.google.com/docs/functions

---

## 📝 **Next Steps**

1. ✅ Complete backend setup (you're here!)
2. 🔄 Integrate frontend with Firebase
3. 🧪 Test all user roles
4. 📱 Add real-time listeners
5. 🎨 Build admin dashboard
6. 📊 Add analytics
7. 🚀 Deploy to production

---

**Good luck with your SMG Employee Portal! 🎉**
