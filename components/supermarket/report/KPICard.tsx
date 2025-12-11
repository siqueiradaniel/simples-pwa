'use client';

import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: number; // Ex: 12 (para +12%)
  color: 'blue' | 'purple' | 'green' | 'orange';
}

export default function KPICard({ label, value, subValue, icon: Icon, trend, color }: KPICardProps) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
  };

  const theme = colorMap[color];

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-xl ${theme.iconBg} ${theme.text}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {trend > 0 ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{value}</h3>
        {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
      </div>
    </div>
  );
}