import React, { useMemo, useState } from 'react';
import { Shirt, Smartphone, Package, FileText, Eye, Receipt, GraduationCap, FolderOpen, Heart, Lightbulb, BookOpen, Megaphone, Bell, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

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

export const UniformPage = () => {
  const { currentUser, uniformRequests = [], requestUniform } = useApp();
  const [uniformItems, setUniformItems] = useState([
    { item: 'Work Shirt', size: '', quantity: 0 },
  ]);
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Delivered'];

  const sortedRequests = useMemo(() => {
    return [...uniformRequests].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [uniformRequests]);

  const latestRequest = sortedRequests[0];

  const addUniformItem = () => {
    setUniformItems([...uniformItems, { item: 'Work Shirt', size: '', quantity: 0 }]);
  };

  const removeUniformItem = (index: number) => {
    if (uniformItems.length > 1) {
      setUniformItems(uniformItems.filter((_, i) => i !== index));
    }
  };

  const updateUniformItem = (index: number, field: string, value: any) => {
    const updated = [...uniformItems];
    updated[index] = { ...updated[index], [field]: value };
    setUniformItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validItems = uniformItems.filter(item => item.quantity > 0 && item.size);
    if (validItems.length === 0) {
      setError('Please add at least one uniform item with size and quantity.');
      return;
    }

    setError('');
    setSubmitting(true);
    requestUniform({
      uniformItems: validItems,
      dateOfIssue,
      remarks
    });
    setShowSuccess(true);
    setUniformItems([{ item: 'Work Shirt', size: '', quantity: 0 }]);
    setDateOfIssue('');
    setRemarks('');
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  const getStepIndex = (status: string | undefined) => {
    if (!status) return 0;
    const idx = statusSteps.findIndex(step => step.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  return (
    <SimplePage icon={Shirt} title="Uniform Requests" description="Request company uniforms and track your approval status">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#0B4DA2]" size={20} />
            <div>
              <h3 className="text-[#1B254B]">Request Uniform</h3>
              <p className="text-sm text-gray-500">Submit your uniform requirements for HR approval.</p>
            </div>
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
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Department</label>
              <input
                disabled
                value={currentUser?.department || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Date of Joining</label>
              <input
                disabled
                value={currentUser?.joiningDate || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[#1B254B] font-semibold">Uniform Items</h4>
              <button
                type="button"
                onClick={addUniformItem}
                className="text-sm text-[#0B4DA2] hover:underline"
              >
                + Add Item
              </button>
            </div>
            {uniformItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 mb-3">
                <div className="col-span-5">
                  <select
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none text-sm"
                    value={item.item}
                    onChange={(e) => updateUniformItem(idx, 'item', e.target.value)}
                  >
                    <option>Work Shirt</option>
                    <option>Work Pants</option>
                    <option>Safety Vest</option>
                    <option>Safety Shoes</option>
                    <option>Safety Helmet</option>
                    <option>Apron</option>
                    <option>Gloves</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    placeholder="Size"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none text-sm"
                    value={item.size}
                    onChange={(e) => updateUniformItem(idx, 'size', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Qty"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none text-sm"
                    value={item.quantity || ''}
                    onChange={(e) => updateUniformItem(idx, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2 flex items-center">
                  {uniformItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUniformItem(idx)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm text-[#A3AED0] mb-2 block">Expected Date of Issue (optional)</label>
            <input
              type="date"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={dateOfIssue}
              onChange={(e) => setDateOfIssue(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-[#A3AED0] mb-2 block">Remarks (optional)</label>
            <textarea
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              placeholder="Any special requirements or notes..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Submit Uniform Request'}
          </button>

          {showSuccess && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
              <CheckCircle size={18} /> Request submitted to HR HOD. Track progress below.
            </div>
          )}
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="text-[#0B4DA2]" size={20} />
            <div>
              <h3 className="text-[#1B254B]">Latest Request Status</h3>
              <p className="text-sm text-gray-500">Track your uniform approval workflow.</p>
            </div>
          </div>

          {latestRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm text-[#1B254B]">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Request ID</p>
                  <p className="font-semibold">{latestRequest.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Status</p>
                  <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#0B4DA2]">{latestRequest.status}</span>
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
                <p className="text-xs text-[#A3AED0] mb-2">Requested Items:</p>
                <ul className="space-y-1">
                  {latestRequest.uniformItems?.map((item: any, idx: number) => (
                    <li key={idx} className="text-sm text-[#1B254B]">
                      • {item.quantity}x {item.item} - Size: {item.size || item.waistSize || item.shoeSize}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestRequest.requestDate}</p>
                <p><span className="font-semibold text-[#1B254B]">Approver:</span> {latestRequest.approver}</p>
                {latestRequest.approvedBy && <p><span className="font-semibold text-[#1B254B]">Approved by:</span> {latestRequest.approvedBy}</p>}
                {latestRequest.deliveryDate && <p><span className="font-semibold text-[#1B254B]">Delivered on:</span> {latestRequest.deliveryDate}</p>}
                {latestRequest.remarks && <p><span className="font-semibold text-[#1B254B]">Remarks:</span> {latestRequest.remarks}</p>}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No uniform requests yet. Submit one to start tracking.</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] font-semibold mb-4">All My Uniform Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Request ID</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[25%]">Items</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Date Requested</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Status</th>
                <th className="pb-3 pt-2 pr-6 font-semibold w-[15%]">Approver</th>
                <th className="pb-3 pt-2 font-semibold w-[15%]">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map(req => (
                <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6 font-semibold text-[#1B254B]">{req.id}</td>
                  <td className="py-4 pr-6">
                    <div className="text-sm space-y-1">
                      {req.uniformItems?.slice(0, 2).map((item: any, idx: number) => (
                        <div key={idx} className="text-[#1B254B]">{item.quantity}x {item.item}</div>
                      ))}
                      {req.uniformItems?.length > 2 && <div className="text-[#A3AED0] text-xs">+{req.uniformItems.length - 2} more</div>}
                    </div>
                  </td>
                  <td className="py-4 pr-6 text-gray-600">{req.requestDate}</td>
                  <td className="py-4 pr-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      req.status === 'Delivered' ? 'bg-green-50 text-[#05CD99]' :
                      req.status === 'Approved' ? 'bg-blue-50 text-[#0B4DA2]' :
                      req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 pr-6 text-gray-600">{req.approvedBy || req.approver}</td>
                  <td className="py-4 text-gray-600">{req.deliveryDate || '-'}</td>
                </tr>
              ))}
              {sortedRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <p className="text-gray-400">No uniform requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SimplePage>
  );
};

export const SIMAllocationPage = () => {
  const { currentUser, simRequests = [], simCards = [], requestSIM } = useApp();
  const [form, setForm] = useState({
    simType: 'New SIM',
    carrier: 'Airtel',
    plan: 'Corporate Plan - Unlimited',
    deviceType: 'Android',
    expectedBy: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Issued'];

  const sortedRequests = useMemo(() => {
    return [...simRequests].sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
  }, [simRequests]);

  const latestRequest = sortedRequests[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.reason.trim()) {
      setError('Please add a short reason so admin can approve faster.');
      return;
    }

    setError('');
    setSubmitting(true);
    requestSIM(form);
    setShowSuccess(true);
    setForm({ ...form, expectedBy: '', reason: '' });
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  const getStepIndex = (status: string | undefined) => {
    if (!status) return 0;
    const idx = statusSteps.findIndex(step => step.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  return (
    <SimplePage icon={Smartphone} title="SIM Allocation" description="Raise a request and track its approval in one place">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#0B4DA2]" size={20} />
            <div>
              <h3 className="text-[#1B254B]">Request a SIM (only the basics)</h3>
              <p className="text-sm text-gray-500">Fill the key details and the admin desk takes it forward.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Request type</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.simType}
                onChange={(e) => setForm({ ...form, simType: e.target.value })}
              >
                <option>New SIM</option>
                <option>Replacement</option>
                <option>eSIM Activation</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Preferred carrier</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.carrier}
                onChange={(e) => setForm({ ...form, carrier: e.target.value })}
              >
                <option>Airtel</option>
                <option>Jio</option>
                <option>Vi</option>
                <option>BSNL</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Corporate plan</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
              >
                <option>Corporate Plan - Unlimited</option>
                <option>3GB/day + Unlimited Calls</option>
                <option>Data Heavy - 150GB/month</option>
                <option>Voice Heavy - 1000 mins + 30GB</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Device type</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.deviceType}
                onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
              >
                <option>Android</option>
                <option>iOS</option>
                <option>Feature Phone</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Need by (optional)</label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={form.expectedBy}
                onChange={(e) => setForm({ ...form, expectedBy: e.target.value })}
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

          <div>
            <label className="text-sm text-[#A3AED0] mb-2 block">Reason / use case</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              placeholder="e.g. Frequent field travel, client calls, or device without dual-SIM"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Submit SIM Request'}
          </button>

          {showSuccess && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
              <CheckCircle size={18} /> Request submitted to Admin Desk. You can track the status below.
            </div>
          )}
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="text-[#0B4DA2]" size={20} />
            <div>
              <h3 className="text-[#1B254B]">Latest request status</h3>
              <p className="text-sm text-gray-500">Live tracking of your SIM approval stages.</p>
            </div>
          </div>

          {latestRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm text-[#1B254B]">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Request ID</p>
                  <p className="font-semibold">{latestRequest.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Status</p>
                  <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#0B4DA2]">{latestRequest.status}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Carrier / Plan</p>
                  <p className="font-semibold">{latestRequest.carrier} • {latestRequest.plan}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Need by</p>
                  <p className="font-semibold">{latestRequest.expectedBy || 'Not specified'}</p>
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

              <div className="text-sm text-gray-600">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestRequest.submittedDate}</p>
                <p><span className="font-semibold text-[#1B254B]">Handled by:</span> {latestRequest.approver}</p>
                <p><span className="font-semibold text-[#1B254B]">Reason:</span> {latestRequest.reason}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No SIM requests yet. Raise one to start tracking.</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-[#1B254B] font-semibold mb-4">Assigned SIMs</h3>
          <div className="space-y-3">
            {simCards.map(card => (
              <div key={card.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-[#0B4DA2] transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#1B254B] mb-1">{card.number}</p>
                    <p className="text-sm text-gray-600 mb-2">{card.carrier} • {card.plan}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-[#05CD99]">
                        {card.status}
                      </span>
                      <span className="text-xs text-gray-500">Assigned: {card.assignedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {simCards.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Smartphone size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No SIM allocated yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-[#1B254B] font-semibold mb-4">My SIM requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                  <th className="pb-3 pt-2 pr-4 font-semibold">Request</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Plan</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Status</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Submitted</th>
                  <th className="pb-3 pt-2 font-semibold">Need by</th>
                </tr>
              </thead>
              <tbody>
                {sortedRequests.map(req => (
                  <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-[#1B254B] mb-1">{req.simType}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{req.reason}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-[#1B254B]">{req.carrier}</p>
                      <p className="text-xs text-gray-500">{req.plan}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        req.status === 'Approved' ? 'bg-green-50 text-[#05CD99]' : 
                        req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' : 
                        'bg-blue-50 text-[#0B4DA2]'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-gray-600">{req.submittedDate}</td>
                    <td className="py-4 text-gray-600">{req.expectedBy || '-'}</td>
                  </tr>
                ))}
                {sortedRequests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center">
                      <p className="text-gray-400">No SIM requests yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

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
