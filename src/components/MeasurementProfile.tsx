import { useState } from 'react';
import { ArrowLeft, Save, Info, CheckCircle, Ruler, User, Shirt, Archive } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { View, Measurements, MeasurementsByCategory } from '../App';

interface MeasurementProfileProps {
  measurements: MeasurementsByCategory;
  setMeasurements: (measurements: MeasurementsByCategory) => void;
  navigateTo: (view: View) => void;
}

type GarmentCategory = 'shirt' | 'pants' | 'blouse' | 'dress' | 'suit';

interface MeasurementField {
  key: string;
  label: string;
  description: string;
  icon: string;
}

const categoryConfig: Record<GarmentCategory, { 
  label: string; 
  icon: JSX.Element; 
  color: string;
  fields: MeasurementField[];
}> = {
  shirt: {
    label: 'Shirts',
    icon: <Shirt className="w-5 h-5" />,
    color: 'indigo',
    fields: [
      { key: 'neck', label: 'Neck', description: 'Around the base of your neck', icon: '👔' },
      { key: 'chest', label: 'Chest', description: 'Around the fullest part of your chest', icon: '📏' },
      { key: 'waist', label: 'Waist', description: 'Around your natural waistline', icon: '⭕' },
      { key: 'sleeve', label: 'Sleeve', description: 'From shoulder to wrist with arm bent', icon: '👕' },
      { key: 'shoulder', label: 'Shoulder', description: 'From shoulder point to shoulder point', icon: '🎽' },
      { key: 'length', label: 'Shirt Length', description: 'From back of neck to desired hem', icon: '📐' },
    ],
  },
  pants: {
    label: 'Pants',
    icon: <Archive className="w-5 h-5" />,
    color: 'purple',
    fields: [
      { key: 'waist', label: 'Waist', description: 'Around your natural waistline', icon: '⭕' },
      { key: 'hips', label: 'Hips', description: 'Around the fullest part of your hips', icon: '👖' },
      { key: 'thigh', label: 'Thigh', description: 'Around the fullest part of your thigh', icon: '🦵' },
      { key: 'inseam', label: 'Inseam', description: 'From crotch to ankle', icon: '📏' },
      { key: 'length', label: 'Outseam', description: 'From waist to ankle on outside', icon: '📐' },
    ],
  },
  blouse: {
    label: 'Blouses',
    icon: <Shirt className="w-5 h-5" />,
    color: 'pink',
    fields: [
      { key: 'chest', label: 'Bust', description: 'Around the fullest part of your bust', icon: '📏' },
      { key: 'waist', label: 'Waist', description: 'Around your natural waistline', icon: '⭕' },
      { key: 'sleeve', label: 'Sleeve', description: 'From shoulder to wrist with arm bent', icon: '👕' },
      { key: 'shoulder', label: 'Shoulder', description: 'From shoulder point to shoulder point', icon: '🎽' },
      { key: 'length', label: 'Blouse Length', description: 'From shoulder to desired hem', icon: '📐' },
    ],
  },
  dress: {
    label: 'Dresses',
    icon: <User className="w-5 h-5" />,
    color: 'rose',
    fields: [
      { key: 'chest', label: 'Bust', description: 'Around the fullest part of your bust', icon: '📏' },
      { key: 'waist', label: 'Waist', description: 'Around your natural waistline', icon: '⭕' },
      { key: 'hips', label: 'Hips', description: 'Around the fullest part of your hips', icon: '👖' },
      { key: 'shoulder', label: 'Shoulder', description: 'From shoulder point to shoulder point', icon: '🎽' },
      { key: 'length', label: 'Dress Length', description: 'From shoulder to desired hem', icon: '📐' },
    ],
  },
  suit: {
    label: 'Suits',
    icon: <Archive className="w-5 h-5" />,
    color: 'slate',
    fields: [
      { key: 'neck', label: 'Neck', description: 'Around the base of your neck', icon: '👔' },
      { key: 'chest', label: 'Chest', description: 'Around the fullest part of your chest', icon: '📏' },
      { key: 'waist', label: 'Waist', description: 'Around your natural waistline', icon: '⭕' },
      { key: 'hips', label: 'Hips', description: 'Around the fullest part of your hips', icon: '👖' },
      { key: 'inseam', label: 'Inseam', description: 'From crotch to ankle', icon: '📐' },
      { key: 'sleeve', label: 'Sleeve', description: 'From shoulder to wrist with arm bent', icon: '👕' },
      { key: 'shoulder', label: 'Shoulder', description: 'From shoulder point to shoulder point', icon: '🎽' },
    ],
  },
};

