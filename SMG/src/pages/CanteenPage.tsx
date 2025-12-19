import React, { useState } from 'react';
import { Ticket, Plus, Minus, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

export const CanteenPage = () => {
  const [coupons, setCoupons] = useState(1);
  const COUPON_PRICE = 200;
  const MAX_COUPONS = 30;

  const incrementCoupons = () => {
    if (coupons < MAX_COUPONS) {
      setCoupons(coupons + 1);
    }
  };

  const decrementCoupons = () => {
    if (coupons > 1) {
      setCoupons(coupons - 1);
    }
  };

  const handleRequestCoupons = () => {
    alert(`Request submitted for ${coupons} coupon(s) - Total: ₹${coupons * COUPON_PRICE}`);
    // Reset after request
    setCoupons(1);
  };

  const subtotal = coupons * COUPON_PRICE;
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Ticket size={32} /> Canteen Coupon Request
            </h1>
            <p className="text-[#87CEEB] opacity-90">Request meal coupons from the canteen department</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coupon Request Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-[#1B254B] mb-6">Request Coupons</h3>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-[#0B4DA2] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#A3AED0] mb-1">Coupon Value</p>
                  <p className="text-3xl font-bold text-[#0B4DA2]">₹{COUPON_PRICE}</p>
                  <p className="text-xs text-[#A3AED0] mt-1">per coupon</p>
                </div>
                <Ticket size={48} className="text-[#0B4DA2] opacity-20" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-bold text-[#1B254B] mb-4">
                Number of Coupons (Max: {MAX_COUPONS})
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementCoupons}
                  disabled={coupons <= 1}
                  className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus size={20} />
                </button>
                <div className="flex-1 bg-white rounded-xl p-4 text-center border-2 border-gray-200">
                  <p className="text-4xl font-bold text-[#1B254B]">{coupons}</p>
                  <p className="text-xs text-[#A3AED0] mt-1">Coupons</p>
                </div>
                <button
                  onClick={incrementCoupons}
                  disabled={coupons >= MAX_COUPONS}
                  className="w-12 h-12 bg-[#0B4DA2] text-white rounded-xl flex items-center justify-center hover:bg-[#042A5B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
              <p className="text-sm font-bold text-green-700 mb-2">💡 Important Information</p>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• Each coupon is valued at ₹200</li>
                <li>• Maximum 30 coupons per request</li>
                <li>• Requests are subject to approval</li>
                <li>• Approved coupons are valid for 30 days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit sticky top-6">
          <h3 className="text-lg font-bold text-[#1B254B] mb-6">Bill Summary</h3>

          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center justify-between text-[#A3AED0]">
                <span>Subtotal</span>
                <span className="font-bold text-[#1B254B]">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[#A3AED0]">
                <span>GST (5%)</span>
                <span className="font-bold text-[#1B254B]">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="font-bold text-[#1B254B] text-lg">Total Amount</span>
                <span className="font-bold text-[#0B4DA2] text-2xl">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleRequestCoupons}
              className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Coupon Request
            </button>

            <p className="text-xs text-center text-[#A3AED0]">
              Your request will be reviewed by the canteen department
            </p>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#1B254B] mb-6 flex items-center gap-2">
          <Clock size={20} /> Recent Coupon Requests
        </h3>
        <div className="space-y-3">
          {[
            { id: 'REQ001', coupons: 10, amount: 2000, date: 'Dec 12, 2024', status: 'Approved' },
            { id: 'REQ002', coupons: 15, amount: 3000, date: 'Dec 08, 2024', status: 'Approved' },
            { id: 'REQ003', coupons: 5, amount: 1000, date: 'Dec 05, 2024', status: 'Disapproved' },
            { id: 'REQ004', coupons: 20, amount: 4000, date: 'Dec 01, 2024', status: 'Approved' },
          ].map(request => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <p className="font-bold text-[#1B254B] text-sm">{request.id}</p>
                <p className="text-sm text-[#A3AED0]">{request.coupons} Coupons Requested</p>
                <p className="text-xs text-[#A3AED0] mt-1">{request.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1B254B] mb-2">₹{request.amount}</p>
                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${request.status === 'Approved'
                    ? 'text-[#05CD99] bg-green-50'
                    : 'text-[#EE5D50] bg-red-50'
                  }`}>
                  {request.status === 'Approved' ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle size={14} /> Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle size={14} /> Disapproved
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
