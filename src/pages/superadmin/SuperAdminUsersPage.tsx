import React from 'react';
import { UserPlus, ShieldCheck, Search } from 'lucide-react';

export const SuperAdminUsersPage = () => {
  const users = [
    { id: 'U-1001', name: 'Rohit Sharma', role: 'Employee', department: 'Assembly', status: 'Active' },
    { id: 'U-1002', name: 'Priya Singh', role: 'Admin', department: 'HR', status: 'Active' },
    { id: 'U-1003', name: 'Amit Patel', role: 'Employee', department: 'Quality', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B254B]">User Management</h2>
            <p className="text-xs text-gray-500">Create users, assign roles and manage status</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#F4F7FE] rounded-lg px-3 py-2 border">
              <Search size={16} className="text-gray-400"/>
              <input placeholder="Search users" className="bg-transparent outline-none ml-2 text-sm"/>
            </div>
            <button className="bg-[#0B4DA2] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2">
              <UserPlus size={16}/> Create User
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F4F7FE]">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-bold text-[#0B4DA2]">{u.id}</td>
                <td className="px-6 py-3 text-sm text-[#1B254B]">{u.name}</td>
                <td className="px-6 py-3 text-sm">{u.role}</td>
                <td className="px-6 py-3 text-sm">{u.department}</td>
                <td className="px-6 py-3 text-sm"><span className={`px-2 py-1 rounded-lg text-xs ${u.status==='Active'?'bg-green-50 text-green-600':'bg-gray-100 text-gray-600'}`}>{u.status}</span></td>
                <td className="px-6 py-3 text-sm">
                  <button className="text-[#0B4DA2] font-bold text-xs hover:underline mr-3">Edit</button>
                  <button className="text-[#EE5D50] font-bold text-xs hover:underline">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
        <h3 className="font-bold text-[#1B254B] mb-3">Role-Based Access</h3>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <ShieldCheck className="text-[#0B4DA2]"/>
          <p className="text-sm text-gray-600">Employees can access only their data. Admins manage their departments. Super Admins have full system access.</p>
        </div>
      </div>
    </div>
  );
};
