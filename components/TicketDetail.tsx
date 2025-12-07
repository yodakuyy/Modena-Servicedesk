
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  MoreHorizontal, 
  Paperclip, 
  Send, 
  Smile, 
  User, 
  Clock, 
  Star, 
  ExternalLink,
  Edit2,
  Trash2,
  Info,
  List,
  CheckCircle,
  Plus,
  FileText,
  Image,
  Download,
  Eye,
  ArrowUpCircle
} from 'lucide-react';
import EscalateModal from './EscalateModal';

interface TicketDetailProps {
  ticketId: string | null;
  onBack: () => void;
}

interface ActivityLog {
  id: number;
  type: 'status_change' | 'created' | 'assigned';
  title: string;
  user: string;
  timestamp: string;
}

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: 'image' | 'file';
}

const mockActivities: ActivityLog[] = [
  { id: 1, type: 'status_change', title: 'Status changed from New to Open', user: 'System', timestamp: '28 Feb 2025 - 10:40 PM' },
  { id: 2, type: 'created', title: 'Ticket Created', user: 'John Doe', timestamp: '28 Feb 2025 - 10:39 PM' },
  { id: 3, type: 'assigned', title: 'Assigned to Mike Ross', user: 'System Automated Rule', timestamp: '28 Feb 2025 - 10:45 PM' },
];

