# SMG Employee Cloud Portal - Complete Database Schema

## 📊 **DATABASE ARCHITECTURE OVERVIEW**

This Firestore database supports three portal types:
1. **Employee Portal** - For all employees
2. **Admin Portal** - For department administrators
3. **Super Admin Portal** - For HR/IT/Management

---

## 🗂️ **FIRESTORE COLLECTIONS STRUCTURE**

### **1. USERS COLLECTION** (`users/`)
Main collection for all user types (employees, admins, super admins)

```javascript
users/{userId} {
  // Basic Info
  uid: string,
  email: string,
  role: "employee" | "admin" | "super_admin",
  employeeId: string, // SMG-2024-042
  
  // Personal Details
  firstName: string,
  lastName: string,
  fullName: string,
  avatar: string (URL),
  phone: string,
  emergencyContact: string,
  dateOfBirth: timestamp,
  bloodGroup: string,
  address: string,
  
  // Employment Details
  designation: string,
  department: string,
  location: string,
  shift: string,
  dateOfJoining: timestamp,
  reportingManager: string (userId reference),
  reportingManagerName: string,
  
  // Education & Skills
  education: [
    {
      degree: string,
      institution: string,
      year: string,
      grade: string
    }
  ],
  certifications: [
    {
      name: string,
      issuer: string,
      year: string,
      certificateUrl: string
    }
  ],
  skills: string[],
  languages: string[],
  
  // Status
  isActive: boolean,
  lastLogin: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
  
  // Admin/Super Admin specific
  permissions: string[], // ["manage_users", "approve_requests", "view_reports"]
  adminDepartments: string[], // Departments they manage (for admins)
}
```

---

### **2. ATTENDANCE COLLECTION** (`attendance/`)

```javascript
attendance/{userId}/records/{recordId} {
  userId: string,
  employeeId: string,
  employeeName: string,
  date: timestamp,
  checkIn: timestamp,
  checkOut: timestamp,
  duration: string, // "8h 30m"
  status: "present" | "absent" | "half_day" | "leave" | "overtime",
  workHours: number,
  overtimeHours: number,
  breaks: [
    {
      start: timestamp,
      end: timestamp,
      duration: number
    }
  ],
  location: {
    latitude: number,
    longitude: number,
    address: string
  },
  isLate: boolean,
  notes: string,
  createdAt: timestamp,
  updatedAt: timestamp
}

// Monthly Summary Sub-collection
attendance/{userId}/monthlySummary/{year-month} {
  month: string, // "2024-12"
  totalDays: number,
  presentDays: number,
  absentDays: number,
  halfDays: number,
  leaveDays: number,
  totalWorkHours: number,
  overtimeHours: number,
  averageCheckIn: string,
  averageCheckOut: string
}
```

---

### **3. REQUESTS COLLECTION** (`requests/`)
All types of requests (leave, reimbursement, assets, certificates, etc.)

```javascript
requests/{requestId} {
  id: string,
  requestType: "leave" | "reimbursement" | "asset" | "certificate" | "uniform" | "transport" | "canteen" | "sim_card" | "guest_house" | "welfare",
  
  // Request Details
  title: string,
  description: string,
  
  // User Info
  userId: string,
  employeeId: string,
  employeeName: string,
  department: string,
  
  // Status Tracking
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed" | "cancelled",
  priority: "low" | "medium" | "high" | "urgent",
  
  // Approval Flow
  approvers: [
    {
      userId: string,
      name: string,
      role: string,
      status: "pending" | "approved" | "rejected",
      comments: string,
      actionDate: timestamp
    }
  ],
  currentApprover: string,
  
  // Type-specific data
  requestData: {
    // For Leave Requests
    leaveType?: "annual" | "sick" | "casual" | "maternity" | "paternity",
    startDate?: timestamp,
    endDate?: timestamp,
    totalDays?: number,
    
    // For Reimbursement
    amount?: number,
    category?: string,
    receipts?: string[], // URLs
    
    // For Asset Request
    assetType?: string,
    specifications?: string,
    quantity?: number,
    
    // For Transport
    route?: string,
    pickupPoint?: string,
    dropPoint?: string,
    effectiveFrom?: timestamp,
    
    // For Uniform
    size?: string,
    items?: string[],
    
    // ... other type-specific fields
  },
  
  // Attachments
  attachments: [
    {
      name: string,
      url: string,
      type: string,
      size: number,
      uploadedAt: timestamp
    }
  ],
  
  // Tracking
  submittedAt: timestamp,
  processedAt: timestamp,
  completedAt: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
  
  // Comments
  comments: [
    {
      userId: string,
      userName: string,
      text: string,
      timestamp: timestamp
    }
  ]
}
```