export function MeasurementProfile({ measurements, setMeasurements, navigateTo }: MeasurementProfileProps) {
  const [activeCategory, setActiveCategory] = useState<GarmentCategory>('shirt');
  const [localMeasurements, setLocalMeasurements] = useState<MeasurementsByCategory>(measurements);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setMeasurements(localMeasurements);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateMeasurement = (category: GarmentCategory, key: string, value: string) => {
    setLocalMeasurements({
      ...localMeasurements,
      [category]: {
        ...localMeasurements[category],
        [key]: value ? parseFloat(value) : undefined
      }
    });
  };

  const currentConfig = categoryConfig[activeCategory];
  const currentMeasurements = localMeasurements[activeCategory] || {};
  const completedFields = currentConfig.fields.filter(field => 
    currentMeasurements[field.key as keyof typeof currentMeasurements]
  ).length;
  const progressPercent = (completedFields / currentConfig.fields.length) * 100;

  // Calculate total completed across all categories
  const totalCompleted = Object.keys(categoryConfig).reduce((sum, cat) => {
    const catMeasurements = localMeasurements[cat as GarmentCategory] || {};
    const catConfig = categoryConfig[cat as GarmentCategory];
    return sum + catConfig.fields.filter(field => 
      catMeasurements[field.key as keyof typeof catMeasurements]
    ).length;
  }, 0);

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
                <h1 className="text-gray-900">My Measurements</h1>
                <p className="text-gray-600 text-sm">Store measurements by garment type for perfect fit</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
                saved 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved!' : 'Save'}</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(categoryConfig) as GarmentCategory[]).map((category) => {
              const config = categoryConfig[category];
              const catMeasurements = localMeasurements[category] || {};
              const catCompleted = config.fields.filter(field => 
                catMeasurements[field.key as keyof typeof catMeasurements]
              ).length;
              const isActive = activeCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? config.color === 'indigo' ? 'bg-indigo-600 text-white shadow-lg' :
                        config.color === 'purple' ? 'bg-purple-600 text-white shadow-lg' :
                        config.color === 'pink' ? 'bg-pink-600 text-white shadow-lg' :
                        config.color === 'rose' ? 'bg-rose-600 text-white shadow-lg' :
                        config.color === 'slate' ? 'bg-slate-600 text-white shadow-lg' :
                        'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {config.icon}
                  <span>{config.label}</span>
                  {catCompleted > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {catCompleted}/{config.fields.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Bar for Current Category */}
          {completedFields > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{currentConfig.label} Completion</span>
                <span className={`text-sm text-${currentConfig.color}-600`}>
                  {completedFields} of {currentConfig.fields.length}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-${currentConfig.color}-600 to-${currentConfig.color}-400 transition-all duration-500 rounded-full`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Visual Guide */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hero Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 sticky top-32">
              <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1753162658653-d33c53910d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjB0YXBlfGVufDF8fHx8MTc2NDc5MjI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Measuring tape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Ruler className="w-5 h-5" />
                    <span>Measurement Guide</span>
                  </div>
                  <p className="text-white/90 text-sm">
                    Follow our tips for accurate measurements
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-gray-900 mb-4">Quick Tips</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${currentConfig.color}-500 to-${currentConfig.color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm">1</span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm mb-1">Stand naturally</div>
                      <p className="text-gray-600 text-xs">
                        Relax and maintain a natural posture
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${currentConfig.color}-500 to-${currentConfig.color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm">2</span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm mb-1">Keep tape snug</div>
                      <p className="text-gray-600 text-xs">
                        Not too tight, not too loose
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${currentConfig.color}-500 to-${currentConfig.color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm">3</span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm mb-1">Measure twice</div>
                      <p className="text-gray-600 text-xs">
                        Double-check for accuracy
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${currentConfig.color}-500 to-${currentConfig.color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm">4</span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm mb-1">Get help</div>
                      <p className="text-gray-600 text-xs">
                        Ask someone to assist you
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                {totalCompleted > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl text-indigo-600 mb-1">{totalCompleted}</div>
                      <p className="text-gray-600 text-sm">Total Measurements Saved</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Measurements Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-blue-900 mb-2">Privacy & Security</div>
                <p className="text-blue-700 text-sm">
                  Your measurements are stored securely and only shared with tailors when you place an order. Organize by garment type for the most accurate alterations.
                </p>
              </div>
            </div>

            {/* Measurements Grid */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 bg-${currentConfig.color}-100 rounded-xl flex items-center justify-center`}>
                  {currentConfig.icon}
                </div>
                <h2 className="text-gray-900">{currentConfig.label} Measurements</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentConfig.fields.map((field) => {
                  const value = currentMeasurements[field.key as keyof typeof currentMeasurements];
                  return (
                    <div key={field.key} className="group">
                      <label htmlFor={`${activeCategory}-${field.key}`} className="flex items-center gap-2 text-gray-900 mb-2">
                        <span className="text-xl">{field.icon}</span>
                        {field.label}
                        {value && (
                          <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                        )}
                      </label>
                      <p className="text-gray-600 text-sm mb-3">{field.description}</p>
                      <div className="relative">
                        <input
                          type="number"
                          id={`${activeCategory}-${field.key}`}
                          step="0.1"
                          placeholder="0.0"
                          value={value || ''}
                          onChange={(e) => updateMeasurement(activeCategory, field.key, e.target.value)}
                          className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-${currentConfig.color}-500/20 pr-20 transition-all ${
                            value
                              ? 'border-green-300 bg-green-50/30' 
                              : 'border-gray-200 group-hover:border-gray-300'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          inches
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional Measurement CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white mb-2">Need Professional Help?</h3>
                    <p className="text-white/90">
                      Many tailors offer free measurement services. Browse tailors and ask about professional measurement appointments for the most accurate results.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('browse')}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Find a Tailor
                </button>
              </div>
            </div>

            {/* Save Reminder */}
            {completedFields > 0 && !saved && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-yellow-900 mb-1">Don't forget to save!</div>
                    <p className="text-yellow-700 text-sm">
                      You have {completedFields} {currentConfig.label.toLowerCase()} measurement{completedFields !== 1 ? 's' : ''} entered
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors shadow-lg flex-shrink-0"
                >
                  Save Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}