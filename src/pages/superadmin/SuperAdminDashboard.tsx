import React, { useState } from 'react';
import { Users, BarChart3, Settings, Megaphone, Bell, FolderOpen, FileText, Building2, IndianRupee, GraduationCap, Briefcase, Activity, Calendar, LogIn, LogOut as LogOutIcon } from 'lucide-react';

export const SuperAdminDashboard = ({ onNavigate }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);

  const handleClockIn = () => {
    const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setClockInTime(t);
    setIsClockedIn(true);
  };
  const handleClockOut = () => { setIsClockedIn(false); setClockInTime(null); };

  const stats = {
    employees: 2456,
    monthlyPayroll: '₹2,98,25,000',
    activeProjects: 42,
    departments: 18,
    pendingRequests: 64,
    trainings: 312,
  };

  const Stat = ({ icon: Icon, label, value, onClick }) => (
    <button onClick={onClick} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full text-left active:scale-95">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-[#F4F7FE] flex items-center justify-center"><Icon size={24} className="text-[#0B4DA2]"/></div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-3xl font-bold text-[#1B254B]">{value}</div>
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#042A5B] via-[#063A75] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Super Admin Dashboard</h2>
            <p className="text-blue-100 text-lg">Company-wide control, analytics and configuration</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">🔧 System Settings</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">🔔 {stats.pendingRequests} Pending</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-xs text-blue-200 mb-1">Today's Date</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat icon={Users} label="Total Employees" value={stats.employees} onClick={() => onNavigate('super-users')} />
        <Stat icon={IndianRupee} label="Monthly Payroll" value={stats.monthlyPayroll} onClick={() => onNavigate('super-reports')} />
        <Stat icon={Briefcase} label="Active Projects" value={stats.activeProjects} onClick={() => onNavigate('super-analytics')} />
        <Stat icon={Activity} label="Departments" value={stats.departments} onClick={() => onNavigate('super-departments')} />
      </div>

      {/* Quick Actions & Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#1B254B] mb-4 text-lg">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Manage Users', icon: Users, action: 'super-users' },
              { label: 'Departments', icon: Settings, action: 'super-departments' },
              { label: 'All Requests', icon: FileText, action: 'super-requests' },
              { label: 'Analytics', icon: BarChart3, action: 'super-analytics' },
              { label: 'Announcements', icon: Megaphone, action: 'super-announcements' },
              { label: 'Notifications', icon: Bell, action: 'super-notifications' },
              { label: 'System Settings', icon: Settings, action: 'super-settings' },
              { label: 'Reports & Export', icon: FolderOpen, action: 'super-reports' }
            ].map((item, idx) => (
              <button key={idx} onClick={() => onNavigate(item.action)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors text-left group">
                <div className="bg-[#F4F7FE] p-2 rounded-lg group-hover:bg-[#0B4DA2] transition-colors">
                  <item.icon size={18} className="text-[#0B4DA2] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-[#1B254B]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] p-6 rounded-[24px] shadow-lg text-white">
            <div className="flex items-center gap-2 mb-4"><Calendar size={20}/><h3 className="font-bold text-lg">Attendance</h3></div>
            {!isClockedIn ? (
              <button onClick={handleClockIn} className="w-full bg-white text-[#0B4DA2] py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 active:scale-95"><LogIn size={20}/>Clock In</button>
            ) : (
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                  <p className="text-xs text-blue-200 mb-1">Clocked In At</p>
                  <p className="text-xl font-bold">{clockInTime}</p>
                </div>
                <button onClick={handleClockOut} className="w-full bg-[#EE5D50] text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 active:scale-95"><LogOutIcon size={20}/>Clock Out</button>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#1B254B] mb-3 text-lg">Training Overview</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><GraduationCap className="text-[#0B4DA2] mx-auto mb-1"/><p className="text-2xl font-bold text-[#1B254B]">{stats.trainings}</p><p className="text-xs text-gray-500">Sessions</p></div>
              <div><Building2 className="text-[#0B4DA2] mx-auto mb-1"/><p className="text-2xl font-bold text-[#1B254B]">18</p><p className="text-xs text-gray-500">Mandatory</p></div>
              <div><Briefcase className="text-[#0B4DA2] mx-auto mb-1"/><p className="text-2xl font-bold text-[#1B254B]">1.2k</p><p className="text-xs text-gray-500">Certificates</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
