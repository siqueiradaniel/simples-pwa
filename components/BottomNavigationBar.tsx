import { HomeIcon, MapPin, ShoppingCart, Tag, User } from "lucide-react";
import { useState } from "react";

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Routes', icon: MapPin, label: 'Routes' },
    { id: 'Compra', icon: ShoppingCart, label: 'Compra', badge: 3 },
    { id: 'Offer', icon: Tag, label: 'Offer' },
    { id: 'Account', icon: User, label: 'Account' },
  ];

  return (
    <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigationBar