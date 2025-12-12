import React, { createContext, useContext, useState, useEffect } from 'react';

// Demo User Data
const DEMO_EMPLOYEE = {
  id: 'EMP1001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@smg.com',
  phone: '+91 98765 43210',
  department: 'Production',
  position: 'Senior Operator',
  joiningDate: '2018-01-10',
  reportingTo: 'Rohit Verma',
  shift: 'Day Shift (9 AM - 6 PM)',
  employeeType: 'Full-time',
  location: 'Mumbai Plant',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  salary: '₹45,000',
  bankAccount: 'HDFC Bank - ****6789',
  panCard: 'ABCDE1234F',
  aadharCard: '****-****-5678'
};

const DEMO_ADMIN = {
  id: 'ADM001',
  name: 'Admin User',
  email: 'admin@smg.com',
  phone: '+91 98765 00000',
  department: 'Administration',
  position: 'System Administrator',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
};

interface AppContextType {
  // User Data
  currentUser: any;
  isAdmin: boolean;
  
  // Attendance
  isClockedIn: boolean;
  clockInTime: string | null;
  todayHours: string;
  handleClockIn: () => void;
  handleClockOut: () => void;
  attendanceHistory: any[];
  
  // Requests
  requests: any[];
  addRequest: (request: any) => void;
  updateRequest: (id: string, updates: any) => void;
  deleteRequest: (id: string) => void;
  
  // Notifications
  notifications: any[];
  addNotification: (notification: any) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  
  // Announcements
  announcements: any[];
  addAnnouncement: (announcement: any) => void;
  
  // Users (for admin)
  allUsers: any[];
  updateUser: (id: string, updates: any) => void;
  
  // Training
  trainings: any[];
  enrollInTraining: (trainingId: string) => void;
  
  // Projects
  projects: any[];
  
