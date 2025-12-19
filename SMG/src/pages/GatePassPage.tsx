import { useState } from 'react';
import { LogOut, Calendar, Clock, FileText, CheckCircle, XCircle, Upload, AlertCircle } from 'lucide-react';

interface GatePassHistory {
    id: number;
    date: string;
    exitTime: string;
    returnTime: string;
    duration: string;
    reason: string;
    status: 'Approved' | 'Pending' | 'Rejected';
}

export const GatePassPage = () => {
    const [gatePassType, setGatePassType] = useState('Official Work Outside');
    const [exitDate, setExitDate] = useState('');
    const [exitTime, setExitTime] = useState('');
    const [expectedReturnTime, setExpectedReturnTime] = useState('');
    const [reason, setReason] = useState('');
    const [confirmRules, setConfirmRules] = useState(false);
    const [supportingDocument, setSupportingDocument] = useState<File | null>(null);

    const gatePassHistory: GatePassHistory[] = [
        {
            id: 1,
            date: '05 Jan 2026',
            exitTime: '3:00 PM',
            returnTime: '3:45 PM',
            duration: '45 mins',
            reason: 'Personal work',
            status: 'Approved'
        },
        {
            id: 2,
            date: '10 Jan 2026',
            exitTime: '2:30 PM',
            returnTime: '4:00 PM',
            duration: '1 hr 30 mins',
            reason: 'Official visit',
            status: 'Pending'
        },
        {
            id: 3,
            date: '12 Jan 2026',
            exitTime: '4:00 PM',
            returnTime: '--',
            duration: 'Early Exit',
            reason: 'Medical',
            status: 'Approved'
        }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Check file size (Max 2 MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2 MB');
                return;
            }
            setSupportingDocument(file);
        }
    };

    const handleSubmit = () => {
        if (!exitDate || !exitTime || !expectedReturnTime || !reason || !confirmRules) {
            alert('Please fill all required fields and confirm the rules');
            return;
        }

        alert('Gate Pass request submitted successfully!');

        // Reset form
        setExitDate('');
        setExitTime('');
        setExpectedReturnTime('');
        setReason('');
        setConfirmRules(false);
        setSupportingDocument(null);
    };

    const handleCancel = () => {
        setExitDate('');
        setExitTime('');
        setExpectedReturnTime('');
        setReason('');
        setConfirmRules(false);
        setSupportingDocument(null);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approved</span>
                    </span>
                );
            case 'Rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Rejected</span>
                    </span>
                );
            case 'Pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <div className="space-y-6">
                {/* Gradient Banner */}
                <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl">
                            <LogOut className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Gate Pass</h1>
                            <p className="text-white/80 text-lg mt-1">Request permission to leave office premises</p>
                        </div>
                    </div>
                </div>

                {/* Gate Pass Form */}
                <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Request Gate Pass</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Type Dropdown */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Type *</label>
                            <select
                                value={gatePassType}
                                onChange={(e) => setGatePassType(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all bg-white"
                            >
                                <option>Official Work Outside</option>
                                <option>Personal Work</option>
                                <option>Medical Emergency</option>
                                <option>Family Emergency</option>
                                <option>Early Exit</option>
                            </select>
                        </div>

                        {/* Date and Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Exit Date *</label>
                                <input
                                    type="date"
                                    value={exitDate}
                                    onChange={(e) => setExitDate(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Exit Time *</label>
                                <input
                                    type="time"
                                    value={exitTime}
                                    onChange={(e) => setExitTime(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Expected Return Time *</label>
                                <input
                                    type="time"
                                    value={expectedReturnTime}
                                    onChange={(e) => setExpectedReturnTime(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Reason For Exit *</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all resize-none"
                                placeholder="Explain the purpose of leaving the office..."
                            />
                        </div>

                        {/* Supporting Documents */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Supporting Documents (Optional)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#0B4DA2] transition-all">
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex flex-col items-center gap-2"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B4DA2]/10 to-[#042A5B]/10 rounded-xl flex items-center justify-center">
                                        <Upload className="w-6 h-6 text-[#0B4DA2]" />
                                    </div>
                                    {supportingDocument ? (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{supportingDocument.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {(supportingDocument.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">Choose File</p>
                                            <p className="text-xs text-gray-500 mt-1">For official work only</p>
                                        </div>
                                    )}
                                </label>
                                <p className="text-xs text-gray-400 mt-2">
                                    Allowed Formats: PDF, JPG, PNG | Max Size: 2 MB
                                </p>
                            </div>
                        </div>

                        {/* Confirmation Checkbox */}
                        <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={confirmRules}
                                    onChange={(e) => setConfirmRules(e.target.checked)}
                                    className="w-5 h-5 mt-0.5 text-[#0B4DA2] border-gray-300 rounded focus:ring-[#0B4DA2] cursor-pointer"
                                />
                                <span className="text-sm text-gray-800 font-medium leading-relaxed">
                                    I confirm I will return on time and follow company rules.
                                </span>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={handleCancel}
                                className="px-8 py-3 bg-white border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-500 transition-all font-semibold shadow-md hover:shadow-lg active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!exitDate || !exitTime || !expectedReturnTime || !reason || !confirmRules}
                                className="px-8 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all font-semibold shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none active:scale-95"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Gate Pass History */}
                <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Gate Pass History</h3>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border-2 border-gray-300 shadow-md">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Exit Time
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Return Time
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Duration
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Reason
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {gatePassHistory.map((pass, index) => (
                                        <tr
                                            key={pass.id}
                                            className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-900 font-medium">{pass.date}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-700">{pass.exitTime}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-700">{pass.returnTime}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-700">{pass.duration}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-700">{pass.reason}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-start">
                                                    {getStatusBadge(pass.status)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
