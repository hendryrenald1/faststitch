import { Search, Ruler, Package, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { View } from '../App';

interface HomeProps {
  navigateTo: (view: View) => void;
  activeOrders: number;
}

export function Home({ navigateTo, activeOrders }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V10C3 15.55 6.84 20.74 12 22C17.16 20.74 21 15.55 21 10V7L12 2Z" fill="white" fillOpacity="0.3"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="1.5" fill="white"/>
              </svg>
            </div>
            <h1 className="text-indigo-600">TailorMatch</h1>
          </div>
          <button 
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <User className="w-4 h-4" />
            My Orders
            {activeOrders > 0 && (
              <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-full text-sm">
                {activeOrders}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Find Your Perfect Tailor</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with skilled tailors nearby. Get fast turnaround times, perfect fit with your measurements, and convenient pickup or delivery.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <button
            onClick={() => navigateTo('browse')}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1761333482894-700fc6aebd47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0NzkxOTY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Browse Tailors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-white mb-1">Browse Tailors</h3>
                <p className="text-white/90 text-sm">
                  Find tailors by turnaround time, rating, and specialty
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('measurements')}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1557185602-2bee13540a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjB0YXBlJTIwZmFicmljfGVufDF8fHx8MTc2NDc5MTk2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="My Measurements"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                  <Ruler className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-white mb-1">My Measurements</h3>
                <p className="text-white/90 text-sm">
                  Save your measurements for perfect fit every time
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('dashboard')}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHBhY2thZ2V8ZW58MXx8fHwxNzY0NzYwODY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Track Orders"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-white mb-1">Track Orders</h3>
                <p className="text-white/90 text-sm">
                  Real-time updates on your tailoring projects
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-6">Why TailorMatch?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-indigo-600 mb-2">⚡ Speed</div>
              <p className="text-gray-600">
                Compare turnaround times and choose the fastest available tailor for your needs
              </p>
            </div>
            <div>
              <div className="text-indigo-600 mb-2">📏 Perfect Fit</div>
              <p className="text-gray-600">
                Store your measurements once and share them securely with any tailor
              </p>
            </div>
            <div>
              <div className="text-indigo-600 mb-2">🚚 Convenience</div>
              <p className="text-gray-600">
                Schedule pickup and delivery, track your order status in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}