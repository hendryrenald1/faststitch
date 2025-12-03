import { ArrowLeft, MapPin, Star, Clock, Truck, CheckCircle, Calendar } from 'lucide-react';
import type { View } from '../App';

interface TailorProfileProps {
  tailorId: string;
  navigateTo: (view: View, tailorId?: string) => void;
}

const mockTailorDetails = {
  '1': {
    id: '1',
    name: 'Elena\'s Alterations',
    rating: 4.9,
    reviews: 127,
    turnaroundTime: 2,
    distance: 0.8,
    specialties: ['Alterations', 'Formal Wear', 'Wedding'],
    priceRange: '$$',
    pickupDelivery: true,
    available: true,
    about: 'Professional alterations and custom tailoring with over 15 years of experience. Specializing in wedding dresses, formal wear, and precision alterations.',
    hours: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
    services: [
      { name: 'Hem Pants', price: 15, turnaround: 1 },
      { name: 'Hem Dress', price: 25, turnaround: 2 },
      { name: 'Take In/Let Out', price: 30, turnaround: 2 },
      { name: 'Shorten Sleeves', price: 20, turnaround: 1 },
      { name: 'Zipper Replacement', price: 35, turnaround: 2 },
      { name: 'Wedding Dress Alteration', price: 150, turnaround: 7 },
    ],
    recentReviews: [
      { author: 'Sarah M.', rating: 5, text: 'Amazing work on my wedding dress! Elena is a true professional and very detail-oriented.', date: '2 days ago' },
      { author: 'Michael R.', rating: 5, text: 'Quick turnaround on suit alterations. Perfect fit!', date: '1 week ago' },
      { author: 'Lisa K.', rating: 4, text: 'Great service, very friendly. Slight delay but worth the wait.', date: '2 weeks ago' },
    ]
  },
  '2': {
    id: '2',
    name: 'Quick Stitch Tailoring',
    rating: 4.7,
    reviews: 89,
    turnaroundTime: 1,
    distance: 1.2,
    specialties: ['Express Service', 'Casual Wear', 'Repairs'],
    priceRange: '$',
    pickupDelivery: true,
    available: true,
    about: 'Fast and affordable tailoring services. We specialize in same-day and express alterations for busy professionals.',
    hours: 'Mon-Sat: 8am-7pm, Sun: 10am-3pm',
    services: [
      { name: 'Express Hem (Same Day)', price: 25, turnaround: 0 },
      { name: 'Regular Hem', price: 12, turnaround: 1 },
      { name: 'Button Replacement', price: 8, turnaround: 0 },
      { name: 'Simple Repairs', price: 15, turnaround: 1 },
    ],
    recentReviews: [
      { author: 'Tom H.', rating: 5, text: 'Saved my day with same-day hem service!', date: '3 days ago' },
      { author: 'Jennifer P.', rating: 4, text: 'Good quality, fast service, great prices.', date: '1 week ago' },
    ]
  }
};

export function TailorProfile({ tailorId, navigateTo }: TailorProfileProps) {
  const tailor = mockTailorDetails[tailorId as keyof typeof mockTailorDetails] || mockTailorDetails['1'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('browse')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-gray-900">Tailor Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-indigo-600">{tailor.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-2">{tailor.name}</h2>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span>{tailor.rating}</span>
                      <span className="text-gray-400">({tailor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{tailor.distance} mi away</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tailor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{tailor.about}</p>

              <div className="flex flex-wrap gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>{tailor.turnaroundTime} day turnaround</span>
                </div>
                {tailor.pickupDelivery && (
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-indigo-600" />
                    <span>Pickup & Delivery</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span>{tailor.hours}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Services & Pricing</h3>
              <div className="space-y-3">
                {tailor.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-gray-900">{service.name}</div>
                      <div className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {service.turnaround === 0 ? 'Same day' : `${service.turnaround} ${service.turnaround === 1 ? 'day' : 'days'}`}
                      </div>
                    </div>
                    <div className="text-gray-900">${service.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {tailor.recentReviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-gray-900">{review.author}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span>Available Now</span>
                </div>
                <div className="text-gray-600 mb-2">Typical turnaround</div>
                <div className="text-gray-900">
                  {tailor.turnaroundTime} {tailor.turnaroundTime === 1 ? 'day' : 'days'}
                </div>
              </div>

              <button
                onClick={() => navigateTo('order', tailorId)}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-3"
              >
                Book Service
              </button>

              <button
                onClick={() => navigateTo('measurements')}
                className="w-full px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Update Measurements
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-gray-600 mb-2">Price Range</div>
                <div className="text-gray-900">{tailor.priceRange}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
