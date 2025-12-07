import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';

const data = [
  { name: 'Apr', value: 120000 },
  { name: 'May', value: 132000 },
  { name: 'Jun', value: 101000 },
  { name: 'Jul', value: 162751 },
  { name: 'Aug', value: 145000 },
  { name: 'Sep', value: 160000 },
];

const VisualSection: React.FC = () => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-12">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none">
         {/* Staircase effect */}
         <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5" />
         <div className="absolute bottom-32 right-32 w-32 h-32 bg-white/5" />
         <div className="absolute bottom-64 right-64 w-32 h-32 bg-white/5" />
      </div>

      {/* Content Container - Relative for z-index */}
      <div className="relative w-full max-w-lg aspect-square">
        
        {/* Floating Icon: Twitter */}
        <div className="absolute top-20 left-10 bg-white p-3 rounded-full shadow-lg animate-bounce duration-[3000ms]">
          <Twitter className="w-6 h-6 text-[#1DA1F2]" fill="currentColor" />
        </div>

        {/* Floating Icon: Instagram */}
        <div className="absolute top-10 right-1/3 bg-white p-3 rounded-full shadow-lg animate-bounce duration-[4000ms] delay-75">
           <Instagram className="w-6 h-6 text-[#E1306C]" />
        </div>

        {/* Floating Icon: Messenger */}
        <div className="absolute bottom-40 right-0 bg-white p-3 rounded-full shadow-lg animate-bounce duration-[3500ms] delay-150">
           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 flex items-center justify-center">
             <MessageCircle className="w-4 h-4 text-white" fill="currentColor"/>
           </div>
        </div>

        {/* Card 1: Rewards (Top Right) */}
        <div className="absolute top-10 -right-4 w-60 bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300 z-20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Rewards</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full border-4 border-brand-primary p-0.5">
                <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-primary text-white text-xs px-2 py-0.5 rounded-full">
                Elite
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Points</p>
            <p className="text-2xl font-bold text-gray-900">172,832</p>
          </div>
        </div>

        {/* Card 2: Growth Chart (Bottom Left) */}
        <div className="absolute bottom-20 -left-4 w-72 bg-white rounded-xl shadow-2xl p-5 transform hover:scale-105 transition-transform duration-300 z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">$162,751</p>
              <p className="text-xs text-gray-400">Monthly Revenue</p>
            </div>
            <div className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium">
              +14%
            </div>
          </div>
          
          {/* Recharts Area Chart */}
          <div className="h-32 w-full mt-2 relative">
             {/* Tooltip Card Overlay for visual fidelity to image */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-100 rounded p-2 z-10 hidden">
                 <p className="text-xs font-bold text-brand-primary">$ 23,827</p>
                 <p className="text-[10px] text-gray-400">August</p>
             </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4c40e6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4c40e6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#4c40e6', fontWeight: 600 }}
                    cursor={{ stroke: '#4c40e6', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4c40e6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase tracking-wide">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span className="text-brand-primary font-bold">Jul</span>
            <span>Aug</span>
          </div>
        </div>

        {/* Connecting decorative circle behind chart */}
        <div className="absolute bottom-28 left-20 w-40 h-40 border border-brand-500/30 rounded-full pointer-events-none -z-10" />
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-12 text-center text-white space-y-2 max-w-md px-4">
        <h2 className="text-3xl font-bold tracking-tight">Turn your ideas into reality.</h2>
        <p className="text-brand-100 text-sm font-light">
          Consistent quality and experience across all platforms and devices.
        </p>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-8 h-1.5 bg-white rounded-full opacity-100"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default VisualSection;