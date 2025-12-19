# Setup Super Admin User

## Steps to Complete:

### 1. Download Firebase Admin SDK Key

1. Go to Firebase Console → Project Settings → Service Accounts
   https://console.firebase.google.com/project/smg-employee-portal/settings/serviceaccounts/adminsdk

2. Click "Generate new private key"

3. Download the JSON file

4. Rename it to: `smg-employee-portal-firebase-adminsdk.json`

5. Move it to: `backend/` folder (same folder as this README)

⚠️ **IMPORTANT:** This file contains sensitive credentials. It's already in .gitignore, never commit it!

### 2. Run the Setup Script

```bash
cd backend
node setup-super-admin.js
```

The script will:
- ✅ Verify the user exists in Firebase Authentication
- ✅ Set custom claims (role: "super_admin")
- ✅ Create user document in Firestore with all required fields
- ✅ Verify the setup was successful

### 3. Login to Portal

After setup completes:
1. Go to your app: `npm run dev`
2. Navigate to login page
3. Use the email and password from Firebase Authentication
4. You should have full super admin access!

---

## Alternative: Manual Setup (if script doesn't work)

### Create User Document in Firestore:

1. Go to: https://console.firebase.google.com/project/smg-employee-portal/firestore

2. Click "Start collection" or open `users` collection

3. Add document with ID: `Qo0hfHS7m6eQpQElylhe54HPDRG2`

4. Add these fields:

```
email: (copy from authentication)
fullName: "Super Admin"
role: "super_admin"
department: "IT"
employeeId: "SA001"
phoneNumber: "+91XXXXXXXXXX"
dateOfJoining: "2024-01-01"
designation: "System Administrator"
isActive: true
profilePicture: ""
createdAt: [timestamp]
updatedAt: [timestamp]
```

5. Add nested fields for `address`:
```
address.street: ""
address.city: ""
address.state: ""
address.pincode: ""
address.country: "India"
```

6. Add nested fields for `emergencyContact`:
```
emergencyContact.name: ""
emergencyContact.relationship: ""
emergencyContact.phoneNumber: ""
```

### Set Custom Claims:

Run this in Firebase Functions shell or Cloud Shell:

```javascript
admin.auth().setCustomUserClaims('Qo0hfHS7m6eQpQElylhe54HPDRG2', { role: 'super_admin' });
```

---

## Troubleshooting

**Error: Cannot find module './smg-employee-portal-firebase-adminsdk.json'**
- Make sure you downloaded the service account key
- Rename it exactly as shown above
- Place it in the `backend/` folder

**Permission denied errors**
- Make sure Firestore rules are deployed: `firebase deploy --only firestore:rules`
- The script uses Admin SDK which bypasses security rules

**User not found**
- Verify the UID is correct in Firebase Authentication console
- Make sure you created the user in Authentication first
