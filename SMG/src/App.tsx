import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContextEnhanced';
import { useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { DashboardPageOld } from './pages/DashboardPageOld';
import { MyAttendancePageOld } from './pages/MyAttendancePageOld';
import { ProfilePage } from './pages/ProfilePage';
import { PayrollPageOld } from './pages/PayrollPageOld';
import { MyDocumentsPageOld } from './pages/MyDocumentsPageOld';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProjectsPage } from './pages/ProjectsPageEnhanced';
import { CanteenPage } from './pages/CanteenPage';
import { GuestHousePage } from './pages/GuestHousePage';
import { TransportPage } from './pages/TransportPage';
import { ParkingFacilityPage } from './pages/ParkingFacilityPage';
import { SportsClubPage } from './pages/SportsClubPage';
import { LeavesPage } from './pages/LeavesPage';
import { ResignationPage } from './pages/ResignationPage';
import { LeaveHistoryPage } from './pages/LeaveHistoryPage';
import { GatePassPage } from './pages/GatePassPage';
import { AttendancePage } from './pages/AttendancePage';
// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsEnhanced';
import {
  AdminUsersPage,
  AdminAttendancePage,
  AdminTrainingPage,
  AdminAnnouncementsPage,
  AdminProductionPage,
  AdminPayrollPage
} from './pages/admin/AdminOtherPagesEnhanced';
import { AdminProjectsPage } from './pages/admin/AdminProjectsEnhanced';
import {
  UniformPage,
  SIMAllocationPage,
  AssetRequestsPage,
  GeneralRequestsPage,
  TrainingPage,
  WelfarePage,
  ImaginePage,
  PoliciesPage,
  AnnouncementsPage
} from './pages/OtherPages';
import {
  LayoutDashboard,
  Briefcase,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ChevronDown,
  Heart,
  ShoppingBag,
  Settings,
  Coffee,
  Mail,
  Bus,
  Shirt,
  Package,
  Calendar,
  Eye,
  FolderOpen,
  Lightbulb,
  BookOpen,
  Megaphone,
  Home,
  Smartphone,
  FileText,
  User,
  Clock,
  FilePlus,
  UserX
} from 'lucide-react';

