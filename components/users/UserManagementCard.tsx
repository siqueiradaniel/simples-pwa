'use client';

import { User, Phone, Mail, Shield, MoreVertical } from "lucide-react";
import { SupermarketUser } from "@/types";
import Link from "next/link";

export default function UserManagementCard({ user }: { user: SupermarketUser }) {
  // Configuração visual dos cargos
  const roleConfig = {
    ADMIN: { label: 'Admin', bg: 'bg-purple-100', text: 'text-purple-700' },
    MANAGER: { label: 'Gerente', bg: 'bg-blue-100', text: 'text-blue-700' },
    CUSTOMER: { label: 'Cliente', bg: 'bg-gray-100', text: 'text-gray-600' },
  };

  const role = roleConfig[user.user_role] || roleConfig.CUSTOMER;

  return (
    <Link href={`/users/${user.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-all active:scale-[0.99] shadow-sm relative group">
        
        {/* Indicador de Status (Bolinha) */}
        <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-gray-300'} ring-4 ring-white`}></div>

        <div className="flex items-start gap-4">
          {/* Avatar com Iniciais */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200 shrink-0">
            {user.full_name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm truncate">{user.full_name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${role.bg} ${role.text}`}>
                {role.label}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={12} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone size={12} />
                <span>{user.phone_number}</span>
              </div>
            </div>
          </div>
          
          <div className="self-center -mr-2 text-gray-300 group-hover:text-blue-500 transition-colors">
             <MoreVertical size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}