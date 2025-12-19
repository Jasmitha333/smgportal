import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

interface LeaveHistoryPageProps {
    user?: {
        name: string;
        empId: string;
    };
    onNavigate?: (page: string) => void;
}

export const LeaveHistoryPage = ({ user: propUser, onNavigate }: LeaveHistoryPageProps) => {
    const { user: authUser } = useAuth();
    const user = propUser || authUser;
    const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch leave history from Firebase
    useEffect(() => {
        const fetchLeaveHistory = async () => {
            if (!authUser) {
                console.log('⚠️ Auth user not available yet');
                setLoading(false);
                return;
            }

            const userId = authUser.uid || authUser.id;
            if (!userId) {
                console.error('User ID not found:', authUser);
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, 'requests'),
                    where('userId', '==', userId),
                    where('requestType', '==', 'leave'),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const history = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const startDate = data.requestData?.startDate?.toDate?.();
                    const endDate = data.requestData?.endDate?.toDate?.();
                    const createdAt = data.createdAt?.toDate?.();

                    return {
                        id: doc.id,
                        dateApplied: createdAt ? createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
                        fromTo: startDate && endDate 
                            ? `${startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - ${endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`
                            : 'N/A',
                        type: data.requestData?.leaveType === 'sick' ? 'Medical Leave' : data.requestData?.leaveType === 'wfh' ? 'Work From Home' : 'Leave',
                        days: `${data.requestData?.totalDays || 0} Day${data.requestData?.totalDays > 1 ? 's' : ''}`,
                        reason: data.description || 'No reason provided',
                        status: data.status.charAt(0).toUpperCase() + data.status.slice(1)
                    };
                });

                setLeaveHistory(history);
            } catch (error) {
                console.error('Error fetching leave history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaveHistory();
    }, [authUser]);

    const approvedCount = leaveHistory.filter((l) => l.status === 'Approved').length;
    const rejectedCount = leaveHistory.filter((l) => l.status === 'Rejected').length;
    const pendingCount = leaveHistory.filter((l) => l.status === 'Pending').length;
    const totalLeaveDays = leaveHistory
        .filter((l) => l.status === 'Approved')
        .reduce((sum, l) => sum + parseInt(l.days), 0);

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
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl shadow-blue-900/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Leave History</h1>
                            <p className="text-blue-100 text-sm">{user?.name || 'Employee'} • {user?.empId || 'EMP-XXXX'}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Total Applications</p>
                            <p className="text-2xl font-bold">{leaveHistory.length}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Approved Leaves</p>
                            <p className="text-2xl font-bold">{totalLeaveDays} Days</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <p className="text-xs text-blue-100 mb-1">Current Month</p>
                            <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                {/* Check Leave History Section */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Check Leave History</h2>
                        <button
                            onClick={() => onNavigate?.('leaves')}
                            className="bg-white text-[#0B4DA2] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all active:scale-95 shadow-md"
                        >
                            Apply New Leave
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-b-2xl border-2 border-gray-300 shadow-md">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white">
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Date Applied
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            From - To
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Type of Leave
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r-2 border-white/20">
                                            Days
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
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                Loading leave history...
                                            </td>
                                        </tr>
                                    ) : leaveHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No leave applications found. Apply your first leave!
                                            </td>
                                        </tr>
                                    ) : leaveHistory.map((leave, index) => (
                                        <tr
                                            key={leave.id}
                                            className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-900 font-medium">{leave.dateApplied}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-700">{leave.fromTo}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-900 font-medium">{leave.type}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-700">{leave.days}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-700">{leave.reason}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-start">
                                                    {getStatusBadge(leave.status)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Info */}
                        <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
                                <span className="text-gray-600">
                                    Showing <span className="font-semibold text-gray-900">{leaveHistory.length}</span> leave applications
                                </span>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-700 font-medium">Approved: <span className="font-bold">{leaveHistory.filter((l) => l.status === 'Approved').length}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-gray-700 font-medium">Rejected: <span className="font-bold">{leaveHistory.filter((l) => l.status === 'Rejected').length}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <span className="text-gray-700 font-medium">Pending: <span className="font-bold">{leaveHistory.filter((l) => l.status === 'Pending').length}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
