import React from 'react';
import { Shirt, Smartphone, Package, FileText, Eye, Receipt, GraduationCap, FolderOpen, Heart, Lightbulb, BookOpen, Megaphone, Bell } from 'lucide-react';

// Simple page template
const SimplePage = ({ icon: Icon, title, description, children }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-white mb-2 flex items-center gap-3"><Icon size={32} /> {title}</h1>
      <p className="text-[#87CEEB] opacity-90">{description}</p>
    </div>
    {children}
  </div>
);

export const UniformPage = () => (
  <SimplePage icon={Shirt} title="Uniform Requests" description="Request and manage your work uniforms">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-4">Available Uniforms</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Work Shirt - Blue', 'Safety Vest', 'Work Pants'].map((item, idx) => (
          <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#0B4DA2] transition-all text-center">
            <Shirt size={48} className="mx-auto mb-3 text-[#0B4DA2]" />
            <h4 className="font-bold text-[#1B254B] mb-2">{item}</h4>
            <button className="w-full bg-[#0B4DA2] text-white py-2 rounded-lg font-bold hover:bg-[#042A5B] transition-colors">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  </SimplePage>
);

export const SIMAllocationPage = () => (
  <SimplePage icon={Smartphone} title="SIM Allocation" description="Request official SIM cards for business use">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-4">SIM Card Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Basic Plan', data: '2GB/day', calls: 'Unlimited', price: 'Free' },
          { name: 'Premium Plan', data: '5GB/day', calls: 'Unlimited', price: 'Free' },
        ].map((plan, idx) => (
          <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#0B4DA2] transition-all">
            <h4 className="font-bold text-[#1B254B] mb-3">{plan.name}</h4>
            <div className="space-y-2 mb-4 text-sm text-[#A3AED0]">
              <p>Data: {plan.data}</p>
              <p>Calls: {plan.calls}</p>
              <p className="font-bold text-[#0B4DA2]">Price: {plan.price}</p>
            </div>
            <button className="w-full bg-[#0B4DA2] text-white py-2 rounded-lg font-bold hover:bg-[#042A5B] transition-colors">
              Request SIM
            </button>
          </div>
        ))}
      </div>
    </div>
  </SimplePage>
);

export const AssetRequestsPage = () => (
  <SimplePage icon={Package} title="Asset Requests" description="Request IT and office assets">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-4">Request New Asset</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-[#A3AED0] mb-2 block">Asset Type</label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none">
            <option>Laptop</option>
            <option>Monitor</option>
            <option>Keyboard</option>
            <option>Mouse</option>
            <option>Headset</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-[#A3AED0] mb-2 block">Priority</label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-[#A3AED0] mb-2 block">Justification</label>
          <textarea rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Explain why you need this asset..."></textarea>
        </div>
      </div>
      <button className="mt-4 bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors">
        Submit Request
      </button>
    </div>
  </SimplePage>
);

export const GeneralRequestsPage = () => (
  <SimplePage icon={FileText} title="General Requests" description="Submit general workplace requests">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-4">Create New Request</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-[#A3AED0] mb-2 block">Request Category</label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none">
            <option>Facilities</option>
            <option>IT Support</option>
            <option>HR Query</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-[#A3AED0] mb-2 block">Subject</label>
          <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Enter subject..." />
        </div>
        <div>
          <label className="text-sm text-[#A3AED0] mb-2 block">Description</label>
          <textarea rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Describe your request in detail..."></textarea>
        </div>
      </div>
      <button className="mt-4 bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors">
        Submit Request
      </button>
    </div>
  </SimplePage>
);

export const MyAttendancePage = () => (
  <SimplePage icon={Eye} title="My Attendance View" description="View your attendance records and patterns">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Present Days', value: '22', color: '#05CD99' },
        { label: 'Absent Days', value: '1', color: '#EE5D50' },
        { label: 'Late Arrivals', value: '3', color: '#FFB547' },
        { label: 'Overtime Hours', value: '12', color: '#0B4DA2' },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <p className="text-sm text-[#A3AED0] mb-2">{stat.label}</p>
          <p className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
        </div>
      ))}
    </div>
  </SimplePage>
);

