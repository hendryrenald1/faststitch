import { useState } from 'react';
import { ArrowLeft, Calendar, User, Ruler, MessageCircle, CheckCircle, Play, Package, Truck, Clock, AlertTriangle } from 'lucide-react';
import type { View } from '../App';

interface TailorOrderManagementProps {
  navigateTo: (view: View) => void;
}

const mockOrders = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 (555) 123-4567',
    service: 'Dress Alteration',
    status: 'pending' as const,
    createdAt: '2025-12-03',
    dueDate: '2025-12-05',
    pickupDelivery: 'pickup' as const,
    price: 45,
    measurements: { waist: 28, hips: 38, length: 42 },
    notes: 'Take in at waist, shorten by 2 inches'
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    customerPhone: '+1 (555) 987-6543',
    service: 'Suit Tailoring',
    status: 'in-progress' as const,
    createdAt: '2025-12-01',
    dueDate: '2025-12-06',
    pickupDelivery: 'delivery' as const,
    price: 280,
    measurements: { chest: 40, waist: 34, sleeve: 34, shoulder: 18 },
    notes: 'Custom three-piece suit, navy blue'
  },
  {
    id: '3',
    customerName: 'Emma Wilson',
    customerPhone: '+1 (555) 456-7890',
    service: 'Pants Hemming',
    status: 'ready' as const,
    createdAt: '2025-12-02',
    dueDate: '2025-12-04',
    pickupDelivery: 'pickup' as const,
    price: 25,
    measurements: { inseam: 30, waist: 32 },
    notes: 'Regular hem, no cuff'
  }
];

export function TailorOrderManagement({ navigateTo }: TailorOrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);
  const [showAdjustDate, setShowAdjustDate] = useState(false);
  const [newDueDate, setNewDueDate] = useState('');
  const [reason, setReason] = useState('');

  const updateStatus = (orderId: string, newStatus: 'pending' | 'in-progress' | 'ready') => {
    // Handle status update
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  const handleAdjustDate = () => {
    // Handle date adjustment
    console.log('Adjusting date to:', newDueDate, 'Reason:', reason);
    setShowAdjustDate(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('tailor-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-gray-900 text-lg">Order Management</h1>
              <p className="text-gray-600 text-xs">Manage customer orders</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-100 mb-4">
              <h3 className="text-gray-900 mb-1">All Orders</h3>
              <p className="text-gray-600 text-sm">{mockOrders.length} active orders</p>
            </div>

            {mockOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  selectedOrder.id === order.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={selectedOrder.id === order.id ? 'text-white' : 'text-gray-900'}>
                      {order.customerName}
                    </h3>
                    <p className={`text-sm ${selectedOrder.id === order.id ? 'text-white/80' : 'text-gray-600'}`}>
                      {order.service}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    selectedOrder.id === order.id
                      ? 'bg-white/20 text-white'
                      : order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                  }`}>
                    {order.status === 'pending' ? 'Pending' :
                     order.status === 'in-progress' ? 'In Progress' :
                     'Ready'}
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  selectedOrder.id === order.id ? 'text-white/70' : 'text-gray-500'
                }`}>
                  <Calendar className="w-3 h-3" />
                  <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-gray-900">Customer Information</h2>
                    <p className="text-gray-600 text-sm">Order #{selectedOrder.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-sm ${
                  selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  selectedOrder.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedOrder.status === 'pending' ? 'Pending' :
                   selectedOrder.status === 'in-progress' ? 'In Progress' :
                   'Ready for Pickup'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Customer Name</div>
                  <div className="text-gray-900">{selectedOrder.customerName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phone</div>
                  <div className="text-gray-900">{selectedOrder.customerPhone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Service</div>
                  <div className="text-gray-900">{selectedOrder.service}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="text-gray-900">${selectedOrder.price}</div>
                </div>
              </div>
            </div>

            {/* Measurements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-gray-900">Measurements</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {Object.entries(selectedOrder.measurements).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-600 mb-1 capitalize">{key}</div>
                    <div className="text-gray-900">{value}"</div>
                  </div>
                ))}
              </div>

              {selectedOrder.notes && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-sm text-gray-600 mb-1">Special Instructions</div>
                  <div className="text-gray-900 text-sm">{selectedOrder.notes}</div>
                </div>
              )}
            </div>

            {/* Timeline & Dates */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-gray-900">Timeline</h3>
                </div>
                <button
                  onClick={() => setShowAdjustDate(!showAdjustDate)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Adjust Due Date
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Order Placed</span>
                  <span className="text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="text-gray-900 font-medium">{new Date(selectedOrder.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fulfillment</span>
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    {selectedOrder.pickupDelivery === 'delivery' ? (
                      <>
                        <Truck className="w-4 h-4" />
                        <span>Delivery</span>
                      </>
                    ) : (
                      <>
                        <Package className="w-4 h-4" />
                        <span>Pickup</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {showAdjustDate && (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">New Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Reason for Change</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Explain why the date needs to be adjusted..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAdjustDate}
                      className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                    >
                      Update Date
                    </button>
                    <button
                      onClick={() => setShowAdjustDate(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-white mb-4">Update Order Status</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => updateStatus(selectedOrder.id, 'in-progress')}
                  disabled={selectedOrder.status !== 'pending'}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    selectedOrder.status === 'pending'
                      ? 'bg-white/20 hover:bg-white/30 backdrop-blur-lg'
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-6 h-6" />
                  <span className="text-sm">Start Work</span>
                </button>

                <button
                  onClick={() => updateStatus(selectedOrder.id, 'in-progress')}
                  disabled={selectedOrder.status === 'ready' || selectedOrder.status === 'pending'}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    selectedOrder.status === 'in-progress'
                      ? 'bg-white/20 hover:bg-white/30 backdrop-blur-lg'
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Clock className="w-6 h-6" />
                  <span className="text-sm">In Progress</span>
                </button>

                <button
                  onClick={() => updateStatus(selectedOrder.id, 'ready')}
                  disabled={selectedOrder.status === 'pending'}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    selectedOrder.status !== 'pending'
                      ? 'bg-white/20 hover:bg-white/30 backdrop-blur-lg'
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-sm">Mark Ready</span>
                </button>
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900">Chat with Customer</h3>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600 text-sm text-center">
                  No messages yet. Start a conversation with {selectedOrder.customerName}
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}