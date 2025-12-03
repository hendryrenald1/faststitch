import { ShoppingBag, Scissors, ArrowRight, Sparkles } from 'lucide-react';
import type { View } from '../App';

interface RoleSelectionProps {
  navigateTo: (view: View) => void;
}

export function RoleSelection({ navigateTo }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 flex flex-col">
      {/* Logo & Header */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7V10C3 15.55 6.84 20.74 12 22C17.16 20.74 21 15.55 21 10V7L12 2Z" fill="white" fillOpacity="0.4"/>
            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        <h1 className="text-white text-3xl mb-3">Welcome to FastStitch</h1>
        <p className="text-white/90 text-lg">Choose how you'd like to continue</p>
      </div>

      {/* Role Selection Cards */}
      <div className="flex-1 px-6 pb-8 flex flex-col gap-4">
        {/* Customer Card */}
        <button
          onClick={() => navigateTo('home')}
          className="flex-1 bg-white rounded-3xl p-8 shadow-2xl active:scale-95 transition-all relative overflow-hidden group"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
          
          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-active:scale-90 transition-transform">
              <ShoppingBag className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="mb-6">
              <h2 className="text-gray-900 text-2xl mb-2">I'm a Customer</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Find skilled tailors nearby and get your clothes altered perfectly
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Browse top-rated tailors</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Save your measurements</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Track orders in real-time</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <span className="text-indigo-600">Continue as Customer</span>
              <ArrowRight className="w-5 h-5 text-indigo-600 group-active:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        {/* Tailor Card */}
        <button
          onClick={() => navigateTo('tailor-registration')}
          className="flex-1 bg-white rounded-3xl p-8 shadow-2xl active:scale-95 transition-all relative overflow-hidden group"
        >
          {/* Popular Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg z-10">
            <Sparkles className="w-3 h-3" />
            <span>For Professionals</span>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
          
          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-active:scale-90 transition-transform">
              <Scissors className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="mb-6">
              <h2 className="text-gray-900 text-2xl mb-2">I'm a Tailor</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Grow your business by connecting with customers in your area
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Get more customers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Manage orders easily</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Build your reputation</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <span className="text-purple-600">Continue as Tailor</span>
              <ArrowRight className="w-5 h-5 text-purple-600 group-active:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="px-6 pb-8 text-center">
        <p className="text-white/80 text-sm">
          Already have an account? <button className="text-white underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}