export const PayrollPage = () => (
  <SimplePage icon={Receipt} title="Payroll & Salary" description="View your salary details and payslips">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-6">Current Month Salary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-[#A3AED0]">Basic Salary</span>
            <span className="font-bold text-[#1B254B]">₹45,000</span>
          </div>
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-[#A3AED0]">HRA</span>
            <span className="font-bold text-[#1B254B]">₹22,500</span>
          </div>
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-[#A3AED0]">Allowances</span>
            <span className="font-bold text-[#1B254B]">₹12,000</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-[#A3AED0]">Deductions</span>
            <span className="font-bold text-[#EE5D50]">-₹4,500</span>
          </div>
          <div className="flex justify-between p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <span className="font-bold text-[#05CD99]">Net Salary</span>
            <span className="font-bold text-[#05CD99] text-xl">₹75,000</span>
          </div>
        </div>
      </div>
    </div>
  </SimplePage>
);

export const TrainingPage = () => (
  <SimplePage icon={GraduationCap} title="Training & Development" description="Explore and enroll in training programs">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        { title: 'React Advanced Patterns', type: 'Required', date: 'Dec 18, 2024', duration: '4 hours', status: 'Enrolled' },
        { title: 'AWS Cloud Fundamentals', type: 'Optional', date: 'Dec 25, 2024', duration: '8 hours', status: 'Available' },
      ].map((course, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-bold text-[#1B254B]">{course.title}</h4>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${course.type === 'Required' ? 'bg-red-50 text-[#EE5D50]' : 'bg-blue-50 text-[#0B4DA2]'}`}>
              {course.type}
            </span>
          </div>
          <div className="space-y-2 text-sm text-[#A3AED0] mb-4">
            <p>Date: {course.date}</p>
            <p>Duration: {course.duration}</p>
          </div>
          <button className={`w-full py-2 rounded-lg font-bold transition-colors ${course.status === 'Enrolled' ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-[#0B4DA2] text-white hover:bg-[#042A5B]'}`}>
            {course.status}
          </button>
        </div>
      ))}
    </div>
  </SimplePage>
);

export const DocumentsPage = () => (
  <SimplePage icon={FolderOpen} title="My Documents" description="Access and manage your documents">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="space-y-3">
        {[
          { name: 'Offer Letter', category: 'Onboarding', date: 'Jan 10, 2020', size: '245 KB' },
          { name: 'ID Proof - Aadhaar', category: 'Identity', date: 'Jan 12, 2020', size: '180 KB' },
          { name: 'PAN Card', category: 'Tax Documents', date: 'Jan 12, 2020', size: '120 KB' },
        ].map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <FolderOpen className="text-[#0B4DA2]" size={24} />
              <div>
                <p className="font-bold text-[#1B254B]">{doc.name}</p>
                <p className="text-sm text-[#A3AED0]">{doc.category} • {doc.size}</p>
              </div>
            </div>
            <p className="text-sm text-[#A3AED0]">{doc.date}</p>
          </div>
        ))}
      </div>
    </div>
  </SimplePage>
);

export const WelfarePage = () => (
  <SimplePage icon={Heart} title="Employee Welfare" description="Health and wellness programs for employees">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Health Insurance', 'Wellness Programs', 'Emergency Support'].map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <Heart size={48} className="mx-auto mb-3 text-[#0B4DA2]" />
          <h4 className="font-bold text-[#1B254B] mb-2">{item}</h4>
          <button className="w-full bg-[#0B4DA2] text-white py-2 rounded-lg font-bold hover:bg-[#042A5B] transition-colors mt-3">
            Learn More
          </button>
        </div>
      ))}
    </div>
  </SimplePage>
);

export const ImaginePage = () => (
  <SimplePage icon={Lightbulb} title="SMG Imagine" description="Innovation and ideas platform">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-[#1B254B] mb-4">Submit Your Idea</h3>
      <div className="space-y-4">
        <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Idea Title" />
        <textarea rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none" placeholder="Describe your innovative idea..."></textarea>
        <button className="bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors">
          Submit Idea
        </button>
      </div>
    </div>
  </SimplePage>
);

export const PoliciesPage = () => (
  <SimplePage icon={BookOpen} title="Company Policies" description="Access company policies and guidelines">
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Code of Conduct', 'Leave Policy', 'IT Security Policy', 'HR Policies'].map((policy, idx) => (
          <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#0B4DA2] transition-all">
            <BookOpen className="text-[#0B4DA2] mb-3" size={32} />
            <h4 className="font-bold text-[#1B254B] mb-2">{policy}</h4>
            <button className="text-[#0B4DA2] font-bold text-sm hover:underline">View Policy →</button>
          </div>
        ))}
      </div>
    </div>
  </SimplePage>
);

export const AnnouncementsPage = () => (
  <SimplePage icon={Megaphone} title="Announcements" description="Latest company announcements and updates">
    <div className="space-y-4">
      {[
        { title: 'Holiday Announcement - Diwali 2024', date: 'Dec 10, 2024', priority: 'High' },
        { title: 'New Cafeteria Menu Launch', date: 'Dec 5, 2024', priority: 'Medium' },
        { title: 'Safety Drill - December', date: 'Dec 1, 2024', priority: 'High' },
      ].map((announcement, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-[#1B254B] mb-2">{announcement.title}</h4>
              <p className="text-sm text-[#A3AED0]">{announcement.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${announcement.priority === 'High' ? 'bg-red-50 text-[#EE5D50]' : 'bg-orange-50 text-[#FFB547]'}`}>
              {announcement.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  </SimplePage>
);

export const NotificationsPage = () => (
  <SimplePage icon={Bell} title="Notifications" description="All your notifications in one place">
    <div className="space-y-3">
      {[
        { title: 'Leave Approved', message: 'Your leave request has been approved', time: '2 hours ago', type: 'success' },
        { title: 'New Training Assigned', message: 'React Advanced Patterns training assigned', time: '5 hours ago', type: 'info' },
        { title: 'Payslip Available', message: 'October 2023 payslip is ready', time: '1 day ago', type: 'info' },
      ].map((notification, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'success' ? 'bg-[#05CD99]' : 'bg-[#0B4DA2]'}`} />
            <div className="flex-1">
              <h4 className="font-bold text-[#1B254B] mb-1">{notification.title}</h4>
              <p className="text-sm text-[#A3AED0]">{notification.message}</p>
              <p className="text-xs text-[#A3AED0] mt-2">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </SimplePage>
);
