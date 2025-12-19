# SMG Employee Portal - AI Agent Instructions

## Project Overview
This is a **full-stack employee management system** for SMG Scooters manufacturing company with three distinct portals (Employee, Admin, Super Admin). The frontend is a React+TypeScript SPA with mock data, while the backend is a production Firebase deployment with Cloud Functions, Firestore, and Storage.

**Critical**: Frontend currently uses **mock data** (`src/mock/mockData.ts` and `AppContextEnhanced.tsx`), not live Firebase integration. Backend is fully functional but not connected to frontend.

## Architecture

### Frontend (`SMG/`)
- **Tech**: React 18 + TypeScript + Vite + TailwindCSS
- **State**: Context API (`AuthContext.tsx`, `AppContextEnhanced.tsx`)
- **Routing**: Manual routing in `App.tsx` (no react-router-dom integrated yet)
- **UI**: Radix UI primitives with shadcn/ui patterns in `components/ui/`
- **Data**: Mock data stored in contexts, NOT connected to Firebase backend

### Backend (`Backend/`)
- **Tech**: Firebase (Functions v2, Firestore, Storage, Auth)
- **Functions**: 7 Cloud Functions deployed at `https://console.firebase.google.com/project/smg-employee-portal`
  - `createUser`, `updateUserRole` (user management)
  - `onRequestCreated`, `onRequestUpdated` (approval workflows with notifications)
  - `calculateMonthlyAttendance` (cron: 5AM IST daily)
  - `issueTrainingCertificate`, `sendTrainingReminders` (cron: 9AM IST daily)
- **Schema**: Detailed in `Backend/DATABASE_SCHEMA.md` - multi-level collections with subcollections

## Key Conventions

### Role-Based Access Control
Three roles defined in Firestore and security rules:
- `employee`: Basic access, own records only
- `admin`: Department-level management (via `adminDepartments[]` field)
- `super_admin`: Full system access

**Security rules** (`Backend/firestore-rules/firestore.rules`): Use helper functions like `isSuperAdmin()`, `managesDepartment()`. Read these before modifying data access patterns.

### Component Patterns
- **UI Components** (`SMG/src/components/ui/`): shadcn/ui style with CVA (Class Variance Authority)
  - Use `cn()` utility from `utils.ts` for className merging
  - Import with version suffixes: `@radix-ui/react-dialog@1.1.6`
- **Page Components**: Organized by role
  - `pages/` - Employee views
  - `pages/admin/` - Admin views
  - `pages/employee/` - Shared employee components
- **State Management**: Use context hooks (`useAuth()`, `useApp()`) - avoid prop drilling

### Data Flow (Currently Mock)
```
User Action → Context Update → Local State → UI Re-render
(NO Firebase calls in frontend currently)
```

### Future Integration Pattern
When connecting Firebase:
1. Replace context state with Firestore queries
2. Use Firebase Auth for `AuthContext.tsx`
3. Replace mock CRUD operations with Cloud Functions calls
4. Follow backend schema in `DATABASE_SCHEMA.md` exactly

## Development Workflows

### Frontend Dev
```powershell
cd SMG
npm run dev  # Starts Vite dev server (usually port 5173)
npm run build  # Production build to build/
```

### Backend Dev
```powershell
cd Backend
npm run build  # Compile TypeScript in functions/src/
firebase deploy --only functions  # Deploy all functions
firebase deploy --only firestore:rules  # Deploy security rules
firebase emulators:start  # Local testing (not configured)
```

### Testing Pattern
**No automated tests exist**. Manual testing via:
- Frontend: Login with demo users (roles switchable via UI toggle)
- Backend: Firebase Console → Functions → Logs

## Critical Files to Understand

### Data Schema
- `Backend/DATABASE_SCHEMA.md` - **Essential**: All Firestore collections, field types, subcollections
- `Backend/firestore-rules/firestore.rules` - Security logic (lines 1-100 show helper functions)

### State Management
- `SMG/src/context/AppContextEnhanced.tsx` - All app state (470 lines of mock data/handlers)
- `SMG/src/context/AuthContext.tsx` - Mock auth using localStorage

### Cloud Functions
- `Backend/functions/src/index.ts` - All 7 functions with TypeScript definitions
  - Lines 1-90: User management
  - Lines 91-180: Request approval workflows
  - Lines 181-270: Attendance calculations
  - Lines 271-397: Training automation

### Routing
- `SMG/src/App.tsx` - Massive 673-line file with manual routing logic, all page imports

## Module-Specific Notes

### Attendance System
- Frontend: Manual clock-in/out updates `isClockedIn` state
- Backend: `calculateMonthlyAttendance` aggregates to `attendance/{userId}/monthlySummary/{year-month}`
- Subcollections: `attendance/{userId}/records/{recordId}`

### Request Management
Supports 10 types: leave, document, asset, SIM, transport, uniform, canteen, guest house, welfare, general
- **Approval Flow**: Multi-level with `approvers[]` array tracking each level's status
- Automatic notifications via `onRequestCreated`/`onRequestUpdated` triggers

### Training Module
- Sessions in `training/sessions/{sessionId}`
- Enrollments in `training/enrollments/{enrollmentId}`
- Auto-certificate issuance on completion via `issueTrainingCertificate` function
- Mandatory training reminders at 9AM IST daily

## Common Pitfalls

1. **Don't assume Firebase is connected**: Frontend uses mock data only
2. **Path aliases**: Use `@/` for imports (configured in `vite.config.ts` line 49)
3. **Radix imports**: Must include version suffix (e.g., `@radix-ui/react-dialog@1.1.6`)
4. **Security rules**: Test admin/department logic carefully - `managesDepartment()` checks `adminDepartments[]`
5. **Subcollections**: Many collections use subcollections (attendance/notifications) - don't flatten

## Feature Status
See `SMG/src/FUNCTIONALITY_STATUS.md` for detailed implementation status. Summary:
- ✅ Full: Auth, Attendance, Requests, Notifications, User Management, Training, Projects
- ⚠️ Mock Only: All data (no Firebase connection)
- ❌ Missing: Tests, Firebase integration, email notifications

## When Adding Features

### New Request Type
1. Add type to `requestType` union in `DATABASE_SCHEMA.md`
2. Update Firestore rules for new `requestData` fields
3. Add handler in `AppContextEnhanced.tsx` → `addRequest()`
4. Create/update admin approval view in `pages/admin/`

### New Cloud Function
1. Write function in `Backend/functions/src/index.ts`
2. Run `npm run build` in Backend folder
3. Deploy with `firebase deploy --only functions`
4. Check logs at Firebase Console

### New UI Component
Follow shadcn/ui pattern:
1. Create in `components/ui/` using Radix primitives
2. Use CVA for variants
3. Export typed props with `VariantProps<typeof variants>`

## Dependencies
- **Frontend**: See `SMG/package.json` - no react-router, using manual routing
- **Backend**: Minimal deps - firebase-admin, firebase-functions v2 (Node 20)
- **Build**: Vite (frontend), TypeScript (both)

## Environment Setup
Backend requires Firebase credentials but frontend doesn't need them (mock data). For backend:
- Firebase project: `smg-employee-portal`
- Region: asia-south1 (Mumbai)
- Auth: Email/Password enabled
- See `Backend/README.md` lines 1-100 for full setup steps