const INITIAL_DATA = {
  user: {
    name: "Rohit Sharma",
    role: "Senior Technician",
    empId: "SMG-2024-042",
    dept: "Assembly",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit&backgroundColor=b6e3f4",
    email: "rohit.sharma@smg-scooters.com",
    shift: "General (9:00 - 18:00)",
    reportingTo: "Priya Sharma",
    phone: "+91 98765 43210",
    emergencyContact: "+91 98765 43211",
    dateOfBirth: "15-Aug-1992",
    dateOfJoining: "10-Jan-2020",
    bloodGroup: "O+",
    address: "Flat 402, Green Valley Apartments, Sector 12, Noida, UP - 201301",
    education: [
      { degree: "B.Tech in Mechanical Engineering", institution: "Delhi Technical University", year: "2010-2014", grade: "8.2 CGPA" },
      { degree: "Senior Secondary (XII)", institution: "DAV Public School", year: "2010", grade: "88%" }
    ],
    certifications: [
      { name: "Six Sigma Green Belt", issuer: "ASQ", year: "2021" },
      { name: "Industrial Safety", issuer: "NSCI", year: "2020" },
      { name: "Quality Management", issuer: "ISO", year: "2019" }
    ],
    skills: ["Assembly Line Operations", "Quality Control", "Safety Compliance", "Technical Documentation", "Team Leadership"],
    languages: ["Hindi (Native)", "English (Fluent)", "Punjabi (Conversational)"]
  },
  stats: {
    leaveBalance: 12,
    pendingRequests: 5,
    trainingHours: 24,
    canteenBalance: "₹450"
  },
  recentRequests: [
    { id: "REQ001", type: "Leave Application", desc: "Annual Leave - Diwali Vacation", date: "2024-12-01", status: "Approved", approver: "Priya Sharma" },
    { id: "REQ002", type: "Reimbursement", desc: "Travel Expense - Client Visit Mumbai", date: "2024-11-28", status: "Pending", approver: "Amit Patel" },
    { id: "REQ003", type: "Asset Request", desc: "New Laptop - MacBook Pro", date: "2024-11-25", status: "In Progress", approver: "IT Admin" },
    { id: "REQ004", type: "Certificate Request", desc: "Experience Certificate", date: "2024-11-20", status: "Approved", approver: "HR Team" }
  ],
  upcomingTraining: [
    { id: 1, title: "React Advanced Patterns", type: "Required", date: "2024-12-18", duration: "4 hours", instructor: "Vikram Singh" },
    { id: 2, title: "AWS Cloud Fundamentals", type: "Optional", date: "2024-12-25", duration: "8 hours", instructor: "Sneha Reddy" },
    { id: 3, title: "Agile & Scrum Workshop", type: "Required", date: "2024-12-30", duration: "6 hours", instructor: "Arjun Mehta" }
  ],
  myAssets: [
    { name: "Dell Latitude 5520", type: "Laptop", status: "Good", icon: Briefcase },
    { name: "iPhone 13 Pro", type: "Mobile", status: "Excellent", icon: Smartphone },
    { name: "Dell Monitor 24\"", type: "Monitor", status: "Good", icon: Briefcase },
    { name: "Logitech MX Keys", type: "Keyboard", status: "Fair", icon: Briefcase }
  ],
  keyContacts: [
    { name: "Amit Kumar", role: "HR Manager" },
    { name: "Sneha Patel", role: "IT Support" },
    { name: "Vikram Singh", role: "Safety Officer" }
  ],
  meetings: [
    { title: "Team Standup", time: "10:00 AM", duration: "30 min", type: "Conference Room A", link: "" },
    { title: "Project Review", time: "02:00 PM", duration: "1 hour", type: "Online", link: "meet.google.com/abc-defg-hij" },
    { title: "Safety Training", time: "04:00 PM", duration: "45 min", type: "Training Hall", link: "" }
  ],
  notifications: [
    { text: "Your leave request has been approved", time: "2 hours ago" },
    { text: "New training assigned: React Advanced Patterns", time: "5 hours ago" },
    { text: "Payslip for October 2024 is available", time: "1 day ago" }
  ],
  attendanceLogs: [
    {
      id: 1, day: "Today", date: "Dec 12, 2024", checkIn: "08:55 AM", checkOut: "06:12 PM", duration: "9h 17m", status: "Present", isLeave: false, segments: [
        { type: 'work', width: '40%', color: 'bg-[#0B4DA2]' },
        { type: 'break', width: '10%', color: 'bg-[#05CD99]' },
        { type: 'work', width: '30%', color: 'bg-[#0B4DA2]' },
        { type: 'overtime', width: '20%', color: 'bg-[#FFB547]' }
      ]
    },
    { id: 2, day: "Thursday", date: "Dec 11, 2024", checkIn: "-", checkOut: "-", duration: "-", status: "Leave", isLeave: true, segments: [] },
    {
      id: 3, day: "Wednesday", date: "Dec 10, 2024", checkIn: "09:00 AM", checkOut: "05:00 PM", duration: "8h 00m", status: "Present", isLeave: false, segments: [
        { type: 'work', width: '45%', color: 'bg-[#0B4DA2]' },
        { type: 'break', width: '10%', color: 'bg-[#05CD99]' },
        { type: 'work', width: '45%', color: 'bg-[#0B4DA2]' }
      ]
    },
    {
      id: 4, day: "Tuesday", date: "Dec 9, 2024", checkIn: "09:15 AM", checkOut: "07:12 PM", duration: "9h 57m", status: "Present", isLeave: false, segments: [
        { type: 'late', width: '5%', color: 'bg-[#EE5D50]' },
        { type: 'work', width: '40%', color: 'bg-[#0B4DA2]' },
        { type: 'break', width: '10%', color: 'bg-[#05CD99]' },
        { type: 'work', width: '45%', color: 'bg-[#0B4DA2]' }
      ]
    }
  ],
  documents: [
    { id: 1, title: "Offer Letter", category: "Onboarding", type: "PDF", size: "245 KB", date: "Jan 10, 2020" },
    { id: 2, title: "ID Proof - Aadhaar", category: "Identity", type: "PDF", size: "180 KB", date: "Jan 12, 2020" },
    { id: 5, title: "Payslip - October 2024", category: "Payroll", type: "PDF", size: "98 KB", date: "Nov 1, 2024" }
  ],
  trainingData: {
    upcoming: [
      { id: 1, title: "React Advanced Patterns", date: "Dec 18, 2024", duration: "4 hours", instructor: "Vikram Singh", mandatory: true },
      { id: 2, title: "AWS Cloud Fundamentals", date: "Dec 25, 2024", duration: "8 hours", instructor: "Sneha Reddy", mandatory: false },
      { id: 3, title: "Agile & Scrum Workshop", date: "Jan 5, 2025", duration: "6 hours", instructor: "Arjun Mehta", mandatory: true }
    ],
    completed: [
      { id: 4, title: "Six Sigma Green Belt Training", date: "Aug 15, 2021", duration: "40 hours" },
      { id: 5, title: "Industrial Safety Certification", date: "Jun 20, 2020", duration: "16 hours" },
      { id: 6, title: "Quality Management System", date: "Mar 10, 2019", duration: "24 hours" }
    ]
  }
};

