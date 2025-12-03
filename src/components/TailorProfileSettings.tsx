import { useState } from 'react';
import { ArrowLeft, DollarSign, Clock, Zap, Calendar, X, Plus, Save, CheckCircle } from 'lucide-react';
import type { View } from '../App';

interface TailorProfileSettingsProps {
  navigateTo: (view: View) => void;
}

const servicesList = [
  'Shirt Alterations',
  'Pants Hemming',
  'Suit Tailoring',
  'Dress Alterations',
  'Custom Clothing',
  'Bridal Wear',
  'Formal Wear',
  'Repairs & Patches'
];

export function TailorProfileSettings({ navigateTo }: TailorProfileSettingsProps) {
  const [saved, setSaved] = useState(false);
  const [services, setServices] = useState([
    { name: 'Shirt Alterations', price: 35, turnaround: 2, expressAvailable: true },
    { name: 'Pants Hemming', price: 25, turnaround: 1, expressAvailable: true },
    { name: 'Suit Tailoring', price: 280, turnaround: 5, expressAvailable: false },
    { name: 'Dress Alterations', price: 45, turnaround: 3, expressAvailable: true }
  ]);

  const [unavailableDates, setUnavailableDates] = useState([
    '2025-12-25',
    '2026-01-01'
  ]);

  const [newDate, setNewDate] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addUnavailableDate = () => {
    if (newDate && !unavailableDates.includes(newDate)) {
      setUnavailableDates([...unavailableDates, newDate]);
      setNewDate('');
    }
  };

  const removeUnavailableDate = (date: string) => {
    setUnavailableDates(unavailableDates.filter(d => d !== date));
  };

  const updateService = (index: number, field: string, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const availableServices = servicesList.filter(
    s => !services.some(service => service.name === s)
  );

  const addService = (serviceName: string) => {
    setServices([...services, {
      name: serviceName,
      price: 0,
      turnaround: 1,
      expressAvailable: false
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('tailor-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-gray-900 text-lg">Settings</h1>
                <p className="text-gray-600 text-xs">Manage services & availability</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                saved 
                  ? 'bg-green-500 text-white' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span className="text-sm">{saved ? 'Saved!' : 'Save'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Services & Pricing */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Services & Pricing</h2>
                  <p className="text-gray-600 text-sm">Manage your service offerings and prices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-gray-900">{service.name}</h3>
                    <button
                      onClick={() => removeService(index)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', parseFloat(e.target.value))}
                          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Turnaround (days)</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={service.turnaround}
                          onChange={(e) => updateService(index, 'turnaround', parseInt(e.target.value))}
                          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Express Service</label>
                      <button
                        onClick={() => updateService(index, 'expressAvailable', !service.expressAvailable)}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          service.expressAvailable
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                        <span>{service.expressAvailable ? 'Available' : 'Not Available'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Service */}
            {availableServices.length > 0 && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Plus className="w-4 h-4 text-indigo-600" />
                    <span>Add more services:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => (
                      <button
                        key={service}
                        onClick={() => addService(service)}
                        className="px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm border border-gray-200"
                      >
                        + {service}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Unavailable Dates */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Unavailable Dates</h2>
                <p className="text-gray-600 text-sm">Set holidays and days you won't be accepting orders</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-3 mb-4">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={addUnavailableDate}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Add Date
              </button>
            </div>

            {unavailableDates.length > 0 ? (
              <div className="space-y-2">
                {unavailableDates.map((date) => (
                  <div
                    key={date}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span className="text-gray-900">{new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <button
                      onClick={() => removeUnavailableDate(date)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                No unavailable dates set. Add holidays or days off above.
              </div>
            )}
          </div>
        </div>

        {/* Quick Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Express Service</h3>
            </div>
            <p className="text-white/90 text-sm mb-4">
              Offer rush orders for an additional fee. Perfect for urgent alterations.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Currently enabled for 3 services</span>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-lg text-sm">
                Active
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900">Auto-Accept Orders</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Automatically accept orders when under capacity. You can review before starting work.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Status</span>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm border border-green-200">
                Enabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}