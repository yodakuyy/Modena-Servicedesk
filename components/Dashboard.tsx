import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Ticket,
  Package,
  Book,
  Settings,
  Plus,
  Search,
  MoreVertical,
  ChevronDown,
  Star,
  LogOut,
  User,
  ArrowLeftRight,
  FileText,
  CalendarOff,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IncidentList from './IncidentList';
import KnowledgeBase from './KnowledgeBase';
import OutOfOffice from './OutOfOffice';

interface DashboardProps {
  onLogout: () => void;
  onChangeDepartment: () => void;
}

// Data for charts/tables
const ticketData = [
  { id: 'INC4568', date: '04/12/23', time: '08:24AM', subject: 'Error when starting Microsoft Word', user: 'Marso.27', status: 'WIP', lastUpdate: '23min', updateColor: 'bg-green-100 text-green-700' },
  { id: 'RITM4321', date: '04/11/23', time: '10:07AM', subject: 'Assistance moving desktop computer', user: 'Deppert.5', status: 'Assigned', lastUpdate: '1hr', updateColor: 'bg-green-100 text-green-700' },
  { id: 'RITM4268', date: '04/10/23', time: '02:34PM', subject: "I'd like to order a new webcam", user: 'Miller.409', status: 'Pending', lastUpdate: '2 days', updateColor: 'bg-red-100 text-red-700' },
  { id: 'RITM4599', date: '04/10/23', time: '09:15AM', subject: 'Need access to shared drive', user: 'Smith.839', status: 'WIP', lastUpdate: '4min', updateColor: 'bg-green-100 text-green-700' },
  { id: 'INC4567', date: '04/08/23', time: '08:24AM', subject: "Can't sign into app", user: 'Shulz.45', status: 'Pending', lastUpdate: '1 day', updateColor: 'bg-yellow-100 text-yellow-700' },
];

const unassignedData = [
  { id: 'RITM4579', date: '04/12/23', time: '10:40PM', subject: 'Need assistance with powerpoint', user: 'Lynn.2' },
  { id: 'RITM4344', date: '04/12/23', time: '10:17AM', subject: 'Requesting info about new app', user: 'Mackay.43' },
  { id: 'INC4298', date: '04/12/23', time: '08:34PM', subject: 'Keyboard not responding', user: 'Wilson.25', assignedTo: 'Levinson.2' },
  { id: 'RITM4601', date: '04/11/23', time: '07:37AM', subject: 'Financial app access needed', user: 'Fry.36' },
];

const tasksData = [
  { id: 'TASK3596', date: '04/12/23', time: '08:24AM', subject: 'Install software in Computer Lab 23', status: 'In Progress' },
  { id: 'TASK3575', date: '04/11/23', time: '10:07AM', subject: 'Image recent computer order', status: 'Assigned' },
  { id: 'TASK3571', date: '04/10/23', time: '02:34PM', subject: 'Order more webcams', status: 'In Progress' },
  { id: 'TASK3436', date: '04/10/23', time: '01:02PM', subject: 'Perform a stock audit', status: 'Assigned' },
];

const inventoryData = [
  { name: 'Desktops', count: 58, fill: '#3b82f6' },
  { name: 'Laptops', count: 18, fill: '#d9f99d' },
  { name: 'Tablets', count: 35, fill: '#6366f1' },
];

