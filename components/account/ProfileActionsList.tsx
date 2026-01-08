'use client';

import { Bell, User, MapPin, CreditCard, Store, LogOut, ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ProfileActionsListProps {
  userId?: string;
}

interface ActionItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number; // Optional property
}

export default function ProfileActionsList({ userId }: ProfileActionsListProps) {
  const actions: ActionItem[] = [
    //{ icon: Bell, label: "Notificações", badge: 2, href: "/notifications" },
    // Se quiser usar o ID na rota de perfil: href: `/users/${userId}` ou manter /profile para "meu perfil"
    { icon: User, label: "Meus dados", href: "/profile" }, 
    { icon: MapPin, label: "Endereços", href: "/addresses" },
    //{ icon: CreditCard, label: "Formas de Pagamento", href: "/payments" },
    { icon: Store, label: "Mercado", href: "/supermarket-chain" },
  ];

  return (
    <div className="bg-white border-t border-b border-gray-100">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link 
            key={index} 
            href={action.href}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-50 last:border-none active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-gray-700" strokeWidth={1.5} />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {action.badge && (
                <span className="w-5 h-5 bg-blue-400 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {action.badge}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </Link>
        );
      })}
      
      { /* LOGOUT */}
      {/* <button className="w-full flex items-center justify-between px-4 py-4 active:bg-red-50 transition-colors group">
        <div className="flex items-center gap-3">
          <LogOut size={20} className="text-red-500" strokeWidth={1.5} />
          <span className="text-sm font-medium text-red-500">Sair</span>
        </div>
        <ChevronRight size={16} className="text-gray-400 group-active:text-red-300" />
      </button> */}
    </div>
  );
}