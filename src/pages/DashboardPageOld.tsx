import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  Coffee, 
  BookOpen, 
  Zap,
  DollarSign,
  Truck,
  Mail,
  LifeBuoy,
  Heart,
  LogOut,
  MapPin,
  Video,
  Phone,
  Link as LinkIcon,
  Users,
  Award,
  PlayCircle,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Monitor,
  Keyboard,
  Mouse,
  Smartphone,
  IndianRupee
} from 'lucide-react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const StatCard = ({ label, value, icon: Icon, colorClass, subtext, onClick }) => {
  // Extract just the text color class from colorClass (remove bg- classes)
  const iconColor = colorClass.split(' ').find(c => c.startsWith('text-')) || colorClass;
  
  return (
    <button 
      onClick={onClick}
      className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer w-full text-left active:scale-95"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform bg-gray-100`}>
        {Icon && <Icon size={24} className={iconColor} />}
      </div>
      <h3 className="text-2xl font-bold text-[#1B254B] mb-1">{value}</h3>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
      {subtext && <p className="text-[10px] text-gray-400 mt-1">{subtext}</p>}
    </button>
  );
};

const RecentRequestsCard = ({ requests, onNewRequest }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-[#1B254B] text-lg">Recent Requests</h3>
      <button 
        onClick={onNewRequest}
        className="text-xs font-bold text-[#0B4DA2] hover:underline flex items-center gap-1"
      >
        + New Request
      </button>
    </div>
    <div className="space-y-3">
      {requests.map((req) => (
        <div key={req.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-[#1B254B] text-sm">{req.type}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-red-100 text-red-700'
              }`}>
                {req.status}
              </span>
            </div>
            <p className="text-xs text-gray-600">{req.desc}</p>
            <p className="text-[10px] text-gray-400 mt-1">{req.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UpcomingTrainingCard = ({ training }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
    <h3 className="font-bold text-[#1B254B] mb-4 text-lg">Upcoming Training</h3>
    <div className="space-y-3">
      {training.map((t) => (
        <div key={t.id} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
          <div className="bg-[#0B4DA2] p-2 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#1B254B] text-sm">{t.title}</h4>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={10} /> {t.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {t.duration}</span>
            </div>
            {t.type === 'Required' && (
              <span className="inline-block mt-2 text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Mandatory
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MyAssetsCard = ({ assets }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
    <h3 className="font-bold text-[#1B254B] mb-4 text-lg">My Assets</h3>
    <div className="space-y-3">
      {assets.map((asset, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-[#0B4DA2]">
              <asset.icon size={18} />
            </div>
            <div>
              <p className="font-bold text-[#1B254B] text-sm">{asset.name}</p>
              <p className="text-[10px] text-gray-400">{asset.type}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded ${
            asset.status === 'Excellent' ? 'bg-green-100 text-green-700' :
            asset.status === 'Good' ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {asset.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const KeyContactsCard = ({ contacts, reportingManager }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
    <h3 className="font-bold text-[#1B254B] mb-4 text-lg">Key Contacts</h3>
    <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
      <p className="text-xs text-gray-500 mb-1">Reporting Manager</p>
      <p className="font-bold text-[#1B254B]">{reportingManager}</p>
    </div>
    <div className="space-y-2">
      {contacts.map((contact, idx) => (
        <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div>
            <p className="font-bold text-[#1B254B] text-sm">{contact.name}</p>
            <p className="text-[10px] text-gray-400">{contact.role}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 bg-blue-50 text-[#0B4DA2] rounded-lg hover:bg-blue-100">
              <Phone size={12} />
            </button>
            <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
              <Mail size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TodaysMeetingsCard = ({ meetings }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
    <h3 className="font-bold text-[#1B254B] mb-4 text-lg">Today's Meetings</h3>
    <div className="space-y-3">
      {meetings.map((meeting, idx) => (
        <div key={idx} className="p-4 border-l-4 border-[#0B4DA2] bg-blue-50 rounded-r-xl group hover:shadow-md transition-all">
          <h4 className="font-bold text-[#1B254B] mb-2">{meeting.title}</h4>
          <div className="flex flex-wrap gap-3 text-[10px] text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {meeting.time} • {meeting.duration}
            </span>
            <span className="flex items-center gap-1">
              {meeting.link ? <Video size={12} /> : <MapPin size={12} />}
              {meeting.type}
            </span>
          </div>
          {meeting.link ? (
            <a 
              href={`https://${meeting.link}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#0B4DA2] font-bold hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              <LinkIcon size={12} />
              Join Meeting
            </a>
          ) : (
            <div className="text-xs text-gray-600 font-medium flex items-center gap-1">
              <MapPin size={12} className="text-[#0B4DA2]" />
              Venue: {meeting.type}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const DashboardPageOld = ({ data, onNavigate }) => {
  const greeting = getGreeting();
  const [isClockedIn, setIsClockedIn] = useState(true);

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    alert(`Clocked In at ${currentTime}`);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    alert(`Clocked Out at ${currentTime}`);
    setIsClockedIn(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#042A5B] via-[#063A75] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl shadow-blue-900/30 relative overflow-hidden flex flex-col justify-center min-h-[220px] group">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-[#87CEEB] rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          
          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div className="absolute top-8 right-8 w-32 h-0.5 bg-white rotate-45"></div>
            <div className="absolute top-8 right-44 w-24 h-0.5 bg-white rotate-45"></div>
            <div className="absolute top-8 right-72 w-16 h-0.5 bg-white rotate-45"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 animate-in slide-in-from-left duration-500">
                  {greeting},<br/>
                  <span className="text-4xl bg-gradient-to-r from-white to-[#87CEEB] bg-clip-text text-transparent">
                    {data.user.name.split(' ')[0]}!
                  </span>
                </h2>
                <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-left duration-700">
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1 hover:bg-white/20 transition-all">
                    <Briefcase size={12} />
                    Senior Technician
                  </span>
                  <span className="bg-[#05CD99]/20 px-3 py-1.5 rounded-full text-xs font-bold text-[#05CD99] border border-[#05CD99]/30 flex items-center gap-1 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-[#05CD99] rounded-full"></div>
                    Active
                  </span>
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1">
                    <Clock size={12} />
                    On Time
                  </span>
                </div>
              </div>
              
              {/* Stats Mini Cards */}
              <div className="hidden md:flex flex-col gap-2 animate-in slide-in-from-right duration-700">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-right min-w-[140px]">
                  <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wide">This Month</p>
                  <p className="text-xl font-bold">{data.stats.trainingHours}h</p>
                  <p className="text-[10px] text-blue-200">Training</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-right min-w-[140px]">
                  <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wide">Available</p>
                  <p className="text-xl font-bold">{data.stats.leaveBalance}</p>
                  <p className="text-[10px] text-blue-200">Leave Days</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-in slide-in-from-bottom duration-700 hover:bg-white/15 transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFB547] p-1.5 rounded-lg">
                      <AlertCircle size={16} />
                    </div>
                    <p className="text-sm font-bold text-white">Quick Summary</p>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    You have <span className="font-bold text-white bg-[#EE5D50]/30 px-2 py-0.5 rounded">{data.stats.pendingRequests} pending requests</span> to review. 
                    Your next shift starts <span className="font-bold text-[#05CD99]">tomorrow at 09:00 AM</span>.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => onNavigate('general-requests')}
                    className="bg-white text-[#0B4DA2] px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-1 shadow-lg"
                  >
                    <CheckCircle size={14} />
                    View Requests
                  </button>
                  <button 
                    onClick={() => onNavigate('my-attendance')}
                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/30 hover:bg-white/30 transition-all active:scale-95 flex items-center gap-1"
                  >
                    <Calendar size={14} />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Icon */}
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-700">
            <Briefcase size={240} strokeWidth={1} />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-[#87CEEB]/40 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000"></div>
        </div>

        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[#1B254B] flex items-center gap-2">
              <Clock size={20} className="text-[#0B4DA2]" /> Attendance
            </h3>
            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded font-bold">Today</span>
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-[#1B254B] mb-1">08:55</div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Clock In</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shift</span>
              <span className="font-bold text-[#1B254B]">09:00 - 18:00</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#05CD99] w-[75%] h-full rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleClockIn} 
                disabled={isClockedIn}
                className={`text-xs font-bold py-2 rounded-lg transition-all active:scale-95 ${
                  isClockedIn 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#05CD99] text-white hover:bg-[#04B587]'
                }`}
              >
                Clock In
              </button>
              <button 
                onClick={handleClockOut} 
                disabled={!isClockedIn}
                className={`text-xs font-bold py-2 rounded-lg transition-all active:scale-95 ${
                  !isClockedIn 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#EE5D50] text-white hover:bg-[#DC4C3F]'
                }`}
              >
                Clock Out
              </button>
            </div>
            <button onClick={() => onNavigate('my-attendance')} className="w-full text-xs font-bold text-[#0B4DA2] hover:bg-blue-50 py-2 rounded-lg transition-colors">
              View Detailed Log
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          label="Leave Bal" 
          value={data.stats.leaveBalance} 
          icon={Calendar} 
          colorClass="text-[#0B4DA2] bg-[#0B4DA2]" 
          subtext="Days Remaining" 
          onClick={() => onNavigate('leaves')}
        />
        <StatCard 
          label="Canteen" 
          value={`₹${data.stats.canteenBalance}`} 
          icon={IndianRupee} 
          colorClass="text-[#EE5D50] bg-[#EE5D50]" 
          subtext="Credit Bal" 
          onClick={() => alert('Canteen Balance Details')}
        />
        <StatCard 
          label="Training" 
          value={data.stats.trainingHours} 
          icon={BookOpen} 
          colorClass="text-[#05CD99] bg-[#05CD99]" 
          subtext="Hours Completed" 
          onClick={() => onNavigate('training')}
        />
        <StatCard 
          label="Pending" 
          value={data.stats.pendingRequests} 
          icon={Clock} 
          colorClass="text-[#FFB547] bg-[#FFB547]" 
          subtext="Requests" 
          onClick={() => onNavigate('general-requests')}
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Zap size={20} className="text-[#FFB547]" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { label: "Leave", icon: Calendar, action: 'leaves' },
            { label: "Gate Pass", icon: LogOut, action: 'general-requests' },
            { label: "Payroll", icon: IndianRupee, action: 'payroll' },
            { label: "Projects", icon: Briefcase, action: 'projects' },
            { label: "Transport", icon: Truck, action: 'transport' },
            { label: "Mail", icon: Mail, action: 'mail' },
            { label: "Support", icon: LifeBuoy, action: 'general-requests' },
            { label: "Welfare", icon: Heart, action: 'welfare' },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={() => item.action === 'mail' ? alert("Opening Outlook...") : onNavigate(item.action)}
              className="flex flex-col items-center justify-center p-3 bg-white rounded-[20px] border border-gray-100 hover:border-[#0B4DA2]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group active:scale-95"
            >
              <div className="bg-[#F4F7FE] p-2.5 rounded-2xl mb-2 group-hover:bg-[#0B4DA2] group-hover:text-white text-[#0B4DA2] transition-colors shadow-sm">
                <item.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-[#1B254B] group-hover:text-[#0B4DA2] transition-colors">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodaysMeetingsCard meetings={data.meetings} />
        <KeyContactsCard contacts={data.keyContacts} reportingManager={data.user.reportingTo} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RecentRequestsCard requests={data.recentRequests} onNewRequest={() => alert('New Request Modal')} />
          <UpcomingTrainingCard training={data.upcomingTraining} />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#1B254B] text-lg">Notifications</h3>
              <button 
                onClick={() => onNavigate('notifications')}
                className="text-xs font-bold text-[#0B4DA2] hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {data.notifications.map((n, i) => (
                <div key={i} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-1.5 bg-[#0B4DA2] rounded-full shrink-0"/>
                  <div>
                    <p className="text-sm text-gray-600 leading-tight">{n.text}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MyAssetsCard assets={data.myAssets} />
        </div>
      </div>
    </div>
  );
};