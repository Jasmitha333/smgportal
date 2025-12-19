import React, { useState, useMemo } from 'react';
import { Bus, MapPin, Clock, CheckCircle, AlertCircle, Home, Phone, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

export const BusFacilityPage = () => {
  const { currentUser, busRequests = [], requestBusFacility } = useApp();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [form, setForm] = useState({
    houseNumber: '',
    street: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    mobileNumber: '',
    alternateNumber: '',
    preferredPickupTime: '',
    remarks: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ['Submitted', 'Under Review', 'Route Assigned', 'Active'];

  const sortedRequests = useMemo(() => {
    return [...busRequests].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [busRequests]);

  const latestRequest = sortedRequests[0];
  const activeRequest = sortedRequests.find(req => req.status === 'Active' || req.status === 'Route Assigned');

  // Mock bus route data
  const busRoutes = [
    { 
      id: 1, 
      name: 'Route A - Noida Sector 62', 
      pickupPoint: 'Sector 62, Near Metro Station',
      timing: '8:00 AM',
      returnTiming: '6:00 PM',
      capacity: '45 seats', 
      available: 12, 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Route B - Greater Noida', 
      pickupPoint: 'Alpha 1, Commercial Belt',
      timing: '7:30 AM',
      returnTiming: '5:30 PM',
      capacity: '45 seats', 
      available: 5, 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Route C - Delhi NCR', 
      pickupPoint: 'Dwarka Sector 21, Bus Stand',
      timing: '9:00 AM',
      returnTiming: '7:00 PM',
      capacity: '45 seats', 
      available: 0, 
      status: 'Full' 
    },
    { 
      id: 4, 
      name: 'Route D - Ghaziabad', 
      pickupPoint: 'Vaishali, Main Market',
      timing: '8:30 AM',
      returnTiming: '6:30 PM',
      capacity: '45 seats', 
      available: 18, 
      status: 'Active' 
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseNumber || !form.street || !form.area || !form.city || !form.pincode || !form.mobileNumber) {
      setError('Please fill all required address fields.');
      return;
    }

    if (form.mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError('');
    setSubmitting(true);
    requestBusFacility(form);
    setShowSuccess(true);
    setShowRequestForm(false);
    setForm({
      houseNumber: '',
      street: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      mobileNumber: '',
      alternateNumber: '',
      preferredPickupTime: '',
      remarks: ''
    });
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  const getStepIndex = (status: string | undefined) => {
    if (!status) return 0;
    const idx = statusSteps.findIndex(step => step.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-white mb-2 flex items-center gap-3"><Bus size={32} /> Bus Facility</h1>
        <p className="text-[#87CEEB] opacity-90">Request and manage your office transportation</p>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3">
          <CheckCircle size={20} />
          <span>Bus facility request submitted successfully! Admin will review and assign a route.</span>
        </div>
      )}

      {/* Bus Routes Information */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] font-semibold mb-4">Available Bus Routes</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {busRoutes.map(route => (
            <div key={route.id} className="border-2 border-gray-100 rounded-xl p-5 hover:border-[#0B4DA2] transition-all">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[#1B254B] font-bold text-lg">{route.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  route.status === 'Active' ? 'bg-green-50 text-[#05CD99]' : 'bg-red-50 text-[#EE5D50]'
                }`}>
                  {route.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#1B254B]">
                  <MapPin size={16} className="text-[#0B4DA2]" />
                  <span>{route.pickupPoint}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1B254B]">
                  <Clock size={16} className="text-[#0B4DA2]" />
                  <span>Morning: {route.timing} | Evening: {route.returnTiming}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bus size={16} className="text-[#0B4DA2]" />
                  <span>{route.capacity} | {route.available > 0 ? `${route.available} seats available` : 'Fully Booked'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Bus Assignment */}
      {activeRequest && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-[#05CD99]" size={24} />
            <h3 className="text-[#1B254B] font-semibold">Your Assigned Bus Route</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Route</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.assignedRoute || 'Pending Assignment'}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Pickup Point</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.pickupPoint || 'TBD'}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Pickup Time</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.pickupTime || 'TBD'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Request Form or Latest Request Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!showRequestForm ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bus className="text-[#0B4DA2]" size={20} />
                <h3 className="text-[#1B254B] font-semibold">Request Bus Facility</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Don't have a bus route yet? Submit your address details and we'll assign you to the nearest route.
            </p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors"
            >
              Request Bus Facility
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Home className="text-[#0B4DA2]" size={20} />
              <h3 className="text-[#1B254B] font-semibold">Bus Facility Request Form</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Employee Name</label>
                <input
                  disabled
                  value={currentUser?.name || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Employee ID</label>
                <input
                  disabled
                  value={currentUser?.empId || currentUser?.id || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#1B254B] font-semibold mb-3">Residential Address</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">House/Flat Number *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.houseNumber}
                    onChange={(e) => setForm({ ...form, houseNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Street/Building Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Landmark</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.landmark}
                    onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Area/Locality *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">City *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">State</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#1B254B] font-semibold mb-3">Contact Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.mobileNumber}
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Alternate Number</label>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.alternateNumber}
                    onChange={(e) => setForm({ ...form, alternateNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Preferred Pickup Time</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.preferredPickupTime}
                onChange={(e) => setForm({ ...form, preferredPickupTime: e.target.value })}
              >
                <option value="">Select Time</option>
                <option>7:00 AM - 7:30 AM</option>
                <option>7:30 AM - 8:00 AM</option>
                <option>8:00 AM - 8:30 AM</option>
                <option>8:30 AM - 9:00 AM</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Additional Remarks</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                placeholder="Any special requirements or instructions..."
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowRequestForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}

        {/* Latest Request Status */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="text-[#0B4DA2]" size={20} />
            <h3 className="text-[#1B254B] font-semibold">Latest Request Status</h3>
          </div>

          {latestRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Request ID</p>
                  <p className="font-semibold text-[#1B254B]">{latestRequest.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Status</p>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0B4DA2]">
                    {latestRequest.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#1B254B] font-semibold">Progress</p>
                <div className="grid grid-cols-4 gap-2 items-start">
                  {statusSteps.map((step, idx) => {
                    const active = idx <= getStepIndex(latestRequest.status);
                    return (
                      <div key={step} className="text-center">
                        <div className={`h-1 rounded-full ${active ? 'bg-[#0B4DA2]' : 'bg-gray-200'}`} />
                        <p className={`mt-2 text-xs font-semibold ${active ? 'text-[#0B4DA2]' : 'text-gray-400'}`}>{step}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border rounded-xl p-3 bg-gray-50">
                <p className="text-xs text-[#A3AED0] mb-2">Pickup Address:</p>
                <p className="text-sm text-[#1B254B]">
                  {latestRequest.houseNumber}, {latestRequest.street}, {latestRequest.area}, {latestRequest.city} - {latestRequest.pincode}
                </p>
                {latestRequest.landmark && (
                  <p className="text-xs text-gray-500 mt-1">Near: {latestRequest.landmark}</p>
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestRequest.requestDate}</p>
                <p><span className="font-semibold text-[#1B254B]">Contact:</span> {latestRequest.mobileNumber}</p>
                {latestRequest.preferredPickupTime && (
                  <p><span className="font-semibold text-[#1B254B]">Preferred Time:</span> {latestRequest.preferredPickupTime}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Bus size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No bus facility requests yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* All Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] font-semibold mb-4">All My Bus Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Request ID</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[30%]">Address</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Date</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Status</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[25%]">Assigned Route</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map(req => (
                <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1B254B]">{req.id}</td>
                  <td className="py-4 pr-6 text-gray-600">
                    {req.area}, {req.city} - {req.pincode}
                  </td>
                  <td className="py-4 pr-6 text-gray-600">{req.requestDate}</td>
                  <td className="py-4 pr-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      req.status === 'Active' ? 'bg-green-50 text-[#05CD99]' :
                      req.status === 'Route Assigned' ? 'bg-blue-50 text-[#0B4DA2]' :
                      req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600">{req.assignedRoute || '-'}</td>
                </tr>
              ))}
              {sortedRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <p className="text-gray-400">No bus requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