---

### **4. TRAINING COLLECTION** (`training/`)

```javascript
// Training Sessions
training/sessions/{sessionId} {
  id: string,
  title: string,
  description: string,
  type: "technical" | "soft_skills" | "safety" | "compliance" | "leadership",
  isMandatory: boolean,
  
  // Schedule
  startDate: timestamp,
  endDate: timestamp,
  duration: string, // "4 hours"
  schedule: string, // "Monday, 9:00 AM - 1:00 PM"
  
  // Instructor
  instructor: string,
  instructorEmail: string,
  instructorBio: string,
  
  // Capacity
  maxParticipants: number,
  enrolledCount: number,
  
  // Location
  location: "online" | "on_site",
  venue: string,
  meetingLink: string,
  
  // Content
  syllabus: string[],
  prerequisites: string[],
  learningOutcomes: string[],
  
  // Resources
  materials: [
    {
      name: string,
      url: string,
      type: string
    }
  ],
  
  // Status
  status: "upcoming" | "ongoing" | "completed" | "cancelled",
  
  createdAt: timestamp,
  updatedAt: timestamp
}

// Training Enrollments
training/enrollments/{enrollmentId} {
  id: string,
  sessionId: string,
  sessionTitle: string,
  
  // User Info
  userId: string,
  employeeId: string,
  employeeName: string,
  department: string,
  
  // Status
  enrollmentStatus: "registered" | "attended" | "completed" | "no_show" | "cancelled",
  enrollmentDate: timestamp,
  
  // Completion
  attendancePercentage: number,
  completionDate: timestamp,
  certificateIssued: boolean,
  certificateUrl: string,
  
  // Assessment
  assessmentScore: number,
  passed: boolean,
  feedback: string,
  rating: number,
  
  createdAt: timestamp,
  updatedAt: timestamp
}

// User Training History
training/userHistory/{userId}/courses/{courseId} {
  sessionId: string,
  title: string,
  completedDate: timestamp,
  duration: string,
  hoursCompleted: number,
  certificateUrl: string,
  score: number
}
```

---

### **5. ASSETS COLLECTION** (`assets/`)

