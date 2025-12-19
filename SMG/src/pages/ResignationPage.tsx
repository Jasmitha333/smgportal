import { useState } from 'react';
import { Calendar, User, FileText, Clock, UserX } from 'lucide-react';

interface UserData {
    name: string;
    empId: string;
    dept: string;
    reportingTo: string;
    dateOfJoining: string;
    role: string;
    avatar: string;
}

interface ResignationPageProps {
    user?: UserData;
}

export const ResignationPage = ({ user }: ResignationPageProps) => {
    const [activeTab, setActiveTab] = useState<'details' | 'status'>('details');
    const [lastWorkingDay, setLastWorkingDay] = useState('');
    const [reason, setReason] = useState('');
    const [noticePeriodServed, setNoticePeriodServed] = useState<'yes' | 'no' | ''>('');
    const [confirmIntent, setConfirmIntent] = useState(false);

    // Default employee data if no user prop is provided
    const employee = user || {
        name: "Pulkit Verma",
        empId: "EMP-4721",
        dept: "IT",
        reportingTo: "Priya Sharma",
        dateOfJoining: "15 March 2024",
        role: "Full-Time Intern",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pulkit&backgroundColor=b6e3f4"
    };

    const resignationStatus = {
        dateApplied: "05 March 2026",
        lastWorkingDay: "06 April 2026",
        managerApproval: "Pending",
        hrApproval: "Pending",
        finalStatus: "In Process"
    };

    const handleSubmit = () => {
        if (!confirmIntent || !lastWorkingDay || !reason || !noticePeriodServed) {
            alert('Please fill all required fields');
            return;
        }

        alert('Resignation submitted successfully!');

        // Reset form after successful submission
        setLastWorkingDay('');
        setReason('');
        setNoticePeriodServed('');
        setConfirmIntent(false);
    };

    const handleCancel = () => {
        setLastWorkingDay('');
        setReason('');
        setNoticePeriodServed('');
        setConfirmIntent(false);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <div className="space-y-6">
                {/* Header Banner */}
                <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl shadow-blue-900/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl">
                            <UserX size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Resignation</h1>
                            <p className="text-blue-100 text-sm">{employee.name} • {employee.empId}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Employee Name</p>
                            <p className="text-2xl font-bold">{employee.name}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Department</p>
                            <p className="text-2xl font-bold">{employee.dept}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Date of Joining</p>
                            <p className="text-2xl font-bold">{employee.dateOfJoining}</p>
                        </div>
                    </div>
                </div>

                {/* Employee Details Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-white" />
                            Employee Details
                        </h3>
                    </div>

                    <div className="p-6">
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
                            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee Name</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee ID</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.empId}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.dept}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employment Type</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.role}</p>
                                </div>

                                <div className="col-span-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reporting Manager</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.reportingTo}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date of Joining</label>
                                    <p className="text-gray-900 font-medium mt-1">{employee.dateOfJoining}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="grid grid-cols-2 gap-1 mt-6 shadow-xl rounded-lg overflow-hidden bg-gray-200 p-1">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`py-4 text-center text-lg font-semibold transition-all duration-200 rounded-md ${activeTab === 'details'
                            ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                            : 'bg-white text-[#0B4DA2] hover:bg-gray-50'
                            }`}
                    >
                        Resignation Details
                    </button>
                    <button
                        onClick={() => setActiveTab('status')}
                        className={`py-4 text-center text-lg font-semibold transition-all duration-200 rounded-md ${activeTab === 'status'
                            ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                            : 'bg-white text-[#0B4DA2] hover:bg-gray-50'
                            }`}
                    >
                        Resignation Status
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white shadow-xl rounded-lg p-8 mt-1">
                    {activeTab === 'details' ? (
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Last Working Day */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <label className="block text-sm font-semibold text-[#0B4DA2] mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#0B4DA2]" />
                                    Last Working Day (LWD)
                                </label>
                                <input
                                    type="date"
                                    value={lastWorkingDay}
                                    onChange={(e) => setLastWorkingDay(e.target.value)}
                                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 transition-all"
                                />
                            </div>

                            {/* Reason for Resignation */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <label className="block text-sm font-semibold text-[#0B4DA2] mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#0B4DA2]" />
                                    Reason For Resignation
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 resize-none transition-all"
                                    placeholder="Please provide a detailed reason for your resignation..."
                                />
                            </div>

                            {/* Notice Period Served */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <label className="block text-sm font-semibold text-[#0B4DA2] mb-4 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#0B4DA2]" />
                                    Notice Period Served?
                                </label>
                                <div className="flex gap-16">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={noticePeriodServed === 'yes'}
                                            onChange={(e) => setNoticePeriodServed(e.target.checked ? 'yes' : '')}
                                            className="w-5 h-5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0B4DA2] transition-colors">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={noticePeriodServed === 'no'}
                                            onChange={(e) => setNoticePeriodServed(e.target.checked ? 'no' : '')}
                                            className="w-5 h-5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0B4DA2] transition-colors">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Confirmation Checkbox */}
                            <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={confirmIntent}
                                        onChange={(e) => setConfirmIntent(e.target.checked)}
                                        className="w-5 h-5 mt-0.5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-800 font-medium leading-relaxed">
                                        I hereby confirm my intent to resign from the company and request acceptance of my resignation.
                                    </span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    onClick={handleCancel}
                                    className="px-8 py-2.5 bg-white border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-all font-semibold shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!confirmIntent || !lastWorkingDay || !reason || !noticePeriodServed}
                                    className="px-8 py-2.5 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all font-semibold shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none active:scale-95"
                                >
                                    Submit Resignation
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* Resignation Status View */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date Applied</label>
                                    <p className="text-gray-900 font-semibold text-lg mt-2">{resignationStatus.dateApplied}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Last Working Day</label>
                                    <p className="text-gray-900 font-semibold text-lg mt-2">{resignationStatus.lastWorkingDay}</p>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg border border-yellow-200">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Manager Approval</label>
                                    <p className="text-gray-900 font-semibold mt-2">
                                        <span className="inline-block px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                                            {resignationStatus.managerApproval}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-600 mt-2">Pending / Approved / Rejected</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">HR Approval</label>
                                    <p className="text-gray-900 font-semibold mt-2">
                                        <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                                            {resignationStatus.hrApproval}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-600 mt-2">Pending / Approved</p>
                                </div>

                                <div className="col-span-2 bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg border border-indigo-200">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Final Status</label>
                                    <p className="text-gray-900 font-bold text-xl mt-2">
                                        <span className="inline-block px-4 py-2 bg-indigo-200 text-indigo-900 rounded-lg">
                                            {resignationStatus.finalStatus}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
