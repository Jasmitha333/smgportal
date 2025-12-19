import React, { useState } from 'react';
import { Home, Calendar, MapPin, Users, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

export const GuestHousePage = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [purpose, setPurpose] = useState('');

  const calculateDays = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const handleSubmitRequest = () => {
    alert('Guest house booking request submitted successfully!');
  };

  const myBookings = [
    {
      id: 'GH001',
      checkIn: 'Dec 20, 2024',
      checkOut: 'Dec 22, 2024',
      days: 2,
      guests: 2,
      purpose: 'Client Meeting',
      status: 'Pending',
      requestDate: 'Dec 14, 2024'
    },
    {
      id: 'GH002',
      checkIn: 'Dec 5, 2024',
      checkOut: 'Dec 6, 2024',
      days: 1,
      guests: 1,
      purpose: 'Training Session',
      status: 'Approved',
      requestDate: 'Dec 1, 2024',
      visited: false
    },
    {
      id: 'GH003',
      checkIn: 'Nov 15, 2024',
      checkOut: 'Nov 16, 2024',
      days: 1,
      guests: 3,
      purpose: 'Official Visit',
      status: 'Approved',
      requestDate: 'Nov 10, 2024',
      visited: true
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-white mb-2 flex items-center gap-3"><Home size={32} /> Guest House Booking</h1>
        <p className="text-[#87CEEB] opacity-90">Request accommodation at company guest house for official visits</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#1B254B] mb-6">Request Guest House Room</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-[#1B254B] mb-2 block">Check-in Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-[#1B254B] mb-2 block">Check-out Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-[#1B254B] mb-2 block">Number of Guests</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-[#1B254B] mb-2 block">Total Days</label>
            <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50">
              <p className="text-[#1B254B] font-bold">{calculateDays()} Days</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-bold text-[#1B254B] mb-2 block">Purpose of Visit</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none resize-none"
              rows={3}
              placeholder="Enter the purpose of your visit..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleSubmitRequest}
          className="mt-6 w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Send size={20} /> Submit Booking Request
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#1B254B] mb-6 flex items-center gap-2"><Clock size={24} /> My Bookings</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests - Big Box */}
          <div>
            <h4 className="text-lg font-bold text-[#1B254B] mb-4">Pending Requests</h4>
            {myBookings.filter(b => b.status === 'Pending').map((booking) => (
              <div key={booking.id} className="border-2 border-yellow-200 bg-yellow-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-[#1B254B]">Booking #{booking.id}</h4>
                      <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-lg flex items-center gap-1">
                        <Clock size={16} /> PENDING
                      </span>
                    </div>
                    <p className="text-sm text-[#A3AED0]">Request Date: {booking.requestDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white rounded-xl p-4 mb-4">
                  <div>
                    <p className="text-xs text-[#A3AED0] mb-1">Check-in</p>
                    <p className="font-bold text-[#1B254B] flex items-center gap-1">
                      <Calendar size={16} /> {booking.checkIn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3AED0] mb-1">Check-out</p>
                    <p className="font-bold text-[#1B254B] flex items-center gap-1">
                      <Calendar size={16} /> {booking.checkOut}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3AED0] mb-1">Duration</p>
                    <p className="font-bold text-[#1B254B]">{booking.days} {booking.days === 1 ? 'Day' : 'Days'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3AED0] mb-1">Guests</p>
                    <p className="font-bold text-[#1B254B] flex items-center gap-1">
                      <Users size={16} /> {booking.guests}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl">
                  <p className="text-xs text-[#A3AED0] mb-1">Purpose of Visit</p>
                  <p className="text-sm font-bold text-[#1B254B]">{booking.purpose}</p>
                </div>
              </div>
            ))}
            {myBookings.filter(b => b.status === 'Pending').length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                <p className="text-[#A3AED0]">No pending requests</p>
              </div>
            )}
          </div>

          {/* Approved & Previous Bookings - List */}
          <div>
            <h4 className="text-lg font-bold text-[#1B254B] mb-4">Booking History</h4>
            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {myBookings.filter(b => b.status !== 'Pending').map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-[#1B254B]">Booking #{booking.id}</h5>
                    {booking.status === 'Approved' && !booking.visited && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1">
                        <CheckCircle size={14} /> APPROVED
                      </span>
                    )}
                    {booking.status === 'Approved' && booking.visited && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1">
                        <CheckCircle size={14} /> COMPLETED
                      </span>
                    )}
                    {booking.status === 'Denied' && (
                      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg flex items-center gap-1">
                        <XCircle size={14} /> DENIED
                      </span>
                    )}
                  </div>

                  {booking.status === 'Approved' && !booking.visited && (
                    <p className="text-lg font-bold text-green-600 mb-2">Confirmed Booking</p>
                  )}
                  {booking.status === 'Approved' && booking.visited && (
                    <p className="text-lg font-bold text-blue-600 mb-2">Completed</p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <p className="text-xs text-[#A3AED0]">Check-in</p>
                      <p className="font-bold text-[#1B254B]">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3AED0]">Check-out</p>
                      <p className="font-bold text-[#1B254B]">{booking.checkOut}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#A3AED0]">{booking.days} {booking.days === 1 ? 'Day' : 'Days'}</span>
                    <span className="text-[#A3AED0]">{booking.guests} Guests</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-[#A3AED0]">Purpose: <span className="text-[#1B254B] font-bold">{booking.purpose}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
