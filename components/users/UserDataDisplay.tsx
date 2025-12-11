'use client';

import { User, Phone, Calendar, Mail, Lock, Briefcase, ChevronLeft, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/lib/api/user";
import { useRouter } from "next/navigation";

interface UserDataDisplayProps {
  user: UserProfile;
}

export default function UserDataDisplay({ user }: UserDataDisplayProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-blue-900">Perfil do Usuário</h1>
        </div>
        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
          <ShieldCheck size={20} />
        </div>
      </div>

      <div className="p-5 space-y-8">
        
        {/* Info Visual */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
            <User size={40} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{user.full_name}</h2>
          <p className="text-sm text-gray-500">ID: {user.id}</p>
        </div>

        {/* Campos Read-Only */}
        <div className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <User size={12} /> Nome Completo
              </label>
              <div className="relative">
                <Input 
                  value={user.full_name}
                  readOnly
                  className="h-11 bg-white border-gray-200 text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Phone size={12} /> Telefone
              </label>
              <Input 
                value={user.phone_number}
                readOnly
                className="h-11 bg-white border-gray-200 text-gray-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Calendar size={12} /> Data de Nascimento
              </label>
              <div className="relative">
                <Input 
                  value={user.birth_date}
                  readOnly
                  className="h-11 bg-white border-gray-200 text-gray-700"
                />
                <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Mail size={12} /> Email
              </label>
              <div className="relative">
                <Input 
                  value={user.email}
                  readOnly
                  className="h-11 bg-white border-gray-200 text-gray-700"
                />
                <Lock size={14} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Briefcase size={12} /> Tipo de Conta
              </label>
              <div className="relative">
                <Input 
                  value={user.user_role === 'MANAGER' ? 'Gerente' : user.user_role === 'ADMIN' ? 'Administrador' : 'Funcionário'}
                  readOnly
                  className="h-11 bg-white border-gray-200 text-gray-700"
                />
                <Lock size={14} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}