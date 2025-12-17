import React from 'react';
import { Megaphone, Plus } from 'lucide-react';

export const SuperAdminAnnouncementsPage = () => {
  const announcements = [
    { id: 'AN-01', title: 'Holiday Calendar 2026', date: '2025-12-15', audience: 'All Employees' },
    { id: 'AN-02', title: 'New Safety Policy', date: '2025-12-10', audience: 'Production' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B254B]">Manage Announcements</h2>
            <p className="text-xs text-gray-500">Create and publish company-wide announcements</p>
          </div>
          <button className="bg-[#0B4DA2] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"><Plus size={16}/> New Announcement</button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F4F7FE]">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Audience</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-bold text-[#0B4DA2]">{a.id}</td>
                <td className="px-6 py-3 text-sm text-[#1B254B]">{a.title}</td>
                <td className="px-6 py-3 text-sm">{a.audience}</td>
                <td className="px-6 py-3 text-sm">{a.date}</td>
                <td className="px-6 py-3 text-sm"><button className="text-[#0B4DA2] font-bold text-xs hover:underline mr-3">Edit</button><button className="text-[#EE5D50] font-bold text-xs hover:underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