  // Documents
  documents: any[];
  requestDocument: (docType: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(DEMO_EMPLOYEE);
  
  // Attendance State
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [todayHours, setTodayHours] = useState('0h 0m');
  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '2024-12-11', checkIn: '09:00 AM', checkOut: '06:15 PM', hours: '9h 15m', status: 'Present' },
    { date: '2024-12-10', checkIn: '08:55 AM', checkOut: '06:00 PM', hours: '9h 5m', status: 'Present' },
    { date: '2024-12-09', checkIn: '09:10 AM', checkOut: '06:20 PM', hours: '9h 10m', status: 'Present' },
    { date: '2024-12-06', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9h 5m', status: 'Present' },
    { date: '2024-12-05', checkIn: '-', checkOut: '-', hours: '-', status: 'Leave' }
  ]);
  
  // Requests State
  const [requests, setRequests] = useState([
    {
      id: 'REQ001',
      employeeId: 'EMP1001',
      employeeName: 'Rajesh Kumar',
      type: 'Leave Request',
      category: 'Casual Leave',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      days: 3,
      reason: 'Family function',
      status: 'Pending',
      submittedDate: '2024-12-10',
      priority: 'Medium',
      department: 'Production'
    },
    {
      id: 'REQ002',
      employeeId: 'EMP1001',
      employeeName: 'Rajesh Kumar',
      type: 'Document Request',
      category: 'Experience Certificate',
      reason: 'Personal requirement',
      status: 'Approved',
      submittedDate: '2024-12-05',
      approvedDate: '2024-12-06',
      priority: 'Low',
      department: 'Production'
    }
  ]);
  
  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'NOT001',
      title: 'Leave Request Approved',
      message: 'Your leave request for Dec 15-17 has been approved',
      type: 'success',
      time: '2 hours ago',
      isRead: false,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 'NOT002',
      title: 'New Training Available',
      message: 'Safety Training Program - Registration open',
      type: 'info',
      time: '5 hours ago',
      isRead: false,
      timestamp: new Date(Date.now() - 18000000)
    },
    {
      id: 'NOT003',
      title: 'Payslip Generated',
      message: 'Your payslip for November 2024 is ready',
      type: 'info',
      time: '1 day ago',
      isRead: true,
      timestamp: new Date(Date.now() - 86400000)
    }
  ]);
  
  // Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ANN001',
      title: 'Holiday Announcement',
      content: 'Company will remain closed on Dec 25th for Christmas',
      date: '2024-12-10',
      author: 'Admin',
      status: 'Published',
      type: 'info'
    },
    {
      id: 'ANN002',
      title: 'New Policy Released',
      content: 'Updated Work from Home policy is now available on the portal',
      date: '2024-12-07',
      author: 'HR Team',
      status: 'Published',
      type: 'info'
    }
  ]);
  
  // All Users (for admin)
  const [allUsers, setAllUsers] = useState([
    { id: 'EMP1001', name: 'Rajesh Kumar', empId: 'EMP1001', dept: 'Production', role: 'Senior Operator', email: 'rajesh.kumar@smg.com', phone: '+91 98765 43210', status: 'Active', joinDate: '10-Jan-2018', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
    { id: 'EMP1025', name: 'Priya Sharma', empId: 'EMP1025', dept: 'Quality Control', role: 'QC Inspector', email: 'priya.sharma@smg.com', phone: '+91 98765 43211', status: 'Active', joinDate: '15-Mar-2019', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { id: 'EMP1089', name: 'Amit Patel', empId: 'EMP1089', dept: 'Engineering', role: 'Design Engineer', email: 'amit.patel@smg.com', phone: '+91 98765 43212', status: 'Active', joinDate: '20-Jul-2020', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
    { id: 'EMP1156', name: 'Sneha Gupta', empId: 'EMP1156', dept: 'Sales & Marketing', role: 'Marketing Manager', email: 'sneha.gupta@smg.com', phone: '+91 98765 43213', status: 'Active', joinDate: '05-Feb-2021', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha' },
    { id: 'EMP1234', name: 'Vikram Singh', empId: 'EMP1234', dept: 'R&D', role: 'Research Scientist', email: 'vikram.singh@smg.com', phone: '+91 98765 43214', status: 'Active', joinDate: '12-Sep-2019', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
    { id: 'EMP1067', name: 'Anita Desai', empId: 'EMP1067', dept: 'Administration', role: 'Admin Officer', email: 'anita.desai@smg.com', phone: '+91 98765 43215', status: 'Active', joinDate: '18-Apr-2020', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita' },
    { id: 'EMP1145', name: 'Rohit Verma', empId: 'EMP1145', dept: 'Production', role: 'Production Manager', email: 'rohit.verma@smg.com', phone: '+91 98765 43216', status: 'Active', joinDate: '22-Nov-2017', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit' },
    { id: 'EMP1278', name: 'Kavita Joshi', empId: 'EMP1278', dept: 'HR', role: 'HR Manager', email: 'kavita.joshi@smg.com', phone: '+91 98765 43217', status: 'Active', joinDate: '30-Jun-2018', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita' },
    { id: 'EMP1312', name: 'Suresh Reddy', empId: 'EMP1312', dept: 'Finance', role: 'Accountant', email: 'suresh.reddy@smg.com', phone: '+91 98765 43218', status: 'Active', joinDate: '14-Aug-2021', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh' },
    { id: 'EMP1401', name: 'Meena Iyer', empId: 'EMP1401', dept: 'IT', role: 'System Administrator', email: 'meena.iyer@smg.com', phone: '+91 98765 43219', status: 'Active', joinDate: '25-Jan-2022', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meena' }
  ]);
  
  // Training State
  const [trainings, setTrainings] = useState([
    { 
      id: 'TRN001', 
      title: 'Safety Training Program', 
      type: 'Mandatory', 
      dept: 'Production', 
      date: '2024-12-15', 
      duration: '4 hours', 
      enrolled: 45, 
      completed: 12, 
      instructor: 'Vikram Singh',
      description: 'Comprehensive safety training for production floor',
      isEnrolled: false
    },
    { 
      id: 'TRN002', 
      title: 'Quality Control Standards', 
      type: 'Mandatory', 
      dept: 'Quality Control', 
      date: '2024-12-18', 
      duration: '6 hours', 
      enrolled: 25, 
      completed: 25, 
      instructor: 'Priya Sharma',
      description: 'Quality standards and inspection procedures',
      isEnrolled: true
    },
    { 
      id: 'TRN003', 
      title: 'Advanced Excel Skills', 
      type: 'Optional', 
      dept: 'All', 
      date: '2024-12-20', 
      duration: '8 hours', 
      enrolled: 78, 
      completed: 45, 
      instructor: 'Sneha Gupta',
      description: 'Excel formulas, pivot tables, and data analysis',
      isEnrolled: false
    }
  ]);
  
  // Projects State
  const [projects, setProjects] = useState([
    { id: 'PRJ001', name: 'New Scooter Model Development', status: 'On Track', progress: 75, dept: 'R&D', team: 25, deadline: '2025-03-15' },
    { id: 'PRJ002', name: 'Factory Automation Phase 2', status: 'At Risk', progress: 45, dept: 'Production', team: 18, deadline: '2025-01-30' },
    { id: 'PRJ003', name: 'Quality Management System Upgrade', status: 'On Track', progress: 90, dept: 'Quality Control', team: 12, deadline: '2024-12-30' }
  ]);
  
  // Documents State
  const [documents, setDocuments] = useState([
    { id: 'DOC001', name: 'Employment Contract', type: 'Contract', uploadDate: '2018-01-10', status: 'Available' },
    { id: 'DOC002', name: 'Pay Slip - November 2024', type: 'Payslip', uploadDate: '2024-12-01', status: 'Available' },
    { id: 'DOC003', name: 'Tax Documents - FY 2023-24', type: 'Tax', uploadDate: '2024-04-15', status: 'Available' },
    { id: 'DOC004', name: 'Performance Review - 2023', type: 'Review', uploadDate: '2024-01-20', status: 'Available' }
  ]);
  
  // Clock In Handler
  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    setClockInTime(currentTime);
    setIsClockedIn(true);
    
    // Add notification
    addNotification({
      title: 'Clocked In Successfully',
      message: `You clocked in at ${currentTime}`,
      type: 'success',
      time: 'Just now'
    });
  };
  
  // Clock Out Handler
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    setClockOutTime(currentTime);
    
    // Calculate hours worked
    if (clockInTime) {
      const hours = 9; // Simplified calculation
      const minutes = Math.floor(Math.random() * 60);
      setTodayHours(`${hours}h ${minutes}m`);
      
      // Add to attendance history
      const today = new Date().toISOString().split('T')[0];
      const newAttendance = {
        date: today,
        checkIn: clockInTime,
        checkOut: currentTime,
        hours: `${hours}h ${minutes}m`,
        status: 'Present'
      };
      setAttendanceHistory([newAttendance, ...attendanceHistory]);
    }
    
    setIsClockedIn(false);
    
    // Add notification
    addNotification({
      title: 'Clocked Out Successfully',
      message: `You clocked out at ${currentTime}. Total hours: ${todayHours}`,
      type: 'success',
      time: 'Just now'
    });
    
    setTimeout(() => {
      setClockInTime(null);
      setClockOutTime(null);
    }, 3000);
  };
  
  // Request Handlers
  const addRequest = (request) => {
    const newRequest = {
      ...request,
      id: `REQ${String(requests.length + 1).padStart(3, '0')}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setRequests([newRequest, ...requests]);
    
    addNotification({
      title: 'Request Submitted',
      message: `Your ${request.type} has been submitted successfully`,
      type: 'success',
      time: 'Just now'
    });
  };
  
  const updateRequest = (id, updates) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, ...updates } : req
    ));
    
    if (updates.status) {
      addNotification({
        title: `Request ${updates.status}`,
        message: `Your request has been ${updates.status.toLowerCase()}`,
        type: updates.status === 'Approved' ? 'success' : updates.status === 'Rejected' ? 'error' : 'info',
        time: 'Just now'
      });
    }
  };
  
  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    
    addNotification({
      title: 'Request Deleted',
      message: 'Your request has been deleted',
      type: 'info',
      time: 'Just now'
    });
  };
  
  // Notification Handlers
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: `NOT${String(notifications.length + 1).padStart(3, '0')}`,
      isRead: false,
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications]);
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Announcement Handlers
  const addAnnouncement = (announcement) => {
    const newAnnouncement = {
      ...announcement,
      id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      author: isAdmin ? 'Admin' : currentUser.name
    };
    setAnnouncements([newAnnouncement, ...announcements]);
  };
  
  // User Handlers
  const updateUser = (id, updates) => {
    setAllUsers(allUsers.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };
  
  // Training Handlers
  const enrollInTraining = (trainingId) => {
    setTrainings(trainings.map(training => 
      training.id === trainingId 
        ? { ...training, enrolled: training.enrolled + 1, isEnrolled: true }
        : training
    ));
    
    addNotification({
      title: 'Training Enrollment Successful',
      message: 'You have been enrolled in the training program',
      type: 'success',
      time: 'Just now'
    });
  };
  
  // Document Handlers
  const requestDocument = (docType) => {
    addRequest({
      type: 'Document Request',
      category: docType,
      reason: 'Required for personal use',
      priority: 'Medium'
    });
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const value = {
    currentUser,
    isAdmin,
    isClockedIn,
    clockInTime,
    todayHours,
    handleClockIn,
    handleClockOut,
    attendanceHistory,
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    unreadCount,
    announcements,
    addAnnouncement,
    allUsers,
    updateUser,
    trainings,
    enrollInTraining,
    projects,
    documents,
    requestDocument
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
