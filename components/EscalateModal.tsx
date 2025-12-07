
import React from 'react';
import { X, Bold, Italic, Underline, Link, List, Type } from 'lucide-react';

interface EscalateModalProps {
  onClose: () => void;
}

const EscalateModal: React.FC<EscalateModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg">Escalate to Second-Level Support</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Helper Email (Synchronized from HRIS Sunfish)</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none cursor-pointer">
                <option value="">Select...</option>
                <option value="helper1@company.com">Mike Ross (Senior Dev)</option>
                <option value="helper2@company.com">Rachel Zane (Legal)</option>
                <option value="helper3@company.com">Harvey Specter (Manager)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-700">Message to Helper <span className="text-gray-400 font-normal italic">(max. 2,000 characters)</span></label>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
              {/* Toolbar */}
              <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-1">
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors text-xs font-medium px-2">Normal</button>
                <div className="w-px h-5 bg-gray-300 mx-1 self-center"></div>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Bold"><Bold size={16} /></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Italic"><Italic size={16} /></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Underline"><Underline size={16} /></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Link"><Link size={16} /></button>
                <div className="w-px h-5 bg-gray-300 mx-1 self-center"></div>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Bullet List"><List size={16} /></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors" title="Text Color"><Type size={16} /></button>
              </div>
              <textarea 
                rows={6}
                className="w-full p-4 text-sm text-gray-700 focus:outline-none resize-none"
                placeholder="Type your message here..."
              ></textarea>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 italic">
            * Only email addresses listed in the dropdown can be selected.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="w-full bg-[#4b5563] hover:bg-[#374151] text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscalateModal;
