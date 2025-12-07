import React, { useState } from 'react';
import { Search, Filter, Trash2 } from 'lucide-react';

const mockRequests = [
  { id: 1, startDate: '22 Nov 2025', endDate: '22 Nov 2025', reason: 'Naik Gunung', status: 'Approved' },
  { id: 2, startDate: '11 Nov 2025', endDate: '11 Nov 2025', reason: 'Sakit', status: 'Approved' },
  { id: 3, startDate: '10 Nov 2025', endDate: '10 Nov 2025', reason: 'Sakit', status: 'Approved' },
];

const OutOfOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myRequests' | 'requestForm'>('requestForm');

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] p-8 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Out Of Office</h2>
        <p className="text-gray-500 text-sm mt-1">Submit an Out-of-Office request so that you won't receive new tickets during your absence.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('myRequests')}
          className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'myRequests' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Requests
        </button>
        <button
          onClick={() => setActiveTab('requestForm')}
          className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'requestForm' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Request Out of Office
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'myRequests' ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
             <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-lg">
                   <input 
                     type="text" 
                     placeholder="Search here.." 
                     className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-600"
                   />
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                   <Filter size={16} /> Filter
                </button>
             </div>
             
             {/* Placeholder for list content */}
             <div className="flex items-center justify-center h-64 text-gray-400 text-sm italic">
                No active requests found.
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <p className="text-red-500 text-xs mb-8 font-medium">* = Mandatory.</p>
               
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500">Start Date:<span className="text-red-500">*</span></label>
                        <input 
                           type="date" 
                           className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                           placeholder="dd/mm/yyyy" 
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500">End Date:<span className="text-red-500">*</span></label>
                        <input 
                           type="date" 
                           className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                           placeholder="dd/mm/yyyy" 
                        />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-xs font-semibold text-gray-500">Reason for Absence:<span className="text-red-500">*</span></label>
                     <textarea 
                        rows={8} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-all"
                     ></textarea>
                  </div>

                  <button 
                     type="button" 
                     className="bg-black text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-md"
                  >
                     Submit Request
                  </button>
               </form>
            </div>

            {/* Recent Requests Sidebar */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
               <h3 className="font-bold text-gray-800 mb-6 text-sm">Recent Out-of-Office Requests</h3>
               <div className="space-y-4">
                  {mockRequests.map((req) => (
                    <div key={req.id} className="border border-gray-200 rounded-xl p-4 relative hover:shadow-sm transition-shadow">
                       <div className="pr-8">
                          <p className="font-bold text-gray-800 text-sm mb-1">{req.startDate} - {req.endDate}</p>
                          <p className="text-gray-500 text-xs mb-3">{req.reason}</p>
                          <div className="text-xs">
                             <span className="font-semibold text-gray-700 block mb-0.5">Status:</span>
                             <span className="text-green-500 font-bold">{req.status}</span>
                          </div>
                       </div>
                       <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutOfOffice;