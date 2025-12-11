'use client';

import { User, Pencil } from "lucide-react";

export default function ProfileImageContent({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 bg-white">
      <div className="relative">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
          <User size={40} strokeWidth={1.5} />
        </div>
        <button className="absolute bottom-0 right-0 bg-white border border-blue-100 rounded-full p-1 text-blue-500 shadow-sm hover:bg-blue-50 transition-colors">
          <Pencil size={12} />
        </button>
      </div>
      <h2 className="mt-3 text-lg font-semibold text-gray-800">{name}</h2>
    </div>
  );
}