import { Package, Clock, Star, TrendingUp, Calendar, Settings, List, CheckCircle, AlertCircle, Truck, User } from 'lucide-react';
import type { View } from '../App';

interface TailorDashboardProps {
  navigateTo: (view: View) => void;
}

// Mock data for today's orders
const todaysOrders = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    service: 'Dress Alteration',
    status: 'pending' as const,
    dueDate: '2025-12-05',
    pickupDelivery: 'pickup' as const,
    price: 45
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    service: 'Suit Tailoring',
    status: 'in-progress' as const,
    dueDate: '2025-12-06',
    pickupDelivery: 'delivery' as const,
    price: 280
  },
  {
    id: '3',
    customerName: 'Emma Wilson',
    service: 'Pants Hemming',
    status: 'ready' as const,
    dueDate: '2025-12-04',
    pickupDelivery: 'pickup' as const,
    price: 25
  }
];

export function TailorDashboard({ navigateTo }: TailorDashboardProps) {
  const pendingOrders = todaysOrders.filter(o => o.status === 'pending');
  const inProgressOrders = todaysOrders.filter(o => o.status === 'in-progress');
  const readyOrders = todaysOrders.filter(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-lg">Dashboard</h1>
                <p className="text-gray-600 text-xs">Smith's Tailoring</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('role-selection')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs">Today</span>
            </div>
            <div className="text-gray-900 mb-1">{pendingOrders.length}</div>
            <div className="text-gray-600 text-sm">Pending Orders</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">Active</span>
            </div>
            <div className="text-gray-900 mb-1">{inProgressOrders.length}</div>
            <div className="text-gray-600 text-sm">In Progress</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs">Ready</span>
            </div>
            <div className="text-gray-900 mb-1">{readyOrders.length}</div>
            <div className="text-gray-600 text-sm">Ready for Pickup</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs">This Week</span>
            </div>
            <div className="text-gray-900 mb-1">4.8</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigateTo('tailor-orders')}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-left hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <List className="w-8 h-8 text-white" />
              </div>
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-lg rounded-xl text-white text-sm">
                {todaysOrders.length} orders
              </div>
            </div>
            <h3 className="text-white mb-2">Manage Orders</h3>
            <p className="text-white/80 text-sm">
              View and update order status, communicate with customers
            </p>
          </button>

          <button
            onClick={() => navigateTo('tailor-settings')}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <div className="px-3 py-1.5 bg-gray-100 rounded-xl text-gray-600 text-sm">
                Profile
              </div>
            </div>
            <h3 className="text-gray-900 mb-2">Profile & Settings</h3>
            <p className="text-gray-600 text-sm">
              Update services, pricing, and availability
            </p>
          </button>
        </div>

        {/* Today's Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Today's Orders</h2>
                  <p className="text-gray-600 text-sm">Manage your current workload</p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('tailor-orders')}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                View All
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {todaysOrders.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">No orders today</h3>
                <p className="text-gray-600 text-sm">New orders will appear here</p>
              </div>
            ) : (
              todaysOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigateTo('tailor-orders')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-gray-900 mb-1">{order.customerName}</h3>
                          <p className="text-gray-600 text-sm">{order.service}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-xl text-xs ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status === 'pending' ? 'Pending' :
                           order.status === 'in-progress' ? 'In Progress' :
                           'Ready'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                        </div>
                        {order.pickupDelivery === 'delivery' && (
                          <div className="flex items-center gap-1.5 text-indigo-600">
                            <Truck className="w-4 h-4" />
                            <span>Delivery</span>
                          </div>
                        )}
                        <div className="ml-auto text-gray-900">
                          ${order.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/80 text-sm">This Week</div>
                <div className="text-white">12 Orders</div>
              </div>
            </div>
            <div className="text-white/90 text-sm">
              You're on track for a great week! 8 completed, 4 in progress.
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-gray-600 text-sm">Attention Needed</div>
                <div className="text-gray-900">1 Order Due Soon</div>
              </div>
            </div>
            <div className="text-gray-600 text-sm">
              Emma Wilson's order is due tomorrow. Mark as ready when complete.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}