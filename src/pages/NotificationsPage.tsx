import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck, Trash2, Filter, Clock, Calendar, AlertCircle, Info, CheckCircle } from 'lucide-react';

export const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Leave Request Approved',
      message: 'Your leave request for Dec 15-17 has been approved by Ramesh Kumar.',
      time: '2 hours ago',
      date: 'Today, 02:30 PM',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Training Session Reminder',
      message: 'Safety Training Workshop starts tomorrow at 10:00 AM in Conference Room A.',
      time: '5 hours ago',
      date: 'Today, 11:15 AM',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Pending Action Required',
      message: 'Please submit your monthly timesheet by end of day tomorrow.',
      time: '1 day ago',
      date: 'Yesterday, 03:45 PM',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Payslip Available',
      message: 'Your payslip for November 2024 is now available for download.',
      time: '2 days ago',
      date: 'Dec 10, 09:00 AM',
      read: true
    },
    {
      id: 5,
      type: 'success',
      title: 'Gate Pass Approved',
      message: 'Your gate pass request for Dec 12 has been approved.',
      time: '2 days ago',
      date: 'Dec 10, 02:15 PM',
      read: true
    },
    {
      id: 6,
      type: 'info',
      title: 'New Policy Update',
      message: 'Updated Work from Home policy is now available. Please review the changes.',
      time: '3 days ago',
      date: 'Dec 9, 10:30 AM',
      read: true
    },
    {
      id: 7,
      type: 'warning',
      title: 'Document Expiring Soon',
      message: 'Your vehicle insurance document expires on Dec 20, 2024. Please update.',
      time: '4 days ago',
      date: 'Dec 8, 04:00 PM',
      read: true
    },
    {
      id: 8,
      type: 'success',
      title: 'Training Completed',
      message: 'You have successfully completed the "Advanced Scooter Maintenance" course.',
      time: '5 days ago',
      date: 'Dec 7, 11:45 AM',
      read: true
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-600" size={20} />;
      case 'warning': return <AlertCircle className="text-yellow-600" size={20} />;
      default: return <Info className="text-blue-600" size={20} />;
    }
  };

  const getTypeClass = (type) => {
    switch(type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : selectedFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] via-[#063A75] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-blue-100">Stay updated with all your important alerts</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
            <p className="text-xs text-blue-200 mb-1">Unread</p>
            <p className="text-3xl font-bold">{unreadCount}</p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${ selectedFilter === 'all'
                  ? 'bg-[#0B4DA2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedFilter('unread')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'unread'
                  ? 'bg-[#0B4DA2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setSelectedFilter('read')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'read'
                  ? 'bg-[#0B4DA2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-green-50 text-green-600 hover:bg-green-100 transition-all flex items-center gap-1">
              <CheckCheck size={14} />
              Mark All Read
            </button>
            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center gap-1">
              <Trash2 size={14} />
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-[20px] p-5 shadow-sm border transition-all hover:shadow-md ${
              notification.read ? 'border-gray-100' : 'border-[#0B4DA2]/30 bg-blue-50/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getTypeClass(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-[#1B254B] flex items-center gap-2">
                      {notification.title}
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#0B4DA2] rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {notification.time}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {notification.date}
                  </span>
                  {!notification.read && (
                    <button className="ml-auto text-xs font-bold text-[#0B4DA2] hover:underline flex items-center gap-1">
                      <Check size={12} />
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-[24px] p-12 text-center shadow-sm border border-gray-100">
          <Bell size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-[#1B254B] mb-2">No Notifications</h3>
          <p className="text-gray-500">You're all caught up! No {selectedFilter !== 'all' ? selectedFilter : ''} notifications to show.</p>
        </div>
      )}
    </div>
  );
};
