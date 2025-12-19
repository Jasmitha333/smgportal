import React, { useState, useMemo } from 'react';
import { Car, Bike, Truck, CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

export const ParkingFacilityPage = () => {
  const { currentUser, parkingRequests = [], requestParkingFacility } = useApp();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [form, setForm] = useState({
    vehicleType: 'Two Wheeler',
    vehicleNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    fuelType: '',
    ownerName: '',
    preferredSlot: '',
    remarks: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Slot Allocated'];

  const sortedRequests = useMemo(() => {
    return [...parkingRequests].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [parkingRequests]);

  const latestRequest = sortedRequests[0];
  const activeRequest = sortedRequests.find(req => req.status === 'Slot Allocated' || req.status === 'Approved');

  // Parking slot availability
  const parkingStats = {
    twoWheeler: { total: 150, occupied: 98, available: 52 },
    fourWheeler: { total: 80, occupied: 64, available: 16 },
    visitor: { total: 30, occupied: 18, available: 12 }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.vehicleType || !form.vehicleNumber || !form.vehicleMake || !form.vehicleModel) {
      setError('Please fill all required vehicle details.');
      return;
    }

    const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i;
    if (!vehicleRegex.test(form.vehicleNumber.replace(/[\s-]/g, ''))) {
      setError('Please enter a valid vehicle registration number (e.g., DL01AB1234).');
      return;
    }

    setError('');
    setSubmitting(true);
    requestParkingFacility(form);
    setShowSuccess(true);
    setShowRequestForm(false);
    setForm({
      vehicleType: 'Two Wheeler',
      vehicleNumber: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleColor: '',
      fuelType: '',
      ownerName: '',
      preferredSlot: '',
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

  const getVehicleIcon = (type: string) => {
    switch(type) {
      case 'Four Wheeler': return Car;
      case 'Two Wheeler': return Bike;
      default: return Car;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-white mb-2 flex items-center gap-3"><Car size={32} /> Parking Facility</h1>
        <p className="text-[#87CEEB] opacity-90">Request and manage your parking space allocation</p>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3">
          <CheckCircle size={20} />
          <span>Parking facility request submitted successfully! Admin will review and allocate a slot.</span>
        </div>
      )}

      {/* Parking Availability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Bike className="text-[#0B4DA2] mb-3" size={28} />
          <h4 className="text-[#1B254B] font-semibold mb-2">Two Wheeler</h4>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-[#0B4DA2]">{parkingStats.twoWheeler.available}</p>
            <p className="text-sm text-gray-500 mb-1">/ {parkingStats.twoWheeler.total} slots</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">{parkingStats.twoWheeler.occupied} occupied</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Car className="text-[#0B4DA2] mb-3" size={28} />
          <h4 className="text-[#1B254B] font-semibold mb-2">Four Wheeler</h4>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-[#0B4DA2]">{parkingStats.fourWheeler.available}</p>
            <p className="text-sm text-gray-500 mb-1">/ {parkingStats.fourWheeler.total} slots</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">{parkingStats.fourWheeler.occupied} occupied</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <MapPin className="text-[#0B4DA2] mb-3" size={28} />
          <h4 className="text-[#1B254B] font-semibold mb-2">Visitor Parking</h4>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-[#0B4DA2]">{parkingStats.visitor.available}</p>
            <p className="text-sm text-gray-500 mb-1">/ {parkingStats.visitor.total} slots</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">{parkingStats.visitor.occupied} occupied</p>
        </div>
      </div>

      {/* Active Parking Assignment */}
      {activeRequest && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-[#05CD99]" size={24} />
            <h3 className="text-[#1B254B] font-semibold">Your Allocated Parking Slot</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Slot Number</p>
              <p className="font-bold text-[#1B254B] text-lg">{activeRequest.slotNumber || 'Pending'}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Zone</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.parkingZone || 'TBD'}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Vehicle</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.vehicleNumber}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Allocated On</p>
              <p className="font-bold text-[#1B254B]">{activeRequest.allocatedDate || 'Pending'}</p>
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
                <Car className="text-[#0B4DA2]" size={20} />
                <h3 className="text-[#1B254B] font-semibold">Request Parking Facility</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Need a parking space? Submit your vehicle details and we'll allocate a suitable slot.
            </p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors"
            >
              Request Parking Slot
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Car className="text-[#0B4DA2]" size={20} />
              <h3 className="text-[#1B254B] font-semibold">Parking Request Form</h3>
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
              <h4 className="text-[#1B254B] font-semibold mb-3">Vehicle Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Type *</label>
                  <select
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.vehicleType}
                    onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                  >
                    <option>Two Wheeler</option>
                    <option>Four Wheeler</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="DL01AB1234"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                    value={form.vehicleNumber}
                    onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Honda, Maruti"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.vehicleMake}
                    onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., City, Activa"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.vehicleModel}
                    onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Color</label>
                  <input
                    type="text"
                    placeholder="e.g., White, Black"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.vehicleColor}
                    onChange={(e) => setForm({ ...form, vehicleColor: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Fuel Type</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={form.fuelType}
                    onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Owner Name (if different from employee)</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Preferred Parking Zone</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.preferredSlot}
                onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
              >
                <option value="">Any Available</option>
                <option>Zone A - Main Building</option>
                <option>Zone B - Production Area</option>
                <option>Zone C - Administrative Block</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Additional Remarks</label>
              <textarea
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                placeholder="Any special requirements..."
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
                <p className="text-xs text-[#A3AED0] mb-2">Vehicle Details:</p>
                <p className="text-sm text-[#1B254B] font-semibold">{latestRequest.vehicleNumber}</p>
                <p className="text-sm text-gray-600">
                  {latestRequest.vehicleMake} {latestRequest.vehicleModel} ({latestRequest.vehicleType})
                </p>
                {latestRequest.vehicleColor && (
                  <p className="text-xs text-gray-500 mt-1">Color: {latestRequest.vehicleColor}</p>
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestRequest.requestDate}</p>
                {latestRequest.slotNumber && (
                  <p><span className="font-semibold text-[#1B254B]">Slot Number:</span> {latestRequest.slotNumber}</p>
                )}
                {latestRequest.parkingZone && (
                  <p><span className="font-semibold text-[#1B254B]">Zone:</span> {latestRequest.parkingZone}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Car size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No parking requests yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* All Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] font-semibold mb-4">All My Parking Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Request ID</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[20%]">Vehicle</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Type</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Date</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Status</th>
                <th className="pb-3 pt-2 font-semibold w-[20%]">Slot Assigned</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map(req => {
                const VehicleIcon = getVehicleIcon(req.vehicleType);
                return (
                  <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-6 font-semibold text-[#1B254B]">{req.id}</td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-2">
                        <VehicleIcon size={16} className="text-[#0B4DA2]" />
                        <span className="font-semibold text-[#1B254B]">{req.vehicleNumber}</span>
                      </div>
                      <p className="text-xs text-gray-500">{req.vehicleMake} {req.vehicleModel}</p>
                    </td>
                    <td className="py-4 pr-6 text-gray-600">{req.vehicleType}</td>
                    <td className="py-4 pr-6 text-gray-600">{req.requestDate}</td>
                    <td className="py-4 pr-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        req.status === 'Slot Allocated' ? 'bg-green-50 text-[#05CD99]' :
                        req.status === 'Approved' ? 'bg-blue-50 text-[#0B4DA2]' :
                        req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">
                      {req.slotNumber ? `${req.slotNumber} (${req.parkingZone})` : '-'}
                    </td>
                  </tr>
                );
              })}
              {sortedRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <p className="text-gray-400">No parking requests found.</p>
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