```javascript
assets/{assetId} {
  id: string,
  assetTag: string, // "AST-LAPTOP-2024-001"
  name: string,
  category: "laptop" | "mobile" | "monitor" | "keyboard" | "mouse" | "other",
  
  // Details
  manufacturer: string,
  model: string,
  serialNumber: string,
  specifications: object,
  purchaseDate: timestamp,
  warrantyExpiry: timestamp,
  
  // Assignment
  status: "available" | "assigned" | "under_maintenance" | "damaged" | "retired",
  assignedTo: string, // userId
  assignedToName: string,
  assignedDate: timestamp,
  
  // Condition
  condition: "excellent" | "good" | "fair" | "poor",
  lastMaintenanceDate: timestamp,
  nextMaintenanceDate: timestamp,
  
  // Tracking
  location: string,
  department: string,
  value: number,
  
  // History
  assignmentHistory: [
    {
      userId: string,
      userName: string,
      assignedDate: timestamp,
      returnedDate: timestamp,
      condition: string,
      notes: string
    }
  ],
  
  maintenanceHistory: [
    {
      date: timestamp,
      type: string,
      description: string,
      cost: number,
      performedBy: string
    }
  ],
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

### **6. DOCUMENTS COLLECTION** (`documents/`)

```javascript
documents/{userId}/files/{documentId} {
  id: string,
  userId: string,
  
  // Document Info
  name: string,
  type: "offer_letter" | "contract" | "salary_slip" | "tax_form" | "certificate" | "id_proof" | "other",
  category: string,
  
  // File Details
  fileUrl: string,
  fileName: string,
  fileSize: number,
  mimeType: string,
  
  // Metadata
  uploadedBy: string,
  uploadedByName: string,
  uploadDate: timestamp,
  
  // Access Control
  isPrivate: boolean,
  sharedWith: string[], // userIds
  
  // Verification
  isVerified: boolean,
  verifiedBy: string,
  verifiedDate: timestamp,
  
  // Tags
  tags: string[],
  description: string,
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

### **7. PAYROLL COLLECTION** (`payroll/`)

```javascript
payroll/{userId}/records/{month-year} {
  userId: string,
  employeeId: string,
  employeeName: string,
  
  // Period
  month: string, // "December 2024"
  year: number,
  payPeriod: {
    start: timestamp,
    end: timestamp
  },
  
  // Earnings
  basicSalary: number,
  hra: number,
  allowances: {
    transport: number,
    medical: number,
    food: number,
    special: number,
    other: number
  },
  overtime: number,
  bonus: number,
  grossSalary: number,
  
  // Deductions
  deductions: {
    pf: number,
    esi: number,
    tax: number,
    professionalTax: number,
    loan: number,
    advance: number,
    other: number
  },
  totalDeductions: number,
  
  // Net Salary
  netSalary: number,
  
  // Statutory Info
  uan: string, // UAN number
  pfAccountNumber: string,
  esiNumber: string,
  panNumber: string,
  
  // Work Details
  workingDays: number,
  presentDays: number,
  paidLeaves: number,
  unpaidLeaves: number,
  overtimeHours: number,
  
  // Payment
  paymentDate: timestamp,
  paymentMethod: "bank_transfer" | "cheque" | "cash",
  paymentStatus: "pending" | "processed" | "paid",
  paymentReference: string,
  
  // Salary Slip
  salarySlipUrl: string,
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

### **8. SERVICES COLLECTIONS**

#### **8a. Transport** (`services/transport/`)
```javascript
services/transport/requests/{requestId} {
  userId: string,
  employeeId: string,
  employeeName: string,
  
  requestType: "new" | "change" | "cancel",
  route: string,
  pickupPoint: string,
  dropPoint: string,
  pickupTime: string,
  effectiveFrom: timestamp,
  
  status: "pending" | "approved" | "active" | "cancelled",
  approvedBy: string,
  approvalDate: timestamp,
  
  vehicleAssigned: string,
  seatNumber: string,
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### **8b. Canteen** (`services/canteen/`)
```javascript
services/canteen/users/{userId} {
  userId: string,
  balance: number,
  monthlyAllowance: number,
  lastRecharge: timestamp,
  
  transactions: [
    {
      id: string,
      type: "credit" | "debit",
      amount: number,
      description: string,
      timestamp: timestamp,
      balanceAfter: number
    }
  ],
  
  preferences: {
    dietary: string[],
    allergies: string[]
  }
}
```

#### **8c. Uniform** (`services/uniform/`)
```javascript
services/uniform/requests/{requestId} {
  userId: string,
  employeeId: string,
  requestType: "new" | "replacement",
  
  items: [
    {
      type: "shirt" | "pant" | "shoes" | "jacket" | "cap",
      size: string,
      quantity: number
    }
  ],
  
  measurements: {
    chest: string,
    waist: string,
    height: string,
    shoeSize: string
  },
  
  reason: string,
  status: "pending" | "approved" | "issued" | "rejected",
  
  issuedDate: timestamp,
  collectedDate: timestamp,
  
  createdAt: timestamp
}
```

#### **8d. SIM Card** (`services/simcard/`)
```javascript
services/simcard/assignments/{simId} {
  simNumber: string,
  provider: string,
  plan: string,
  monthlyLimit: number,
  
  assignedTo: string,
  assignedToName: string,
  assignedDate: timestamp,
  
  status: "active" | "suspended" | "cancelled",
  
  usage: [
    {
      month: string,
      calls: number,
      data: number,
      sms: number,
      totalCost: number
    }
  ],
  
  createdAt: timestamp
}
```

#### **8e. Guest House** (`services/guesthouse/`)
```javascript
services/guesthouse/bookings/{bookingId} {
  userId: string,
  employeeName: string,
  
  location: string,
  roomType: "single" | "double" | "suite",
  
  checkIn: timestamp,
  checkOut: timestamp,
  numberOfNights: number,
  
  guestDetails: [
    {
      name: string,
      relation: string,
      idProof: string,
      phone: string
    }
  ],
  
  purpose: string,
  specialRequests: string,
  
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled",
  
  roomNumber: string,
  cost: number,
  
  createdAt: timestamp
}
```

---

### **9. NOTIFICATIONS COLLECTION** (`notifications/`)

```javascript
notifications/{userId}/messages/{notificationId} {
  id: string,
  userId: string,
  
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error",
  category: "request" | "training" | "announcement" | "reminder" | "approval",
  
  isRead: boolean,
  readAt: timestamp,
  
  actionUrl: string,
  actionRequired: boolean,
  
  data: object, // Additional contextual data
  
  createdAt: timestamp,
  expiresAt: timestamp
}
```

---

### **10. DEPARTMENTS COLLECTION** (`departments/`)

```javascript
departments/{departmentId} {
  id: string,
  name: string,
  code: string,
  description: string,
  
  headOfDepartment: string, // userId
  hodName: string,
  
  adminIds: string[], // Admin userIds for this department
  
  location: string,
  contactEmail: string,
  contactPhone: string,
  
  employeeCount: number,
  
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

### **11. ANNOUNCEMENTS COLLECTION** (`announcements/`)

```javascript
announcements/{announcementId} {
  id: string,
  title: string,
  content: string,
  
  type: "general" | "urgent" | "policy" | "event" | "holiday",
  priority: "low" | "medium" | "high",
  
  // Targeting
  targetAudience: "all" | "department" | "designation" | "custom",
  departments: string[],
  designations: string[],
  specificUsers: string[],
  
  // Publishing
  publishedBy: string,
  publishedByName: string,
  publishDate: timestamp,
  expiryDate: timestamp,
  
  // Media
  attachments: [
    {
      name: string,
      url: string,
      type: string
    }
  ],
  
  // Engagement
  viewCount: number,
  viewedBy: string[], // userIds
  
  isActive: boolean,
  isPinned: boolean,
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 🔐 **SECURITY & ACCESS LEVELS**

### **Employee Access**
- Own profile (read/update limited fields)
- Own attendance, requests, documents
- All training sessions (read)
- Service catalogs (read/create requests)
- Announcements (read)

### **Admin Access**
- All employee data in assigned departments (read)
- Requests from assigned departments (read/approve/reject)
- Department analytics (read)
- Create announcements for department
- Manage assets for department

### **Super Admin Access**
- All collections (full CRUD)
- User management (create/update/deactivate)
- System settings
- Global reports and analytics
- Manage all admins

---

## 📈 **INDEXES NEEDED**

```javascript
// Composite indexes for common queries
users: [employeeId, role], [department, isActive], [role, department]
attendance: [userId, date], [date, status]
requests: [userId, status], [status, createdAt], [requestType, status]
training/sessions: [status, startDate], [isMandatory, startDate]
training/enrollments: [userId, enrollmentStatus], [sessionId, enrollmentStatus]
assets: [status, category], [assignedTo, status]
```

---

This schema supports:
- ✅ Multi-role access (Employee, Admin, Super Admin)
- ✅ All 8+ service types
- ✅ Request workflows with approvals
- ✅ Training management with certificates
- ✅ Asset tracking
- ✅ Attendance & payroll
- ✅ Document management
- ✅ Real-time notifications
- ✅ Scalable architecture
