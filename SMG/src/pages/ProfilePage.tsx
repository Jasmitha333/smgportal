import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = ({ userData }) => {
  const { updateUser, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateUser({
        phone: formData.phone,
        address: formData.address
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSaveSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={user?.avatar || userData.avatar} alt={user?.name || userData.name} className="w-24 h-24 rounded-2xl border-4 border-white/20" />
            <div>
              <h1 className="text-white mb-2">{user?.name || userData.name}</h1>
              <p className="text-[#87CEEB] opacity-90">{userData.role} • {userData.dept}</p>
              <p className="text-sm text-white/70 mt-1">Employee ID: {userData.empId}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setFormData({ ...userData, ...user });
              setIsModalOpen(true);
            }}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Edit size={20} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Edit size={24} />
                  <h2 className="text-2xl font-bold">Edit Profile</h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {saveSuccess && (
                <div className="bg-[#05CD99]/10 border border-[#05CD99] text-[#05CD99] p-4 rounded-xl font-medium flex items-center gap-2">
                  <span className="text-xl">✅</span> Profile updated successfully!
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#A3AED0] mb-2 block">Full Name (Read-only)</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#A3AED0] mb-2 block">Email Address (Read-only)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#A3AED0] mb-2 block">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#A3AED0] mb-2 block">Address</label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-2 focus:ring-[#0B4DA2]/20 outline-none transition-all resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSaving}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} /> {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Full Name</label>
                <p className="font-bold text-[#1B254B]">{user?.name || userData.name}</p>
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Email Address</label>
                <p className="font-bold text-[#1B254B]">{user?.email || userData.email}</p>
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Phone Number</label>
                <p className="font-bold text-[#1B254B]">{user?.phone || userData.phone}</p>
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Date of Birth</label>
                <p className="font-bold text-[#1B254B]">{userData.dateOfBirth}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-[#A3AED0] mb-2 block">Address</label>
                <p className="font-bold text-[#1B254B]">{user?.address || userData.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Briefcase className="text-[#0B4DA2] mt-1" size={20} />
                <div>
                  <p className="text-sm text-[#A3AED0]">Department</p>
                  <p className="font-bold text-[#1B254B]">{userData.dept}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-[#0B4DA2] mt-1" size={20} />
                <div>
                  <p className="text-sm text-[#A3AED0]">Date of Joining</p>
                  <p className="font-bold text-[#1B254B]">{userData.dateOfJoining}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="text-[#0B4DA2] mt-1" size={20} />
                <div>
                  <p className="text-sm text-[#A3AED0]">Reporting To</p>
                  <p className="font-bold text-[#1B254B]">{userData.reportingTo}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-[#0B4DA2] mt-1" size={20} />
                <div>
                  <p className="text-sm text-[#A3AED0]">Shift Timing</p>
                  <p className="font-bold text-[#1B254B]">{userData.shift}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Education</h3>
            <div className="space-y-4">
              {userData.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-bold text-[#1B254B]">{edu.degree}</p>
                  <p className="text-sm text-[#A3AED0]">{edu.institution} • {edu.year}</p>
                  <p className="text-sm text-[#0B4DA2] mt-1">Grade: {edu.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-[#0B4DA2] mb-1">Leave Balance</p>
                <p className="text-2xl font-bold text-[#0B4DA2]">12 Days</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-[#05CD99] mb-1">Attendance</p>
                <p className="text-2xl font-bold text-[#05CD99]">95%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-[#FFB547] mb-1">Training Hours</p>
                <p className="text-2xl font-bold text-[#FFB547]">24 Hrs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-2 bg-blue-50 text-[#0B4DA2] text-sm font-bold rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-[#1B254B] mb-6">Certifications</h3>
            <div className="space-y-3">
              {userData.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-[#1B254B] text-sm">{cert.name}</p>
                  <p className="text-xs text-[#A3AED0] mt-1">{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
