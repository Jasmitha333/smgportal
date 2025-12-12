import React, { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const LeavesPage = () => {
  const [showNewLeaveForm, setShowNewLeaveForm] = useState(false);

  const leaveBalance = [
    { type: 'Annual Leave', total: 20, used: 8, remaining: 12, color: '#0B4DA2' },
    { type: 'Sick Leave', total: 10, used: 2, remaining: 8, color: '#05CD99' },
    { type: 'Casual Leave', total: 8, used: 3, remaining: 5, color: '#FFB547' },
  ];

  const leaveRequests = [
    { id: 1, type: 'Annual Leave', from: '2024-12-20', to: '2024-12-24', days: 5, reason: 'Diwali Vacation', status: 'Approved', approver: 'Priya Sharma' },
    { id: 2, type: 'Sick Leave', from: '2024-11-15', to: '2024-11-15', days: 1, reason: 'Fever', status: 'Approved', approver: 'Priya Sharma' },
    { id: 3, type: 'Casual Leave', from: '2024-12-30', to: '2024-12-31', days: 2, reason: 'Personal Work', status: 'Pending', approver: 'Priya Sharma' },
    { id: 4, type: 'Annual Leave', from: '2024-10-10', to: '2024-10-12', days: 3, reason: 'Family Function', status: 'Rejected', approver: 'Priya Sharma' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle size={16} className="text-[#05CD99]" />;
      case 'Rejected': return <XCircle size={16} className="text-[#EE5D50]" />;
      default: return <Clock size={16} className="text-[#FFB547]" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-50 text-[#05CD99]';
      case 'Rejected': return 'bg-red-50 text-[#EE5D50]';
      default: return 'bg-orange-50 text-[#FFB547]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2 flex items-center gap-3"><Calendar size={32} /> Leave Management</h1>
            <p className="text-[#87CEEB] opacity-90">Apply for leaves and track your requests</p>
          </div>
          <button 
            onClick={() => setShowNewLeaveForm(!showNewLeaveForm)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Apply Leave
          </button>
        </div>
      </div>

      {showNewLeaveForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#0B4DA2]">
          <h3 className="text-[#1B254B] mb-6">New Leave Application</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Leave Type</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none">
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Number of Days</label>
              <input type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="1" />
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">From Date</label>
              <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" />
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">To Date</label>
              <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-[#A3AED0] mb-2 block">Reason</label>
              <textarea rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Enter reason for leave..."></textarea>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors">
              Submit Application
            </button>
            <button 
              onClick={() => setShowNewLeaveForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveBalance.map((leave, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-[#1B254B] mb-4">{leave.type}</h4>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-[#A3AED0]">Remaining</p>
                <p className="text-4xl font-bold" style={{ color: leave.color }}>{leave.remaining}</p>
              </div>
              <p className="text-sm text-[#A3AED0]">of {leave.total} days</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(leave.used / leave.total) * 100}%`, backgroundColor: leave.color }}
              />
            </div>
            <p className="text-xs text-[#A3AED0] mt-2">{leave.used} days used</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] mb-6">Leave History</h3>
        <div className="space-y-3">
          {leaveRequests.map((request) => (
            <div key={request.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-[#0B4DA2] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-[#1B254B]">{request.type}</h4>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#A3AED0]">
                    <p className="flex items-center gap-1">
                      <Calendar size={14} /> {request.from} to {request.to}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock size={14} /> {request.days} day{request.days > 1 ? 's' : ''}
                    </p>
                    <p>Approver: {request.approver}</p>
                  </div>
                  <p className="text-sm text-[#A3AED0] mt-2">Reason: {request.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
