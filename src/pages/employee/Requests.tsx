import React, { useState } from 'react';
import { RequestsTable } from '../../components/RequestsTable';
import { recentRequests } from '../../mock/mockData';
import { Plus, Filter } from 'lucide-react';

export function Requests() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const filteredRequests =
    filterStatus === 'All'
      ? recentRequests
      : recentRequests.filter((req) => req.status === filterStatus);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 style={{ color: 'var(--smg-dark)' }}>My Requests</h1>
          <p className="text-gray-600 mt-1">Track and manage your requests</p>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--smg-royal)' }}
        >
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} style={{ color: 'var(--smg-royal)' }} />
          <h3 className="text-sm" style={{ color: 'var(--smg-dark)' }}>
            Filter by Status
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Approved', 'Pending', 'In Progress', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterStatus === status
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: filterStatus === status ? 'var(--smg-royal)' : undefined,
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <RequestsTable requests={filteredRequests} showViewButton />

      {/* New Request Modal (Simple version - can be enhanced) */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="mb-4" style={{ color: 'var(--smg-dark)' }}>
              Create New Request
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Select the type of request you want to create:
            </p>
            <div className="space-y-2">
              {['Leave Application', 'Reimbursement', 'Asset Request', 'Certificate Request'].map(
                (type) => (
                  <button
                    key={type}
                    className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowNewRequestModal(false)}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setShowNewRequestModal(false)}
              className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
