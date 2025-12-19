import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, User, FileText, Upload, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

interface UserData {
  name: string;
  empId: string;
  dept: string;
  role: string;
  phone: string;
  email: string;
  dateOfJoining: string;
  reportingTo: string;
  workLocation: string;
  avatar: string;
}

export const LeavesPage = () => {
  const { user } = useAuth();
  const [showNewLeaveForm, setShowNewLeaveForm] = useState(false);
  const [leaveType, setLeaveType] = useState<'medical' | 'wfh'>('medical');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [reason, setReason] = useState('');
  const [medicalDocument, setMedicalDocument] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAccess, setEmailAccess] = useState<'yes' | 'no' | ''>('');
  const [confirmDeclaration, setConfirmDeclaration] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Employee data
  const employee: UserData = {
    name: "Pulkit Verma",
    empId: "EMP-4721",
    dept: "IT",
    role: "Full-Time Intern",
    phone: "+91 98765 43210",
    email: "pulkit.verma@company.com",
    dateOfJoining: "15 March 2024",
    reportingTo: "Ms. Riya Sharma (IT Team Lead)",
    workLocation: "Noida, Uttar Pradesh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pulkit&backgroundColor=b6e3f4"
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2 MB');
        return;
      }
      setMedicalDocument(file);
    }
  };

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !reason) {
      alert('Please fill all required fields');
      return;
    }
    if (leaveType === 'medical' && !confirmDeclaration) {
      alert('Please confirm the medical leave declaration');
      return;
    }
    if (leaveType === 'wfh' && !confirmDeclaration) {
      alert('Please confirm the work from home declaration');
      return;
    }

    if (!user) {
      alert('User not authenticated');
      return;
    }

    // Validate user has required fields
    const userId = user.uid || user.id;
    if (!userId) {
      console.error('User object:', user);
      alert('User ID not found. Please log out and log in again.');
      return;
    }

    setLoading(true);
    try {
      // File upload temporarily disabled
      const documentUrl = '';

      // Calculate days
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Create leave request in Firestore
      const leaveData = {
        requestType: 'leave',
        title: `${leaveType === 'medical' ? 'Medical Leave' : 'Work From Home'} Request`,
        description: reason,
        userId: userId,
        employeeId: user.employeeId || user.empId || 'N/A',
        employeeName: user.name || user.fullName || user.email,
        department: user.department || user.dept || 'N/A',
        status: 'pending',
        priority: 'medium',
        requestData: {
          leaveType: leaveType === 'medical' ? 'sick' : 'wfh',
          startDate: new Date(fromDate),
          endDate: new Date(toDate),
          totalDays: days,
          reason: reason,
          phoneNumber: phoneNumber || user.phone || '',
          emailAccess: emailAccess,
          documentUrl: documentUrl
        },
        attachments: [],
        approvers: [],
        submittedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'requests'), leaveData);
      
      alert('✅ Leave application submitted successfully!');
      handleCancel();
      fetchLeaveRequests(); // Refresh the list
    } catch (error) {
      console.error('Error submitting leave:', error);
      alert('❌ Failed to submit leave application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setNumberOfDays('');
    setReason('');
    setMedicalDocument(null);
    setPhoneNumber('');
    setEmailAccess('');
    setConfirmDeclaration(false);
    setShowNewLeaveForm(false);
  };

  const leaveBalance = [
    { type: 'Annual Leave', total: 20, used: 8, remaining: 12, color: '#0B4DA2' },
    { type: 'Sick Leave', total: 10, used: 2, remaining: 8, color: '#05CD99' },
    { type: 'Casual Leave', total: 8, used: 3, remaining: 5, color: '#FFB547' },
  ];

  // Fetch leave requests from Firebase
  const fetchLeaveRequests = async () => {
    if (!user || !user.uid) {
      console.log('⚠️ User not available yet, skipping fetch');
      return;
    }
    
    try {
      const q = query(
        collection(db, 'requests'),
        where('userId', '==', user.uid),
        where('requestType', '==', 'leave'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.requestData?.leaveType === 'sick' ? 'Medical Leave' : data.requestData?.leaveType === 'wfh' ? 'Work From Home' : 'Leave',
          from: data.requestData?.startDate?.toDate?.()?.toISOString().split('T')[0] || '',
          to: data.requestData?.endDate?.toDate?.()?.toISOString().split('T')[0] || '',
          days: data.requestData?.totalDays || 0,
          reason: data.description || '',
          status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
          approver: data.approvers?.[0]?.name || 'Pending Assignment'
        };
      });
      
      setLeaveRequests(requests);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Rejected': return <XCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Gradient Banner */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Apply Leave</h1>          </div>
          <button
            onClick={() => setShowNewLeaveForm(!showNewLeaveForm)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Apply Leave
          </button>
        </div>
      </div>

      {showNewLeaveForm && (
        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-200 mb-6">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] -mx-8 -mt-8 px-8 py-4 rounded-t-[30px] mb-6">
            <h3 className="text-xl font-bold rounded-t-[30px] text-white">Apply Leave</h3>
          </div>

          {/* Employee Details Section */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Employee Details</h4>
            <div className="flex gap-6">
              {/* Employee Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Employee Info Grid */}
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <label className="text-xs font-semibold text-gray-500">Employee Name</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Employee ID</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.empId}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Department</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.dept}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Role / Designation</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.role}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Phone Number</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Email ID</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Date of Joining</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.dateOfJoining}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Reporting Manager</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.reportingTo}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Work Location</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.workLocation}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Employment Type</label>
                  <p className="text-gray-900 font-medium mt-1">{employee.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setLeaveType('medical')}
              className={`py-3 text-center text-base font-semibold transition-all rounded-xl ${leaveType === 'medical'
                ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#0B4DA2]'
                }`}
            >
              Medical Leave
            </button>
            <button
              onClick={() => setLeaveType('wfh')}
              className={`py-3 text-center text-base font-semibold transition-all rounded-xl ${leaveType === 'wfh'
                ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#0B4DA2]'
                }`}
            >
              Work From Home
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Date Fields */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">From Date :</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">To Date :</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Number Of Days :</label>
                <input
                  type="number"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                  placeholder="Auto-calculated"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Reason Field */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                {leaveType === 'medical' ? 'Reason For Medical Leave :' : 'Reason For Work From Home :'}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all resize-none"
                placeholder={leaveType === 'medical' ? "Explain your medical condition..." : "Explain the purpose of leaving the office..."}
              />
            </div>

            {/* Conditional Fields Based on Leave Type */}
            {leaveType === 'medical' ? (
              <>
                {/* Medical Documents Upload */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Medical Documents :</label>
                  <div className="border-2 border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      id="medical-upload"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="medical-upload"
                      className="cursor-pointer flex items-center gap-3"
                    >
                      <div className="px-4 py-2 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                        Choose File
                      </div>
                      <span className="text-gray-600 text-sm">
                        {medicalDocument ? medicalDocument.name : 'No File Chosen'}
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload Medical Certificate / Prescription (Optional)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Allowed Formats: PDF, JPG, PNG | Max Size: 2 MB
                    </p>
                  </div>
                </div>

                {/* Declaration Checkbox */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmDeclaration}
                      onChange={(e) => setConfirmDeclaration(e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      I declare that all the information provided is true and I am genuinely unable to attend work due to medical reasons.
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <>
                {/* Communication Availability */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Communication Availability :</label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Phone Number:</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Email Access:</label>
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailAccess === 'yes'}
                            onChange={(e) => setEmailAccess(e.target.checked ? 'yes' : '')}
                            className="w-4 h-4 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2]"
                          />
                          <span className="text-sm text-gray-700 font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailAccess === 'no'}
                            onChange={(e) => setEmailAccess(e.target.checked ? 'no' : '')}
                            className="w-4 h-4 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2]"
                          />
                          <span className="text-sm text-gray-700 font-medium">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WFH Declaration */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmDeclaration}
                      onChange={(e) => setConfirmDeclaration(e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      I confirm that I will be available during work hours, complete the tasks assigned, and maintain productivity while working from home.
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="px-8 py-2.5 bg-white border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!fromDate || !toDate || !reason || !confirmDeclaration || loading}
                className="px-8 py-2.5 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Balance Cards - Left Side */}
        <div className="lg:col-span-1 space-y-4">
          {leaveBalance.map((leave, idx) => (
            <div key={idx} className="bg-white rounded-[20px] p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${leave.color}15` }}>
                  <Calendar className="w-4 h-4" style={{ color: leave.color }} />
                </div>
                <h4 className="text-base font-bold text-gray-800">{leave.type}</h4>
              </div>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Remaining</p>
                  <p className="text-3xl font-bold" style={{ color: leave.color }}>{leave.remaining}</p>
                </div>
                <p className="text-xs text-gray-500 font-medium">of {leave.total} days</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(leave.used / leave.total) * 100}%`, backgroundColor: leave.color }}
                />
              </div>
              <p className="text-xs text-gray-500 font-medium mt-2">{leave.used} used • {leave.remaining} left</p>
            </div>
          ))}
        </div>

        {/* Recent Leave Requests - Right Side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[30px] p-6 shadow-xl border border-gray-200 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recent Leave Requests</h3>
            </div>

            <div className="space-y-3">
              {leaveRequests.map((request) => (
                <div key={request.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-[#0B4DA2] hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0B4DA2]/10 to-[#042A5B]/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-[#0B4DA2]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base">{request.type}</h4>
                        <p className="text-xs text-gray-500">{request.days} day{request.days > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span>{request.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Duration</p>
                      <p className="text-sm text-gray-700 font-semibold">{request.from} to {request.to}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Approver</p>
                      <p className="text-sm text-gray-700 font-semibold flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {request.approver}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Reason</p>
                      <p className="text-sm text-gray-700">{request.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
