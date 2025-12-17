import React from 'react';
import { Building2, Plus, Settings } from 'lucide-react';

export const SuperAdminDepartmentsPage = () => {
  const departments = [
    { id: 'D-01', name: 'Production', managers: 8, employees: 450 },
    { id: 'D-02', name: 'Quality Control', managers: 4, employees: 125 },
    { id: 'D-03', name: 'Engineering', managers: 6, employees: 200 },
    { id: 'D-04', name: 'Sales & Marketing', managers: 3, employees: 180 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B254B]">Departments</h2>
            <p className="text-xs text-gray-500">Manage department structure and assignments</p>
          </div>
          <button className="bg-[#0B4DA2] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"><Plus size={16}/> Add Department</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(d => (
          <div key={d.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center"><Building2 className="text-[#0B4DA2]"/></div>
              <div>
                <h4 className="font-bold text-[#1B254B]">{d.name}</h4>
                <p className="text-xs text-gray-500">ID: {d.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div><p className="text-gray-400">Managers</p><p className="font-bold text-[#1B254B]">{d.managers}</p></div>
              <div><p className="text-gray-400">Employees</p><p className="font-bold text-[#1B254B]">{d.employees}</p></div>
              <div className="text-right">
                <button className="text-[#0B4DA2] font-bold text-xs"><Settings size={14}/> Configure</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
