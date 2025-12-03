import { Home, Search, Ruler, Package, User, Scissors, Settings, List } from 'lucide-react';
import type { View } from '../App';

interface BottomNavProps {
  currentView: View;
  navigateTo: (view: View) => void;
  activeOrders?: number;
  role: 'customer' | 'tailor';
}

export function BottomNav({ currentView, navigateTo, activeOrders = 0, role }: BottomNavProps) {
  if (role === 'customer') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'home' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Home className={`w-5 h-5 ${currentView === 'home' ? 'fill-indigo-600' : ''}`} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => navigateTo('browse')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'browse' || currentView === 'tailor-profile' || currentView === 'order'
                ? 'text-indigo-600'
                : 'text-gray-600'
            }`}
          >
            <Search className={`w-5 h-5 ${
              currentView === 'browse' || currentView === 'tailor-profile' || currentView === 'order'
                ? 'fill-indigo-600'
                : ''
            }`} />
            <span className="text-xs">Browse</span>
          </button>

          <button
            onClick={() => navigateTo('measurements')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'measurements' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Ruler className={`w-5 h-5 ${currentView === 'measurements' ? 'fill-indigo-600' : ''}`} />
            <span className="text-xs">Measure</span>
          </button>

          <button
            onClick={() => navigateTo('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
              currentView === 'dashboard' || currentView === 'tracking' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            {activeOrders > 0 && (
              <div className="absolute top-1.5 right-1/4 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {activeOrders}
              </div>
            )}
            <Package className={`w-5 h-5 ${
              currentView === 'dashboard' || currentView === 'tracking' ? 'fill-indigo-600' : ''
            }`} />
            <span className="text-xs">Orders</span>
          </button>
        </div>
      </nav>
    );
  }

  // Tailor navigation
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="grid grid-cols-4 h-16">
        <button
          onClick={() => navigateTo('tailor-dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentView === 'tailor-dashboard' ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          <Home className={`w-5 h-5 ${currentView === 'tailor-dashboard' ? 'fill-purple-600' : ''}`} />
          <span className="text-xs">Dashboard</span>
        </button>

        <button
          onClick={() => navigateTo('tailor-orders')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentView === 'tailor-orders' ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          <List className={`w-5 h-5 ${currentView === 'tailor-orders' ? 'fill-purple-600' : ''}`} />
          <span className="text-xs">Orders</span>
        </button>

        <button
          onClick={() => navigateTo('tailor-settings')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentView === 'tailor-settings' ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          <Settings className={`w-5 h-5 ${currentView === 'tailor-settings' ? 'fill-purple-600' : ''}`} />
          <span className="text-xs">Settings</span>
        </button>

        <button
          onClick={() => navigateTo('role-selection')}
          className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Switch</span>
        </button>
      </div>
    </nav>
  );
}