interface TopbarProps {
  user: typeof INITIAL_DATA.user;
  onMobileMenu: () => void;
  onNavigate: (page: string) => void;
}

const Topbar = ({ user, onMobileMenu, onNavigate }: TopbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const recentNotifications = [
    { id: 1, text: 'Your leave request has been approved', time: '2 hours ago', type: 'success' },
    { id: 2, text: 'New training assigned: React Advanced Patterns', time: '5 hours ago', type: 'info' },
    { id: 3, text: 'Payslip for October 2024 is available', time: '1 day ago', type: 'info' },
    { id: 4, text: 'Document expiring soon - Please update', time: '2 days ago', type: 'warning' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-4">
        <img
          src="/Company Logo.jpg"
          alt="SMG Logo"
          className="h-10 w-auto"
        />
        <button onClick={onMobileMenu} className="lg:hidden p-2 text-[#042A5B] bg-gray-50 rounded-lg hover:bg-gray-100">
          <Menu size={24} />
        </button>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 w-64 hover:bg-gray-100 transition-colors">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#1B254B] placeholder:text-gray-400" />
        </div>

        {/* Notification Bell with Popup */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="relative p-2.5 bg-gray-50 text-gray-600 hover:text-[#0B4DA2] rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#EE5D50] rounded-full border-2 border-white"></span>
          </button>

          {/* Notification Popup */}
          {showNotificationPopup && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotificationPopup(false)}
              ></div>
              <div className="absolute right-0 top-14 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-4 duration-300">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1B254B] text-lg">Notifications</h3>
                    <span className="bg-[#EE5D50] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {recentNotifications.length}
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-[#1B254B] leading-tight">{notification.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowNotificationPopup(false);
                      onNavigate('notifications');
                    }}
                    className="w-full text-center text-sm font-bold text-[#0B4DA2] hover:bg-blue-50 py-2 rounded-lg transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div onClick={() => onNavigate('profile')} className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all active:scale-95">
          <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-[#1B254B] leading-tight">{user.name}</p>
            <p className="text-[10px] text-gray-400 font-medium">{user.role}</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

// Admin Sidebar
interface AdminSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ activePage, onNavigate, onLogout }: AdminSidebarProps) => {
  const menuGroups = [
    {
      title: "ADMIN",
      items: [
        { id: 'admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'admin-requests', icon: FileText, label: 'View Requests' },
        { id: 'admin-users', icon: User, label: 'User Management' },
        { id: 'admin-attendance', icon: Calendar, label: 'Attendance Admin' },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { id: 'admin-training', icon: BookOpen, label: 'Training Management' },
        { id: 'admin-analytics', icon: Settings, label: 'Department Analytics' },
        { id: 'admin-notifications', icon: Bell, label: 'Notifications' },
        { id: 'admin-announcements', icon: Megaphone, label: 'Announcements' },
        { id: 'admin-projects', icon: Briefcase, label: 'Project Listing' },
        { id: 'admin-production', icon: Settings, label: 'Production Area' },
        { id: 'admin-payroll', icon: FileText, label: 'Payroll Admin' }
      ]
    },
    {
      title: "EMPLOYEE VIEW",
      items: [
        { id: 'profile', icon: User, label: 'My Profile' },
        { id: 'my-attendance', icon: Calendar, label: 'My Attendance' },
        { id: 'payroll', icon: FileText, label: 'Payroll' },
        { id: 'documents', icon: FolderOpen, label: 'My Documents' }
      ]
    }
  ];

  return (
    <aside className="hidden lg:block w-[80px] hover:w-[260px] bg-[#042A5B] flex-col transition-all duration-300 group shadow-2xl overflow-y-auto sticky top-0 h-screen">
      <nav className="px-3 py-6 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id
                    ? 'bg-[#0B4DA2] text-white shadow-lg'
                    : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'
                    }`}
                >
                  <div className="shrink-0 flex justify-center w-6">
                    <item.icon size={20} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[#0B4DA2]/30 shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all duration-200 font-bold"
        >
          <div className="shrink-0 flex justify-center w-6"><LogOut size={20} /></div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default function App() {
  const { user, loading, logout } = useAuth();
  const [userRole, setUserRole] = useState<'employee' | 'admin'>('employee');
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.role) {
      const role = user.role === 'super_admin' ? 'admin' : user.role;
      setUserRole(role);
      setActivePage(role === 'admin' ? 'admin-dashboard' : 'dashboard');
    }
  }, [user]);

  const handleLogin = (role: 'employee' | 'admin') => {
    setUserRole(role);
    setActivePage(role === 'admin' ? 'admin-dashboard' : 'dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setActivePage('dashboard');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4DA2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppProvider>
      <AppContent
        userRole={userRole}
        activePage={activePage}
        setActivePage={setActivePage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
      />
    </AppProvider>
  );
}

interface AppContentProps {
  userRole: string;
  activePage: string;
  setActivePage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

function AppContent({ userRole, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen, handleLogout }: AppContentProps) {
  const renderContent = () => {
    switch (activePage) {
      // Main Pages
      case 'dashboard': return <DashboardPageOld data={INITIAL_DATA} onNavigate={setActivePage} />;
      case 'projects': return <ProjectsPage />;
      case 'profile': return <ProfilePage userData={INITIAL_DATA.user} />;

      // Service Catalog Sub-items
      case 'canteen': return <CanteenPage />;
      case 'guest-house': return <GuestHousePage />;
      case 'transport': return <TransportPage />;
      case 'parking-facility': return <ParkingFacilityPage />;
      case 'sports-club': return <SportsClubPage />;
      case 'uniform': return <UniformPage />;
      case 'sim-allocation': return <SIMAllocationPage />;
      case 'asset-requests': return <AssetRequestsPage />;
      case 'general-requests': return <GeneralRequestsPage />;

      // Attendance Sub-items
      case 'leaves': return <LeavesPage />;
      case 'leave-history': return <LeaveHistoryPage user={INITIAL_DATA.user} onNavigate={setActivePage} />;
      case 'gate-pass': return <GatePassPage />;
      case 'resignation': return <ResignationPage user={INITIAL_DATA.user} />;
      case 'my-attendance': return <AttendancePage />;

      // Work & Pay Pages
      case 'payroll': return <PayrollPageOld user={INITIAL_DATA.user} />;
      case 'training': return <TrainingPage />;
      case 'documents': return <MyDocumentsPageOld documents={INITIAL_DATA.documents} user={INITIAL_DATA.user} />;

      // Personal & Info Pages
      case 'welfare': return <WelfarePage />;
      case 'imagine': return <ImaginePage />;
      case 'policies': return <PoliciesPage />;
      case 'announcements': return <AnnouncementsPage />;
      case 'notifications': return <NotificationsPage />;

      // Admin Pages
      case 'admin-dashboard': return <AdminDashboard onNavigate={setActivePage} />;
      case 'admin-requests': return <AdminRequestsPage onNavigate={setActivePage} />;
      case 'admin-notifications': return <AdminNotificationsPage onNavigate={setActivePage} />;
      case 'admin-users': return <AdminUsersPage />;
      case 'admin-attendance': return <AdminAttendancePage />;
      case 'admin-training': return <AdminTrainingPage />;
      case 'admin-analytics': return <AdminAnalyticsPage />;
      case 'admin-announcements': return <AdminAnnouncementsPage />;
      case 'admin-projects': return <AdminProjectsPage />;
      case 'admin-production': return <AdminProductionPage />;
      case 'admin-payroll': return <AdminPayrollPage />;

      default: return (<div className="flex flex-col items-center justify-center h-[50vh] text-gray-400 animate-in fade-in"><Settings size={64} className="mb-4 text-[#0B4DA2] opacity-20" /><h2 className="text-xl font-bold text-[#1B254B]">Page Under Construction</h2><p className="text-sm text-[#A3AED0] mt-2">This page is being developed</p></div>);
    }
  };

  return (
    <div className="bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B] selection:bg-[#0B4DA2] selection:text-white">
      <Topbar user={INITIAL_DATA.user} onMobileMenu={() => setMobileMenuOpen(true)} onNavigate={setActivePage} />
      <div className="flex min-h-screen">
        {userRole === 'admin' ? (
          <AdminSidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
        ) : (
          <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
        )}
        <div className="flex-1">
          <main className="px-6 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">{renderContent()}</main>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#1B254B]/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col p-6 animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-[#1B254B]">SMG Portal</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-2 overflow-y-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'canteen', label: 'Canteen', icon: Coffee },
                { id: 'welfare', label: 'Welfare', icon: Heart }
              ].map(item => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${activePage === item.id ? 'bg-[#0B4DA2] text-white' : 'text-gray-500 hover:bg-[#F4F7FE]'}`}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                >
                  <item.icon size={20} />{item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button onClick={handleLogout} className="flex items-center gap-2 text-[#EE5D50] font-bold w-full p-2 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activePage, onNavigate, onLogout }: SidebarProps) => {
  const [openDropdowns, setOpenDropdowns] = useState(['leaves', 'my-request']);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const menuGroups = [
    {
      title: "Main",
      items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'my-attendance', icon: Calendar, label: 'Attendance' },
        {
          id: 'leaves',
          icon: Calendar,
          label: 'Leaves',
          hasDropdown: true,
          subItems: [
            { id: 'leaves', icon: FilePlus, label: 'Apply Leave' },
            { id: 'leave-history', icon: Clock, label: 'Check Leave History' },
            { id: 'gate-pass', icon: LogOut, label: 'Gate Pass' },
            { id: 'resignation', icon: User, label: 'Resignation' }
          ]
        },
        { id: 'payroll', icon: FileText, label: 'Salary' },
        {
          id: 'my-request',
          icon: Briefcase,
          label: 'My request',
          hasDropdown: true,
          subItems: [
            { id: 'canteen', icon: Coffee, label: 'Canteen' },
            { id: 'guest-house', icon: Home, label: 'Guest House' },
            { id: 'transport', icon: Bus, label: 'Transport' },
            { id: 'uniform', icon: Shirt, label: 'Uniform' },
            { id: 'sim-allocation', icon: Smartphone, label: 'SIM Allocation' },
            { id: 'asset-requests', icon: Package, label: 'Asset Requests' },
            { id: 'general-requests', icon: FileText, label: 'General Requests' }
          ]
        },
        { id: 'documents', icon: FolderOpen, label: 'My documents' },
        { id: 'training', icon: BookOpen, label: 'Training' }
      ]
    },
    {
      title: "Others",
      items: [
        { id: 'imagine', icon: Lightbulb, label: 'SMG Imagine' },
        { id: 'welfare', icon: Heart, label: 'Grievance Redressal' },
        { id: 'policies', icon: BookOpen, label: 'Policies' },
        { id: 'profile', icon: User, label: 'Profile' }
      ]
    }
  ];

  return (
    <aside className="hidden lg:block w-[80px] hover:w-[260px] bg-[#042A5B] flex-col transition-all duration-300 group shadow-2xl overflow-y-auto sticky top-0 h-screen">
      <nav className="px-3 py-6 space-y-1">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4 last:mb-0">
            <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.id}>
                  {/* Main menu item */}
                  <button
                    onClick={() => item.hasDropdown ? toggleDropdown(item.id) : onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id
                      ? 'bg-[#0B4DA2] text-white shadow-lg'
                      : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'
                      }`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <item.icon size={20} />
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ${openDropdowns.includes(item.id) ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </button>

                  {/* Sub-items */}
                  {item.hasDropdown && openDropdowns.includes(item.id) && (
                    <div className="ml-9 mt-1 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => onNavigate(subItem.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${activePage === subItem.id
                            ? 'bg-[#0B4DA2]/50 text-white font-bold'
                            : 'text-[#87CEEB]/80 hover:bg-[#0B4DA2]/10 hover:text-[#87CEEB]'
                            }`}
                        >
                          <subItem.icon size={16} />
                          <span className="whitespace-nowrap">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[#0B4DA2]/30 shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all duration-200 font-bold"
        >
          <div className="shrink-0 flex justify-center w-6"><LogOut size={20} /></div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};