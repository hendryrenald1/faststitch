import { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Truck, Search, X, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { View, Tailor } from '../App';

interface TailorBrowseProps {
  navigateTo: (view: View, tailorId?: string) => void;
}

const tailorImages = [
  'https://images.unsplash.com/photo-1630272777562-17735957d8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBzZXdpbmd8ZW58MXx8fHwxNzY0NzkyMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1645055752527-873bf0d6c593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0NzY4OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1739117441029-9f2a8e59e8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXdpbmclMjBtYWNoaW5lJTIwZmFicmljfGVufDF8fHx8MTc2NDc1MzkyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBzdWl0fGVufDF8fHx8MTc2NDcwNzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1727861540774-dacd9e569ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMGFsdGVyYXRpb258ZW58MXx8fHwxNzY0NzkyMTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1695898341950-6b78780c1458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY0NzkyMTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
];

const mockTailors: Tailor[] = [
  {
    id: '1',
    name: 'Elena\'s Alterations',
    image: tailorImages[0],
    rating: 4.9,
    reviews: 127,
    turnaroundTime: 2,
    distance: 0.8,
    specialties: ['Alterations', 'Formal Wear', 'Wedding'],
    priceRange: '$$',
    pickupDelivery: true,
    available: true,
  },
  {
    id: '2',
    name: 'Quick Stitch Tailoring',
    image: tailorImages[1],
    rating: 4.7,
    reviews: 89,
    turnaroundTime: 1,
    distance: 1.2,
    specialties: ['Express Service', 'Casual Wear', 'Repairs'],
    priceRange: '$',
    pickupDelivery: true,
    available: true,
  },
  {
    id: '3',
    name: 'Master Tailor Studio',
    image: tailorImages[2],
    rating: 5.0,
    reviews: 203,
    turnaroundTime: 5,
    distance: 2.1,
    specialties: ['Bespoke Suits', 'Custom Design', 'Luxury'],
    priceRange: '$$$',
    pickupDelivery: true,
    available: true,
  },
  {
    id: '4',
    name: 'Stitch & Style',
    image: tailorImages[3],
    rating: 4.8,
    reviews: 156,
    turnaroundTime: 3,
    distance: 1.5,
    specialties: ['Dresses', 'Casual Wear', 'Alterations'],
    priceRange: '$$',
    pickupDelivery: false,
    available: true,
  },
  {
    id: '5',
    name: 'The Hem House',
    image: tailorImages[4],
    rating: 4.6,
    reviews: 74,
    turnaroundTime: 2,
    distance: 3.2,
    specialties: ['Hemming', 'Repairs', 'Simple Alterations'],
    priceRange: '$',
    pickupDelivery: true,
    available: true,
  },
  {
    id: '6',
    name: 'Precision Tailors',
    image: tailorImages[5],
    rating: 4.9,
    reviews: 198,
    turnaroundTime: 4,
    distance: 1.8,
    specialties: ['Business Attire', 'Formal Wear', 'Shirts'],
    priceRange: '$$',
    pickupDelivery: true,
    available: true,
  },
];

export function TailorBrowse({ navigateTo }: TailorBrowseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'turnaround' | 'distance' | 'rating'>('turnaround');
  const [filterDelivery, setFilterDelivery] = useState(false);

  const filteredAndSortedTailors = useMemo(() => {
    let result = [...mockTailors];

    // Filter by search
    if (searchQuery) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by delivery
    if (filterDelivery) {
      result = result.filter(t => t.pickupDelivery);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'turnaround':
          return a.turnaroundTime - b.turnaroundTime;
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, sortBy, filterDelivery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-gray-900">Discover Tailors</h1>
              <p className="text-gray-600 text-sm">Find the perfect match for your needs</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Sort & Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 flex-shrink-0">
              Sort by:
            </div>
            <button
              onClick={() => setSortBy('turnaround')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all flex-shrink-0 ${
                sortBy === 'turnaround' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              Fastest
            </button>
            <button
              onClick={() => setSortBy('distance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all flex-shrink-0 ${
                sortBy === 'distance' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Nearest
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all flex-shrink-0 ${
                sortBy === 'rating' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Star className="w-4 h-4" />
              Top Rated
            </button>
            <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>
            <button
              onClick={() => setFilterDelivery(!filterDelivery)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all flex-shrink-0 ${
                filterDelivery 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <Truck className="w-4 h-4" />
              Delivery
            </button>
          </div>
        </div>
      </header>

      {/* Tailor List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="text-gray-900">{filteredAndSortedTailors.length}</span> tailors available
          </div>
          {sortBy === 'turnaround' && (
            <div className="flex items-center gap-2 text-sm text-indigo-600">
              <Sparkles className="w-4 h-4" />
              Showing fastest first
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTailors.map((tailor) => (
            <div
              key={tailor.id}
              onClick={() => navigateTo('tailor-profile', tailor.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                <ImageWithFallback 
                  src={tailor.image}
                  alt={tailor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {tailor.turnaroundTime <= 2 && (
                    <div className="px-3 py-1 bg-green-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg">
                      <Clock className="w-3 h-3" />
                      Fast
                    </div>
                  )}
                  {tailor.rating >= 4.9 && (
                    <div className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      Top Rated
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div className="absolute top-3 right-3">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-900 shadow-lg">
                    {tailor.priceRange}
                  </div>
                </div>

                {/* Distance */}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-900 shadow-lg">
                    <MapPin className="w-3 h-3" />
                    {tailor.distance} mi
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {tailor.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{tailor.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{tailor.reviews} reviews</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tailor.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                  {tailor.specialties.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                      +{tailor.specialties.length - 2}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {tailor.turnaroundTime} {tailor.turnaroundTime === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  {tailor.pickupDelivery && (
                    <div className="flex items-center gap-1 text-indigo-600 text-sm">
                      <Truck className="w-4 h-4" />
                      <span>Delivery</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedTailors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No tailors found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterDelivery(false);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}