const mockAttachments: Attachment[] = [
  { id: 1, name: 'screenshot_error_sap.png', size: '2.4 MB', type: 'image' },
  { id: 2, name: 'system_logs.txt', size: '15 KB', type: 'file' },
];

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onBack }) => {
  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState<'detail' | 'activities' | 'attachments'>('detail');
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setShowActionMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderActivities = () => (
    <div className="flex-1 overflow-y-auto p-6 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-gray-100 rounded-md">
           <List size={18} className="text-gray-600" />
        </div>
        <h3 className="font-bold text-gray-800">Activity Log</h3>
      </div>
      
      <div className="relative pl-4 space-y-8">
        {/* Vertical Line */}
        <div className="absolute top-2 bottom-2 left-[23px] w-0.5 bg-gray-100"></div>

        {mockActivities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4 items-start group">
            {/* Icon Node */}
            <div className={`z-10 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center flex-shrink-0 ${
              activity.type === 'status_change' ? 'bg-green-50 text-green-600' :
              activity.type === 'created' ? 'bg-blue-50 text-blue-600' :
              'bg-purple-50 text-purple-600'
            }`}>
               {activity.type === 'status_change' && <CheckCircle size={16} />}
               {activity.type === 'created' && <Plus size={16} />}
               {activity.type === 'assigned' && <Edit2 size={16} />}
            </div>

            <div className="flex-1 pt-1">
               <p className="font-bold text-gray-800 text-sm">{activity.title}</p>
               <p className="text-xs text-gray-500 mt-0.5">by <span className="font-medium text-gray-700">{activity.user}</span></p>
               <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400 font-medium">
                  <Clock size={10} /> {activity.timestamp}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttachments = () => (
    <div className="flex-1 overflow-y-auto p-6 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <Paperclip size={18} className="text-gray-800 font-bold" strokeWidth={2.5} />
        <h3 className="font-bold text-gray-800">Attachments ({mockAttachments.length})</h3>
      </div>

      <div className="space-y-4">
        {mockAttachments.map((file) => (
          <div key={file.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
             <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  file.type === 'image' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                }`}>
                   {file.type === 'image' ? <Image size={24} /> : <FileText size={24} />}
                </div>
                <div>
                   <p className="font-bold text-gray-800 text-sm mb-0.5">{file.name}</p>
                   <p className="text-xs text-gray-400">{file.size}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="View">
                   <Eye size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Download">
                   <Download size={18} />
                </button>
             </div>
          </div>
        ))}

        {/* Upload Placeholder */}
        <button className="w-full h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/10 transition-all gap-2 group">
           <Plus size={24} className="group-hover:scale-110 transition-transform" />
           <span className="text-sm font-medium">Upload new file</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[#f3f4f6] p-6 gap-6 overflow-hidden relative">
      {/* Escalate Modal */}
      {showEscalateModal && <EscalateModal onClose={() => setShowEscalateModal(false)} />}

      {/* Left Column - Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-gray-50 flex items-center gap-1 bg-white sticky top-0 z-20">
            <button 
                onClick={() => setActiveTab('detail')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'detail' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <Info size={16} /> Detail
            </button>
            <button 
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'activities' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <List size={16} /> Activities
            </button>
            <button 
                onClick={() => setActiveTab('attachments')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'attachments' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <Paperclip size={16} /> Attachments
            </button>
        </div>

        {/* Ticket Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
               <span className="text-xs font-bold text-gray-500">#</span>
             </div>
             <div>
               <div className="flex items-center gap-2">
                 <h2 className="text-base font-bold text-gray-800">{ticketId || 'Case-1'}</h2>
                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">OPEN</span>
               </div>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button 
               onClick={onBack}
               className="px-4 py-2 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
             >
               Cancel Ticket
             </button>
             
             <div className="relative" ref={actionMenuRef}>
               <button 
                 onClick={() => setShowActionMenu(!showActionMenu)}
                 className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
               >
                 Action <ChevronDown size={14} />
               </button>
               {showActionMenu && (
                 <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                   <button className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50">
                     Pending
                   </button>
                   <button className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50">
                     Resolved
                   </button>
                 </div>
               )}
             </div>

             <button 
               onClick={() => setShowEscalateModal(true)}
               className="px-4 py-2 bg-cyan-50 border border-cyan-100 text-cyan-600 text-xs font-bold rounded-lg hover:bg-cyan-100 transition-colors flex items-center gap-1"
             >
               <ArrowUpCircle size={14} /> Escalate
             </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'detail' && (
            <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30 custom-scrollbar">
                {/* System Message */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                        HB
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-800">Hippo Bot</span>
                        </div>
                        <div className="bg-indigo-900 text-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed max-w-2xl">
                            Thank you for contacting us. We have opened case {ticketId || 'Case-1'} to address your request. Sincerely,
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <Clock size={12} /> Read • 28 Feb 2025 - 6:40 PM
                        </div>
                    </div>
                </div>

                {/* User Message */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="User" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-800">John Doe</span>
                        </div>
                        <div className="bg-white border border-gray-200 text-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed max-w-3xl">
                            The user interface, while functional, was somewhat confusing in certain areas, making it challenging to navigate and use effectively. This lack of clarity could potentially hinder users from fully utilizing the platform's features. Additionally, the presence of several spelling and grammar mistakes throughout the system further impacts the overall user experience, as it may reduce the perceived professionalism and reliability...
                            <div className="mt-2 text-indigo-600 font-semibold cursor-pointer text-xs">Read More</div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <Clock size={12} /> Read • 28 Feb 2025 - 12:40 PM
                        </div>
                    </div>
                </div>

                {/* Agent Message */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-800 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                        AG
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-800">Agent</span>
                        </div>
                        <div className="bg-[#1e1b4b] text-gray-100 p-4 rounded-2xl rounded-tl-none shadow-md text-sm leading-relaxed max-w-2xl">
                            Thank you for your feedback. We're working to improve the interface for better clarity and usability while also addressing any language errors. Your insights are invaluable, and we appreciate your help in making the platform better.<br/>
                            Best regards,
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <Clock size={12} /> Read • 28 Feb 2025 - 10:45 PM
                        </div>
                    </div>
                </div>
                
                {/* Agent Message 2 */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-800 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                        AG
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-800">Agent</span>
                        </div>
                        <div className="bg-[#1e1b4b] text-gray-100 p-4 rounded-2xl rounded-tl-none shadow-md text-sm leading-relaxed max-w-2xl">
                            Hello again,<br/><br/>
                            We've made some updates based on your feedback. Could you please check and let us know if everything looks good on your end? Your input helps us refine the experience further.<br/>
                            Best regards,
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <Clock size={12} /> Read • 28 Feb 2025 - 10:45 PM
                        </div>
                    </div>
                </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip size={18} />
                    </button>
                    <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Start Typing..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 max-h-32 resize-none placeholder:text-gray-400"
                        rows={1}
                        style={{ minHeight: '40px' }}
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile size={18} />
                    </button>
                    <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                        <Send size={18} />
                    </button>
                </div>
                </div>
            </>
        )}

        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'attachments' && renderAttachments()}

      </div>

      {/* Right Column - Sidebar Details */}
      <div className="w-80 flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-1">
        
        {/* Contact Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
           <div className="flex justify-between items-center mb-4 cursor-pointer">
              <h3 className="font-bold text-gray-800 text-sm">Contact Details</h3>
              <ChevronDown size={16} className="text-gray-400" />
           </div>
           
           <div className="space-y-4">
              <div>
                 <p className="text-xs font-bold text-gray-500 mb-2">Requester Information</p>
                 <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" className="w-8 h-8 rounded-full" alt="" />
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold text-gray-800 truncate">John Doe</p>
                       <p className="text-xs text-gray-500 truncate">johndoe@gmail.com</p>
                    </div>
                    <div className="flex gap-1">
                       <button className="p-1 text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                       <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={12} /></button>
                    </div>
                 </div>
              </div>

              <div>
                 <p className="text-xs font-bold text-gray-500 mb-2">Shared with</p>
                 <div className="space-y-2">
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=Jane+Walker&background=random" className="w-8 h-8 rounded-full" alt="" />
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-gray-800 truncate">Jane Walker</p>
                           <p className="text-xs text-gray-500 truncate">johndoe@gmail.com</p>
                        </div>
                        <div className="flex gap-1">
                           <button className="p-1 text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                           <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={12} /></button>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                        <img src="https://ui-avatars.com/api/?name=Evelyn+Milton&background=random" className="w-8 h-8 rounded-full" alt="" />
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-gray-800 truncate">Evelyn Milton</p>
                           <p className="text-xs text-gray-500 truncate">johndoe@gmail.com</p>
                        </div>
                        <div className="flex gap-1">
                           <button className="p-1 text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                           <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={12} /></button>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Ticket Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
           <div className="flex justify-between items-center mb-4 cursor-pointer">
              <h3 className="font-bold text-gray-800 text-sm">Ticket Details</h3>
              <ChevronDown size={16} className="text-gray-400" />
           </div>
           
           <div className="space-y-4">
              <div>
                 <p className="text-xs font-bold text-gray-500 mb-1">Ticket Information</p>
                 <div className="flex gap-2 items-start text-sm text-gray-600">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">i</div></div>
                    <div>
                       <span className="font-bold text-gray-700">Ticket ID</span>
                       <div className="text-gray-500">{ticketId || 'Case-1'}</div>
                    </div>
                 </div>
                 <div className="flex gap-2 items-start text-sm text-gray-600 mt-3">
                    <div className="mt-0.5"><Clock size={14} className="text-gray-400" /></div>
                    <div>
                       <span className="font-bold text-gray-700">Created Date</span>
                       <div className="text-gray-500">28 Feb 2025 - 10:40 PM</div>
                    </div>
                 </div>
                 <div className="flex gap-2 items-start text-sm text-gray-600 mt-3">
                    <div className="mt-0.5"><div className="w-4 h-4 flex items-center justify-center"><div className="w-3 h-3 border-2 border-gray-300 rounded-sm"></div></div></div>
                    <div>
                       <span className="font-bold text-gray-700">Rating</span>
                       <div className="flex gap-0.5 mt-0.5">
                          {[1,2,3,4].map(i => <Star key={i} size={12} className="text-yellow-400 fill-current" />)}
                          <Star size={12} className="text-gray-200 fill-current" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 text-xs">
                 <p className="text-gray-400 mb-1">I appreciate the prompt response and acknowledgment of my feedback... It's reassuring</p>
                 <span className="font-bold text-gray-700 cursor-pointer hover:underline">Show more</span>
              </div>
           </div>
        </div>

        {/* Trello Card Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-sm">Trello Card Details</h3>
              <a href="#" className="text-[10px] text-gray-500 flex items-center gap-1 hover:text-indigo-600">Open Trello Card <ExternalLink size={10}/></a>
           </div>

           <div className="space-y-4">
              <div>
                 <p className="text-xs font-medium text-gray-500 mb-1">Labels</p>
                 <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50/50">
                    Green
                 </div>
              </div>
              <div>
                 <p className="text-xs font-medium text-gray-500 mb-1">List</p>
                 <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50/50">
                    Abc
                 </div>
              </div>
              <div>
                 <p className="text-xs font-medium text-gray-500 mb-1">Members</p>
                 <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50/50">
                    Jane Doe
                 </div>
              </div>
              <div>
                 <p className="text-xs font-medium text-gray-500 mb-1">Priority</p>
                 <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50/50">
                    High
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDetail;
