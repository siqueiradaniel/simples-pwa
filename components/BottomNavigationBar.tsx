'use client';

import { HomeIcon, MapPin, ShoppingCart, Tag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigationBar = () => {
  const pathname = usePathname();

  // Mapeamento simples de rotas para IDs ativos
  const getActiveTab = (path: string) => {
    if (path === '/') return 'Home';
    if (path.includes('/search')) return 'Offer'; // Exemplo: Ativa 'Offer' quando na busca
    if (path.includes('/routes')) return 'Routes';
    if (path.includes('/cart')) return 'Compra';
    if (path.includes('/account')) return 'Account';
    return '';
  };

  const activeTab = getActiveTab(pathname);

  const navItems = [
    { id: 'Home', icon: HomeIcon, label: 'Home', href: '/' },
    { id: 'Routes', icon: MapPin, label: 'Routes', href: '/routes' },
    { id: 'Compra', icon: ShoppingCart, label: 'Compra', badge: 3, href: '/cart' },
    { id: 'Offer', icon: Tag, label: 'Offer', href: '/search' }, // Usando Offer como link para Busca por enquanto
    { id: 'Account', icon: User, label: 'Account', href: '/account' },
  ];

  return (
    <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full gap-1 transition-colors duration-200 ${
              isActive ? 'text-cyan-500' : 'text-gray-300'
            }`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {item.badge && (
                <div className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </div>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigationBar;