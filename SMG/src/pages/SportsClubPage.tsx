import React, { useState, useMemo } from 'react';
import { Trophy, Calendar, Users, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

export const SportsClubPage = () => {
  const { currentUser } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock sports events data
  const sportsEvents = [
    {
      id: 1,
      name: 'Annual Cricket Tournament',
      sport: 'Cricket',
      date: '2024-12-28',
      time: '9:00 AM',
      venue: 'Company Sports Ground',
      maxParticipants: 22,
      registered: 15,
      description: 'Inter-department cricket tournament. Teams will be formed based on registrations.',
      status: 'Open',
      registrationDeadline: '2024-12-25'
    },
    {
      id: 2,
      name: 'Badminton Championship',
      sport: 'Badminton',
      date: '2025-01-05',
      time: '6:00 PM',
      venue: 'Indoor Sports Complex',
      maxParticipants: 32,
      registered: 28,
      description: 'Singles and doubles badminton competition. All skill levels welcome.',
      status: 'Open',
      registrationDeadline: '2025-01-02'
    },
    {
      id: 3,
      name: 'Football League - Season 2',
      sport: 'Football',
      date: '2025-01-10',
      time: '5:00 PM',
      venue: 'Company Sports Ground',
      maxParticipants: 44,
      registered: 44,
      description: 'Monthly football league with multiple teams. Season runs for 3 months.',
      status: 'Full',
      registrationDeadline: '2025-01-08'
    },
    {
      id: 4,
      name: 'Table Tennis Open',
      sport: 'Table Tennis',
      date: '2024-12-22',
      time: '1:00 PM',
      venue: 'Recreation Room',
      maxParticipants: 16,
      registered: 12,
      description: 'Quick knockout tournament during lunch hours.',
      status: 'Open',
      registrationDeadline: '2024-12-21'
    },
    {
      id: 5,
      name: 'Chess Championship',
      sport: 'Chess',
      date: '2024-12-30',
      time: '2:00 PM',
      venue: 'Conference Hall A',
      maxParticipants: 20,
      registered: 8,
      description: 'Standard chess tournament with timed matches.',
      status: 'Open',
      registrationDeadline: '2024-12-28'
    }
  ];

  const handleRegister = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const submitRegistration = () => {
    if (!selectedEvent) return;

    const newRegistration = {
      id: `REG-${Date.now()}`,
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      sport: selectedEvent.sport,
      registrationDate: new Date().toLocaleDateString('en-GB'),
      status: 'Confirmed',
      eventDate: selectedEvent.date
    };

    setRegistrations([newRegistration, ...registrations]);
    setShowSuccess(true);
    setShowRegistrationForm(false);
    setSelectedEvent(null);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const myRegistrations = useMemo(() => {
    return registrations.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
  }, [registrations]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-white mb-2 flex items-center gap-3">
          <Trophy size={32} /> Sports Club
        </h1>
        <p className="text-[#87CEEB] opacity-90">Join sports events and stay active with your colleagues</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-800">
          <CheckCircle size={24} className="text-green-600" />
          <div>
            <h4 className="font-semibold">Registration Successful!</h4>
            <p className="text-sm">You have been registered for the event. Check your email for details.</p>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Trophy className="text-[#0B4DA2] mb-3" size={28} />
          <h4 className="text-[#1B254B] mb-1">Total Events</h4>
          <p className="text-3xl font-bold text-[#0B4DA2]">{sportsEvents.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <CheckCircle className="text-[#05CD99] mb-3" size={28} />
          <h4 className="text-[#1B254B] mb-1">Open Events</h4>
          <p className="text-3xl font-bold text-[#05CD99]">
            {sportsEvents.filter(e => e.status === 'Open').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Users className="text-[#FFB547] mb-3" size={28} />
          <h4 className="text-[#1B254B] mb-1">My Registrations</h4>
          <p className="text-3xl font-bold text-[#FFB547]">{registrations.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Calendar className="text-[#7551FF] mb-3" size={28} />
          <h4 className="text-[#1B254B] mb-1">Upcoming</h4>
          <p className="text-3xl font-bold text-[#7551FF]">
            {sportsEvents.filter(e => new Date(e.date) > new Date()).length}
          </p>
        </div>
      </div>

      {/* Sports Events List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] mb-6 font-semibold text-lg">All Sports Events</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sportsEvents.map(event => (
            <div 
              key={event.id} 
              className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#0B4DA2] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-[#1B254B] font-bold text-lg mb-2">{event.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#1B254B]">
                      <Trophy size={16} className="text-[#0B4DA2]" />
                      <span className="font-medium">{event.sport}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1B254B]">
                      <Calendar size={16} className="text-[#0B4DA2]" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1B254B]">
                      <MapPin size={16} className="text-[#0B4DA2]" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1B254B]">
                      <Users size={16} className="text-[#0B4DA2]" />
                      <span>{event.registered} / {event.maxParticipants} registered</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1B254B]">
                      <Clock size={16} className="text-[#0B4DA2]" />
                      <span>Register by: {event.registrationDeadline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold block mb-3 ${
                    event.status === 'Open' ? 'bg-green-50 text-[#05CD99]' : 'bg-red-50 text-[#EE5D50]'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Registration Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0B4DA2] h-2 rounded-full transition-all"
                    style={{ width: `${(event.registered / event.maxParticipants) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {event.maxParticipants - event.registered} spots remaining
                </p>
              </div>

              <button
                onClick={() => handleRegister(event)}
                disabled={event.status === 'Full'}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  event.status === 'Full'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#0B4DA2] text-white hover:bg-[#042A5B]'
                }`}
              >
                {event.status === 'Full' ? 'Event Full' : 'Register Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Registrations */}
      {myRegistrations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-[#1B254B] mb-6 font-semibold text-lg">My Event Registrations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                  <th className="pb-3 pt-2 pr-6 font-semibold">Registration ID</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Event Name</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Sport</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Event Date</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Registered On</th>
                  <th className="pb-3 pt-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {myRegistrations.map(reg => (
                  <tr key={reg.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-6 font-semibold text-[#1B254B]">{reg.id}</td>
                    <td className="py-4 pr-6 text-[#1B254B]">{reg.eventName}</td>
                    <td className="py-4 pr-6 text-gray-600">{reg.sport}</td>
                    <td className="py-4 pr-6 text-gray-600">{reg.eventDate}</td>
                    <td className="py-4 pr-6 text-gray-600">{reg.registrationDate}</td>
                    <td className="py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-[#05CD99]">
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Registration Confirmation Modal */}
      {showRegistrationForm && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-[#1B254B] font-bold text-xl mb-4">Confirm Registration</h3>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-[#A3AED0] mb-1">Event</p>
                <p className="font-bold text-[#1B254B]">{selectedEvent.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-[#A3AED0] mb-1">Sport</p>
                  <p className="font-bold text-[#1B254B]">{selectedEvent.sport}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-[#A3AED0] mb-1">Date</p>
                  <p className="font-bold text-[#1B254B]">{selectedEvent.date}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-[#A3AED0] mb-1">Venue</p>
                <p className="font-bold text-[#1B254B]">{selectedEvent.venue}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-[#A3AED0] mb-1">Employee Name</p>
                <p className="font-bold text-[#1B254B]">{currentUser?.name || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <div className="flex gap-2">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Please ensure you're available on the event date. Cancellations should be made at least 24 hours in advance.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRegistrationForm(false);
                  setSelectedEvent(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRegistration}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
