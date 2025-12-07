import React from 'react';
import { Zap, Check, ArrowRight } from 'lucide-react';

interface DepartmentSelectionProps {
  onSelectDepartment: (id: string) => void;
}

const departments = [
  {
    id: 'dit',
    title: 'DIT',
    subtitle: 'Digital Infrastructure',
    items: ['Network Security', 'Hardware Support', 'Application Support'],
    dark: true,
  },
  {
    id: 'creative',
    title: 'CREATIVE',
    subtitle: 'Design & Branding',
    items: ['Brand Identity', 'UI/UX Design', 'Motion Graphics'],
    dark: false,
  },
  {
    id: 'hco',
    title: 'HCO',
    subtitle: 'Human Capital',
    items: ['Talent Acquisition', 'Employee Relations', 'Payroll Systems'],
    dark: false,
  },
  {
    id: 'legal',
    title: 'LEGAL',
    subtitle: 'Compliance & Law',
    items: ['Contract Review', 'Risk Assessment', 'Regulatory Filing'],
    dark: false,
  },
  {
    id: 'crm',
    title: 'CRM',
    subtitle: 'Customer Relations',
    items: ['Socmed Buzz', 'Campaign Blast', 'Event Visit'],
    dark: false,
  },
];

const DepartmentSelection: React.FC<DepartmentSelectionProps> = ({ onSelectDepartment }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/30 mb-6">
             <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Select a Department</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose a department to submit your ticket.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className={`relative rounded-2xl p-8 transition-transform hover:-translate-y-1 duration-300 ${
                dept.dark
                  ? 'bg-[#1e1b4b] text-white shadow-xl shadow-indigo-900/20'
                  : 'bg-white text-gray-900 shadow-sm border border-gray-100 hover:shadow-lg'
              }`}
            >
              {/* Top Icon */}
              <div className="absolute top-8 right-8">
                <Zap
                  className={`w-5 h-5 ${
                    dept.dark ? 'text-gray-400' : 'text-gray-300'
                  }`}
                />
              </div>

              {/* Title Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  {dept.title}
                </h3>
                <p
                  className={`text-sm ${
                    dept.dark ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {dept.subtitle}
                </p>
                {dept.dark && (
                  <div className="w-full h-px bg-white/10 mt-6" />
                )}
                {!dept.dark && (
                  <div className="w-full h-px bg-gray-100 mt-6" />
                )}
              </div>

              {/* List Items */}
              <ul className="space-y-4 mb-8">
                {dept.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        dept.dark
                          ? 'bg-brand-primary/20 text-brand-400'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        dept.dark ? 'text-gray-100' : 'text-gray-600'
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => onSelectDepartment(dept.id)}
                className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-colors ${
                  dept.dark
                    ? 'bg-[#3b82f6] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-brand-primary'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelection;