import { Home, MapPin, ShoppingCart, Tag, User } from "lucide-react";
import { useState } from "react";

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Routes', icon: MapPin, label: 'Routes' },
    { id: 'Compra', icon: ShoppingCart, label: 'Compra', badge: 3 },
    { id: 'Offer', icon: Tag, label: 'Offer' },
    { id: 'Account', icon: User, label: 'Account' },
  ];

  return (
    <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50 pb-safe'>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full gap-1 ${
              isActive ? 'text-cyan-500' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Badge de notificação para o Carrinho */}
              {item.badge && (
                <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </div>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigationBar