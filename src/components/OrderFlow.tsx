import { useState } from 'react';
import { ArrowLeft, Truck, Store, Calendar, AlertCircle } from 'lucide-react';
import type { View, Order, MeasurementsByCategory } from '../App';

interface OrderFlowProps {
  tailorId: string;
  measurements: MeasurementsByCategory;
  addOrder: (order: Order) => void;
  navigateTo: (view: View) => void;
}

const mockServices = {
  '1': [
    { id: 's1', name: 'Hem Pants', price: 15, turnaround: 1 },
    { id: 's2', name: 'Hem Dress', price: 25, turnaround: 2 },
    { id: 's3', name: 'Take In/Let Out', price: 30, turnaround: 2 },
    { id: 's4', name: 'Shorten Sleeves', price: 20, turnaround: 1 },
    { id: 's5', name: 'Zipper Replacement', price: 35, turnaround: 2 },
  ],
  '2': [
    { id: 's1', name: 'Express Hem (Same Day)', price: 25, turnaround: 0 },
    { id: 's2', name: 'Regular Hem', price: 12, turnaround: 1 },
    { id: 's3', name: 'Button Replacement', price: 8, turnaround: 0 },
    { id: 's4', name: 'Simple Repairs', price: 15, turnaround: 1 },
  ],
};

const mockTailors = {
  '1': { name: 'Elena\'s Alterations', turnaround: 2 },
  '2': { name: 'Quick Stitch Tailoring', turnaround: 1 },
};

export function OrderFlow({ tailorId, measurements, addOrder, navigateTo }: OrderFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');

  const tailor = mockTailors[tailorId as keyof typeof mockTailors] || mockTailors['1'];
  const services = mockServices[tailorId as keyof typeof mockServices] || mockServices['1'];
  const selectedServiceData = services.find(s => s.id === selectedService);

  const hasMeasurements = Object.keys(measurements).length > 0;

  const handleSubmit = () => {
    if (!selectedService || !pickupDate || !pickupTime) return;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      tailorId,
      tailorName: tailor.name,
      service: selectedServiceData?.name || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + (selectedServiceData?.turnaround || 2) * 24 * 60 * 60 * 1000).toISOString(),
      pickupDelivery: deliveryMethod,
      totalPrice: selectedServiceData?.price || 0,
    };

    addOrder(newOrder);
    navigateTo('tracking', undefined, newOrder.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => step === 1 ? navigateTo('tailor-profile', tailorId) : setStep(step - 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-gray-900">Book Service</h1>
              <p className="text-gray-600">{tailor.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-1 transition-colors ${
                      step > num ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">
            {step === 1 && 'Select Service'}
            {step === 2 && 'Delivery Options'}
            {step === 3 && 'Review & Confirm'}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {!hasMeasurements && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-yellow-900 mb-1">No measurements saved</div>
                  <p className="text-yellow-700 text-sm mb-3">
                    Adding your measurements helps tailors provide better service and more accurate quotes.
                  </p>
                  <button
                    onClick={() => navigateTo('measurements')}
                    className="text-yellow-900 underline text-sm hover:text-yellow-700"
                  >
                    Add measurements now
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4">Select a Service</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="text-gray-900">{service.name}</div>
                        <div className="text-gray-600 text-sm">
                          {service.turnaround === 0 ? 'Same day' : `${service.turnaround} ${service.turnaround === 1 ? 'day' : 'days'}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-900">${service.price}</div>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <label htmlFor="notes" className="block text-gray-900 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions or details about your garment..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedService}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Delivery Options */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4">How would you like to receive your item?</h2>
              <div className="space-y-3 mb-6">
                <label
                  className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    deliveryMethod === 'pickup'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                    className="w-4 h-4 text-indigo-600 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <Store className="w-5 h-5" />
                      <span>In-Store Drop-off & Pickup</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Drop off your items at the tailor's location and pick them up when ready
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    deliveryMethod === 'delivery'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                    className="w-4 h-4 text-indigo-600 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <Truck className="w-5 h-5" />
                      <span>Pickup & Delivery Service</span>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-sm">
                        +$10
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We'll pick up from your location and deliver when complete
                    </p>
                  </div>
                </label>
              </div>

              <h3 className="text-gray-900 mb-4">Schedule Pickup Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupDate" className="block text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pickupTime" className="block text-gray-700 mb-2">
                    Pickup Time
                  </label>
                  <select
                    id="pickupTime"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!pickupDate || !pickupTime}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && selectedServiceData && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-6">Review Your Order</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Tailor</span>
                  <span className="text-gray-900">{tailor.name}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Service</span>
                  <span className="text-gray-900">{selectedServiceData.name}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Turnaround Time</span>
                  <span className="text-gray-900">
                    {selectedServiceData.turnaround === 0 ? 'Same day' : `${selectedServiceData.turnaround} ${selectedServiceData.turnaround === 1 ? 'day' : 'days'}`}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Delivery Method</span>
                  <span className="text-gray-900">
                    {deliveryMethod === 'pickup' ? 'In-Store Pickup' : 'Pickup & Delivery'}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Pickup Time</span>
                  <span className="text-gray-900">
                    {new Date(pickupDate).toLocaleDateString()} at {pickupTime}
                  </span>
                </div>

                {notes && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-gray-600 mb-1">Notes</div>
                    <p className="text-gray-900">{notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service</span>
                  <span className="text-gray-900">${selectedServiceData.price}</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Pickup & Delivery</span>
                    <span className="text-gray-900">$10</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${selectedServiceData.price + (deliveryMethod === 'delivery' ? 10 : 0)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}