import React from 'react';
import { SummaryCard } from '../../components/SummaryCard';
import { QuickActions } from '../../components/QuickActions';
import { RequestsTable } from '../../components/RequestsTable';
import { useAuth } from '../../context/AuthContext';
import {
  summaryStats,
  quickActions,
  recentRequests,
  upcomingTraining,
  assignedAssets,
  teamContacts,
} from '../../mock/mockData';
import { Calendar, Package, Users } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <h1 style={{ color: 'var(--smg-dark)' }}>
            Hey {user?.name?.split(' ')[0] || 'Employee'} 👋
          </h1>
        </div>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Summary Cards - Horizontally scrollable on mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
          {summaryStats.map((stat) => (
            <SummaryCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left/Center Column - Requests Table */}
        <div className="xl:col-span-2">
          <RequestsTable requests={recentRequests.slice(0, 5)} />
        </div>

        {/* Right Column - Info Panels */}
        <div className="space-y-6">
          {/* Upcoming Training */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--smg-light-blue)' }}>
                  <Calendar size={20} style={{ color: 'var(--smg-royal)' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>Upcoming Training</h3>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingTraining.slice(0, 3).map((training) => (
                <div
                  key={training.id}
                  className="p-4 bg-gray-50 rounded-xl border hover:shadow-md transition-all cursor-pointer group"
                  style={{ borderColor: 'var(--smg-border)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors" style={{ color: 'var(--smg-dark)' }}>
                      {training.title}
                    </h4>
                    {training.mandatory && (
                      <span
                        className="text-xs px-2 py-1 rounded-lg font-medium whitespace-nowrap"
                        style={{
                          backgroundColor: '#FEF2F2',
                          color: '#ef4444',
                        }}
                      >
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{training.date}</p>
                  <p className="text-xs text-gray-500">{training.duration} • {training.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Assets */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F3E5F5' }}>
                  <Package size={20} style={{ color: '#9333ea' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>My Assets</h3>
              </div>
            </div>
            <div className="space-y-2">
              {assignedAssets.slice(0, 4).map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: 'var(--smg-dark)' }}>
                      {asset.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{asset.type}</p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-lg font-medium"
                    style={{
                      backgroundColor: '#ECFDF5',
                      color: '#10b981',
                    }}
                  >
                    {asset.condition}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Contacts */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <Users size={20} style={{ color: '#10b981' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>Key Contacts</h3>
              </div>
            </div>
            <div className="space-y-3">
              {teamContacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-11 h-11 rounded-xl object-cover"
                    style={{ border: '2px solid var(--smg-light-blue)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate" style={{ color: 'var(--smg-dark)' }}>
                      {contact.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{contact.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}