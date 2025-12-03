import { ArrowLeft, Package, Clock, CheckCircle, Truck, Filter, Calendar, MapPin, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { View, Order } from '../App';

interface CustomerDashboardProps {
  orders: Order[];
  navigateTo: (view: View, tailorId?: string, orderId?: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  ready: 'Ready for Pickup',
  delivered: 'Completed',
};

export function CustomerDashboard({ orders, navigateTo }: CustomerDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('home')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-gray-900">My Orders</h1>
                <p className="text-gray-600 text-sm">Track and manage all your tailoring orders</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('browse')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Package className="w-4 h-4" />
              <span>New Order</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-gray-600 text-sm mb-1">Total Orders</div>
            <div className="text-gray-900">{orders.length}</div>
            <div className="text-indigo-600 text-xs mt-2">All time</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                activeOrders.length > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {activeOrders.length > 0 ? 'Active' : 'None'}
              </div>
            </div>
            <div className="text-gray-600 text-sm mb-1">Active Orders</div>
            <div className="text-gray-900">{activeOrders.length}</div>
            <div className="text-yellow-600 text-xs mt-2">In progress</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-gray-600 text-sm mb-1">Completed</div>
            <div className="text-gray-900">{completedOrders.length}</div>
            <div className="text-green-600 text-xs mt-2">Successfully delivered</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-gray-900">Filter Orders</h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filterStatus === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filterStatus === 'in-progress'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('ready')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filterStatus === 'ready'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ready
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                filterStatus === 'delivered'
                  ? 'bg-gray-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {filterStatus === 'all' 
                ? 'Start by browsing tailors and booking your first service'
                : `No orders with status: ${statusLabels[filterStatus as Order['status']]}`
              }
            </p>
            <button
              onClick={() => navigateTo('browse')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Browse Tailors
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const estimatedDate = new Date(order.estimatedCompletion).toLocaleDateString();
              const createdDate = new Date(order.createdAt).toLocaleDateString();

              // Determine image based on service type
              const getServiceImage = () => {
                if (order.service.toLowerCase().includes('suit') || order.service.toLowerCase().includes('jacket')) {
                  return 'https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBzdWl0fGVufDF8fHx8MTc2NDcwNzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080';
                } else if (order.service.toLowerCase().includes('shirt')) {
                  return 'https://images.unsplash.com/photo-1762504007493-88ebabd0d51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0JTIwZmFicmljfGVufDF8fHx8MTc2NDc5Mjg1MXww&ixlib=rb-4.1.0&q=80&w=1080';
                } else if (order.service.toLowerCase().includes('alter')) {
                  return 'https://images.unsplash.com/photo-1566778938552-2af3eb48016d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWx0ZXJhdGlvbnxlbnwxfHx8fDE3NjQ3OTI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080';
                }
                return 'https://images.unsplash.com/photo-1630272777562-17735957d8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBzZXdpbmclMjBtYWNoaW5lfGVufDF8fHx8MTc2NDc5Mjg1MXww&ixlib=rb-4.1.0&q=80&w=1080';
              };

              return (
                <div
                  key={order.id}
                  onClick={() => navigateTo('tracking', undefined, order.id)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Order Image */}
                    <div className="md:w-48 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
                      <ImageWithFallback 
                        src={getServiceImage()}
                        alt={order.service}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <span
                        className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs backdrop-blur-lg border border-white/20 ${
                          order.status === 'pending' ? 'bg-yellow-500/90 text-white' :
                          order.status === 'confirmed' ? 'bg-blue-500/90 text-white' :
                          order.status === 'in-progress' ? 'bg-purple-500/90 text-white' :
                          order.status === 'ready' ? 'bg-green-500/90 text-white' :
                          'bg-gray-500/90 text-white'
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                            {order.tailorName}
                          </h3>
                          <p className="text-gray-600">{order.service}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-600 text-sm mb-1">Total</div>
                          <div className="text-gray-900">${order.totalPrice}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Order ID</div>
                            <div>#{order.id.slice(-8)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Ordered</div>
                            <div>{createdDate}</div>
                          </div>
                        </div>

                        {order.status !== 'delivered' && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Est. Completion</div>
                              <div>{estimatedDate}</div>
                            </div>
                          </div>
                        )}
                        
                        {order.pickupDelivery === 'delivery' && (
                          <div className="flex items-center gap-2 text-indigo-600 text-sm">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Truck className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-xs text-indigo-500">Service</div>
                              <div>Home Delivery</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Progress indicator for active orders */}
                      {order.status !== 'delivered' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Order Progress</span>
                            <span className="text-indigo-600">
                              {order.status === 'pending' ? '25%' :
                               order.status === 'confirmed' ? '50%' :
                               order.status === 'in-progress' ? '75%' :
                               order.status === 'ready' ? '90%' : '100%'}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 rounded-full ${
                                order.status === 'pending' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 w-1/4' :
                                order.status === 'confirmed' ? 'bg-gradient-to-r from-blue-500 to-blue-400 w-2/4' :
                                order.status === 'in-progress' ? 'bg-gradient-to-r from-purple-500 to-purple-400 w-3/4' :
                                order.status === 'ready' ? 'bg-gradient-to-r from-green-500 to-green-400 w-[90%]' :
                                'bg-gradient-to-r from-gray-500 to-gray-400 w-full'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}