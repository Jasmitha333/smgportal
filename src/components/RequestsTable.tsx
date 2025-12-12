import React from 'react';
import { FileText, Eye } from 'lucide-react';

const statusColors = {
  Approved: { bg: '#E8F5E9', text: '#10b981' },
  Pending: { bg: '#FFF3E0', text: '#f59e0b' },
  'In Progress': { bg: '#E3F2FD', text: '#0B4DA2' },
  Rejected: { bg: '#FFEBEE', text: '#ef4444' },
};

interface Request {
  id: string;
  type: string;
  description: string;
  date: string;
  status: string;
  approver: string;
}

interface RequestsTableProps {
  requests: Request[];
  showViewButton?: boolean;
}

export function RequestsTable({ requests, showViewButton = false }: RequestsTableProps) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--smg-border)' }}>
      <div className="p-6" style={{ borderBottom: '1px solid var(--smg-border)' }}>
        <div className="flex items-center justify-between">
          <h3 style={{ color: 'var(--smg-dark)' }}>Recent Requests</h3>
          <span className="text-xs text-gray-500">{requests.length} total</span>
        </div>
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead style={{ backgroundColor: 'var(--smg-bg)' }}>
            <tr>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Request ID
              </th>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Approver
              </th>
              {showViewButton && (
                <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => {
              const statusStyle = (statusColors as any)[request.status] || statusColors.Pending;
              return (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors" style={{ borderTop: index > 0 ? '1px solid var(--smg-border)' : 'none' }}>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium" style={{ color: 'var(--smg-royal)' }}>{request.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--smg-dark)' }}>{request.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                      }}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.approver}</td>
                  {showViewButton && (
                    <td className="px-6 py-4">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="View details"
                      >
                        <Eye size={18} style={{ color: 'var(--smg-royal)' }} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden">
        {requests.map((request, index) => {
          const statusStyle = (statusColors as any)[request.status] || statusColors.Pending;
          return (
            <div key={request.id} className="p-4" style={{ borderTop: index > 0 ? '1px solid var(--smg-border)' : 'none' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={18} style={{ color: 'var(--smg-royal)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--smg-royal)' }}>
                    {request.id}
                  </span>
                </div>
                <span
                  className="inline-flex px-3 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                  }}
                >
                  {request.status}
                </span>
              </div>
              <h4 className="text-sm mb-1 font-medium" style={{ color: 'var(--smg-dark)' }}>
                {request.type}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{request.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{request.date}</span>
                <span>{request.approver}</span>
              </div>
            </div>
          );
        })}
      </div>

      {requests.length === 0 && (
        <div className="p-12 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-3 opacity-20" />
          <p>No requests found</p>
        </div>
      )}
    </div>
  );
}