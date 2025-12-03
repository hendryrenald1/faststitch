import { ArrowLeft, Package, CheckCircle, Clock, Truck, MapPin, Phone, MessageSquare } from 'lucide-react';
import type { View, Order } from '../App';

interface OrderTrackingProps {
  orderId: string;
  orders: Order[];
  navigateTo: (view: View) => void;
}

const statusSteps = [
  { key: 'pending', label: 'Pending', description: 'Waiting for tailor confirmation' },
  { key: 'confirmed', label: 'Confirmed', description: 'Tailor has accepted your order' },
  { key: 'in-progress', label: 'In Progress', description: 'Work is underway' },
  { key: 'ready', label: 'Ready', description: 'Your item is ready' },
  { key: 'delivered', label: 'Completed', description: 'Order completed' },
];

export function OrderTracking({ orderId, orders, navigateTo }: OrderTrackingProps) {
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-gray-900 mb-2">Order not found</h2>
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            View all orders
          </button>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);
  const estimatedDate = new Date(order.estimatedCompletion).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-gray-900">Order Tracking</h1>
              <p className="text-gray-600">Order #{order.id.slice(-8)}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Status Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-indigo-100 mb-1">Current Status</div>
              <h2 className="text-white mb-2">
                {statusSteps[currentStepIndex]?.label}
              </h2>
              <p className="text-indigo-100">
                {statusSteps[currentStepIndex]?.description}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {order.status === 'delivered' ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Clock className="w-6 h-6" />
              )}
            </div>
          </div>

          {order.status !== 'delivered' && (
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-indigo-100 mb-1">Estimated Completion</div>
              <div className="text-white">{estimatedDate}</div>
            </div>
          )}
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-gray-900 mb-6">Order Progress</h3>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 transition-colors ${
                          isCompleted ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div
                      className={`mb-1 ${
                        isCurrent ? 'text-indigo-600' : 'text-gray-900'
                      }`}
                    >
                      {step.label}
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-gray-900 mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tailor</span>
              <span className="text-gray-900">{order.tailorName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Service</span>
              <span className="text-gray-900">{order.service}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order Date</span>
              <span className="text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Delivery Method</span>
              <span className="text-gray-900 flex items-center gap-2">
                {order.pickupDelivery === 'pickup' ? (
                  <>
                    <MapPin className="w-4 h-4" />
                    In-Store Pickup
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4" />
                    Pickup & Delivery
                  </>
                )}
              </span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="w-5 h-5" />
            Call Tailor
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Send Message
          </button>
        </div>

        {/* Help Section */}
        {order.status !== 'delivered' && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-blue-900 mb-2">Need to make changes?</div>
            <p className="text-blue-700 text-sm">
              Contact your tailor directly to discuss any modifications or concerns about your order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
