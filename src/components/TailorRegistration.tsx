import { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Clock, CheckCircle, Scissors, Store, Phone, User, Calendar } from 'lucide-react';
import type { View } from '../App';

interface TailorRegistrationProps {
  navigateTo: (view: View) => void;
}

const services = [
  'Shirt Alterations',
  'Pants Hemming',
  'Suit Tailoring',
  'Dress Alterations',
  'Custom Clothing',
  'Bridal Wear',
  'Formal Wear',
  'Repairs & Patches'
];

export function TailorRegistration({ navigateTo }: TailorRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    phone: '',
    address: '',
    businessHours: { start: '09:00', end: '18:00' },
    selectedServices: [] as string[],
    turnaroundTimes: {} as Record<string, number>,
    maxOrdersPerWeek: 20,
    kycDocuments: false
  });

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = () => {
    // Handle registration
    navigateTo('tailor-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('role-selection')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-gray-900">Tailor Registration</h1>
                <p className="text-gray-600 text-sm">Set up your profile to start receiving orders</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                  s === step ? 'bg-purple-600 text-white shadow-lg' :
                  s < step ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${
                    s < step ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Services</span>
            <span>Capacity</span>
            <span>Verification</span>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Basic Information</h2>
                <p className="text-gray-600 text-sm">Tell us about yourself and your business</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Shop Name</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="Smith's Tailoring"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Business Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street, City, State, ZIP"
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Opening Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={formData.businessHours.start}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        businessHours: { ...formData.businessHours, start: e.target.value }
                      })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Closing Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={formData.businessHours.end}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        businessHours: { ...formData.businessHours, end: e.target.value }
                      })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Services */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Scissors className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Services Offered</h2>
                <p className="text-gray-600 text-sm">Select services you provide and set turnaround times</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {services.map((service) => (
                <div
                  key={service}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    formData.selectedServices.includes(service)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleService(service)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        formData.selectedServices.includes(service)
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {formData.selectedServices.includes(service) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-900">{service}</span>
                    </div>
                    {formData.selectedServices.includes(service) && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Days"
                          value={formData.turnaroundTimes[service] || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            turnaroundTimes: {
                              ...formData.turnaroundTimes,
                              [service]: parseInt(e.target.value) || 0
                            }
                          })}
                          onClick={(e) => e.stopPropagation()}
                          className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="text-sm text-gray-600">days</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 mb-1">Turnaround Time Tips</p>
                  <p className="text-xs text-gray-600">
                    Setting realistic turnaround times helps build customer trust. You can always offer express service for urgent orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Capacity */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Manage Capacity</h2>
                <p className="text-gray-600 text-sm">Set how many orders you can handle</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">Maximum Orders Per Week</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={formData.maxOrdersPerWeek}
                    onChange={(e) => setFormData({ ...formData, maxOrdersPerWeek: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <div className="w-20 px-4 py-2 bg-purple-100 rounded-xl text-center">
                    <span className="text-purple-600">{formData.maxOrdersPerWeek}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Adjust based on your availability and resources
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">Capacity Management</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Setting the right capacity ensures you can deliver quality work on time without being overwhelmed.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• You can adjust this anytime from your settings</li>
                      <li>• System will automatically stop accepting orders when you reach capacity</li>
                      <li>• Set unavailable dates for holidays and breaks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verification */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Verification Documents</h2>
                <p className="text-gray-600 text-sm">Upload documents to verify your business</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Business license, ID, or other verification documents
                </p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  Choose Files
                </button>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 mb-1">Verification Process</p>
                    <p className="text-xs text-gray-600">
                      Your documents will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl transition-colors ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Complete Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