// Reusable Sidebar Item
interface SidebarItemProps {
  icon?: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
  expanded?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false, badge = '', onClick, expanded }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-3 cursor-pointer border-l-4 transition-colors ${active ? 'bg-indigo-50 border-indigo-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
  >
    <div className="flex items-center gap-3">
      {Icon && <Icon size={20} className={active ? 'text-indigo-600' : 'text-gray-400'} />}
      <span className={`font-medium text-sm ${active ? 'text-indigo-900' : ''}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
      )}
      {expanded !== undefined && (
        <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
      )}
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onChangeDepartment }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'incidents' | 'knowledge' | 'outofoffice'>('dashboard');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    if (currentView === 'incidents') {
      return <IncidentList />;
    }
    
    if (currentView === 'knowledge') {
      return <KnowledgeBase />;
    }

    if (currentView === 'outofoffice') {
      return <OutOfOffice />;
    }

    return (
      <div className="p-8">
        <div className="grid grid-cols-12 gap-6">
          
          {/* My Tickets */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100/50">
             <div className="bg-[#e0e7ff]/40 p-6 border-b border-indigo-50 flex justify-between items-end">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">My Tickets</h2>
                </div>
                <div className="flex gap-6 items-center">
                   <div className="text-center">
                      <span className="block text-xl font-bold text-gray-800 leading-none">8</span>
                      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Current</span>
                   </div>
                   <div className="text-center">
                      <span className="block text-xl font-bold text-gray-800 leading-none">5</span>
                      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Closed</span>
                   </div>
                   <button className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm hover:bg-gray-50 ml-2">
                      View All Tickets <ChevronDown size={14} />
                   </button>
                </div>
             </div>
             <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-gray-400 font-medium border-b border-gray-50 bg-gray-50/30">
                    <tr>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">Number</th>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">Date <ChevronDown className="inline w-3 h-3" /></th>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 font-normal text-xs uppercase tracking-wider">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ticketData.map((ticket, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 text-gray-500 font-medium">{ticket.id}</td>
                        <td className="px-6 py-4 text-gray-500">
                           <div className="text-gray-900 font-medium text-xs">{ticket.date}</div>
                           <div className="text-[10px] text-gray-400">{ticket.time}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium max-w-xs truncate">{ticket.subject}</td>
                        <td className="px-6 py-4 text-gray-500">{ticket.user}</td>
                        <td className="px-6 py-4 text-gray-500">{ticket.status}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${ticket.updateColor}`}>
                            {ticket.lastUpdate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          {/* Unassigned Tickets */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-800">Unassigned Tickets</h2>
                  <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md shadow-indigo-200">4</span>
               </div>
               <button className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1 font-medium">
                 View Team Workload <ChevronDown size={14} />
               </button>
            </div>
            <div className="space-y-5 flex-1 overflow-auto">
               {unassignedData.map((ticket, i) => (
                 <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-gray-500 text-xs font-medium">{ticket.id}</span>
                         <span className="text-gray-300 text-[10px]">•</span>
                         <span className="text-gray-500 text-xs">{ticket.date}</span>
                         <span className="text-gray-300 text-[10px]">•</span>
                         <span className="text-gray-400 text-xs">{ticket.time}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{ticket.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-xs text-gray-500">{ticket.user}</span>
                       {ticket.assignedTo ? (
                          <button className="bg-indigo-600 text-white text-[10px] font-semibold px-3 py-1.5 rounded-md flex items-center gap-2 shadow-sm shadow-indigo-200">
                             <img src={`https://ui-avatars.com/api/?name=${ticket.assignedTo}&background=random`} className="w-4 h-4 rounded-full border border-white" />
                             {ticket.assignedTo}
                             <span className="ml-1 opacity-70">›</span>
                          </button>
                       ) : (
                          <button className="bg-white border border-gray-200 text-gray-400 text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-2 hover:border-gray-300 hover:text-gray-600 transition-colors">
                             Select Technician <ChevronDown size={12} />
                          </button>
                       )}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* My Tasks */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
             <h2 className="text-lg font-bold text-gray-800 mb-6">My Tasks</h2>
             <div className="space-y-6">
               <div className="flex text-xs text-gray-400 border-b border-gray-100 pb-2 font-medium uppercase tracking-wider">
                  <div className="w-24">Number ▼ Date</div>
                  <div className="flex-1 pl-2">Subject</div>
                  <div className="w-16 text-right">Status</div>
               </div>
               {tasksData.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                     <div className="mt-1 w-5 h-5 rounded-full border-2 border-indigo-100 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors flex-shrink-0 group-hover:border-indigo-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-indigo-100"></div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex gap-2 text-[10px] text-gray-400 mb-0.5">
                           <span className="font-bold text-gray-500">{task.id}</span>
                           <span>{task.date}</span>
                           <span>{task.time}</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-snug font-medium">{task.subject}</p>
                     </div>
                     <div className="text-[10px] text-gray-500 text-right whitespace-nowrap pt-1">{task.status}</div>
                  </div>
               ))}
             </div>
          </div>

          {/* Today's Appointments */}
          <div className="col-span-12 lg:col-span-4 bg-[#eef2ff] rounded-2xl shadow-sm border border-indigo-50 p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Today's Appointments</h2>
                <button className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                   <Plus size={18} />
                </button>
             </div>
             <div className="relative space-y-2">
                <div className="absolute top-3 bottom-3 left-[17px] w-0.5 bg-indigo-200/50"></div>
                
                {/* Time Blocks */}
                {[
                  { time: 8, label: '8:30 - 9:30 AM - Team Meeting' },
                  { time: 9, label: null },
                  { time: 10, label: '10 - 10:30 AM - INC4567 Call' },
                  { time: 11, label: null },
                  { time: 12, label: '12 - 1PM - Lunch Break' },
                  { time: 1, label: null },
                  { time: 2, label: null },
                  { time: 3, label: null },
                ].map((slot, index) => (
                  <div key={index} className="flex gap-4 relative min-h-[32px]">
                     <div className="w-8 text-xs text-gray-400 pt-2 text-right font-medium">{slot.time}</div>
                     {slot.label ? (
                       <div className="flex-1 bg-white p-3 rounded-xl border border-indigo-100 shadow-sm z-10">
                          <p className="text-xs font-bold text-gray-700">{slot.label}</p>
                       </div>
                     ) : <div className="flex-1 py-3"></div>}
                  </div>
                ))}
             </div>
          </div>

          {/* Inventory Management */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 flex flex-col">
             <h2 className="text-lg font-bold text-gray-800 mb-1">Inventory Management</h2>
             <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">Current Stock:</p>
             
             <div className="flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={inventoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                         dataKey="name" 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
                         dy={10}
                      />
                      <YAxis 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fill: '#9ca3af', fontSize: 11 }}
                      />
                      <Tooltip 
                         cursor={{fill: '#f3f4f6', opacity: 0.4}}
                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>

             <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                <p className="text-xs text-gray-500 mb-3">Last Stock Audit: <span className="font-bold text-gray-700">03/17/23</span></p>
                <button className="bg-[#4c40e6] text-white text-sm font-semibold px-8 py-2.5 rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors w-full">
                   Perform Audit
                </button>
             </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
            <div className="w-4 h-4 bg-white rounded-full opacity-40" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight tracking-tight">Poppins</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">service desk</p>
          </div>
        </div>

        <nav className="flex-1 mt-6 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
          />
          <SidebarItem 
            icon={Ticket} 
            label="Incidents" 
            badge="39" 
            active={currentView === 'incidents'} 
            onClick={() => setCurrentView('incidents')}
          />
          <SidebarItem icon={Package} label="Service Requests" />
          <SidebarItem icon={FileText} label="My Tickets" />
          <SidebarItem 
            icon={Book} 
            label="Knowledge Base" 
            active={currentView === 'knowledge'}
            onClick={() => setCurrentView('knowledge')}
          />
          <SidebarItem 
            icon={CalendarOff} 
            label="Out of Office" 
            badge="4" 
            active={currentView === 'outofoffice'}
            onClick={() => setCurrentView('outofoffice')}
          />
          
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            expanded={isSettingsOpen}
          />
          
          {isSettingsOpen && (
            <div className="bg-gray-50/50 pb-2 transition-all duration-300 ease-in-out">
              {[
                'User Management',
                'Group Management',
                'SLA Management',
                'Business Hours',
                'Categories',
                'Service Request Fields'
              ].map((item) => (
                <div key={item} className="pl-16 pr-6 py-2 text-sm text-gray-500 hover:text-indigo-600 cursor-pointer hover:bg-gray-100 transition-colors font-medium">
                  {item}
                </div>
              ))}
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-3 relative flex-shrink-0" ref={menuRef}>
          <img src="https://ui-avatars.com/api/?name=Yogi+Danis&background=random" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-700 truncate">Yogi Danis</p>
          </div>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          >
            <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                Profile
              </button>
              <button 
                onClick={onChangeDepartment}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeftRight size={16} className="text-gray-400" />
                Change Department
              </button>
              <div className="h-px bg-gray-100 my-1 mx-4"></div>
              <button 
                onClick={onLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} className="text-red-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;