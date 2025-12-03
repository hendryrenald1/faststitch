import { useState } from 'react';
import { Home } from './components/Home';
import { TailorBrowse } from './components/TailorBrowse';
import { TailorProfile } from './components/TailorProfile';
import { MeasurementProfile } from './components/MeasurementProfile';
import { OrderFlow } from './components/OrderFlow';
import { OrderTracking } from './components/OrderTracking';
import { CustomerDashboard } from './components/CustomerDashboard';

export type View = 'home' | 'browse' | 'tailor-profile' | 'measurements' | 'order' | 'tracking' | 'dashboard';

export interface Tailor {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  turnaroundTime: number; // in days
  distance: number; // in miles
  specialties: string[];
  priceRange: string;
  pickupDelivery: boolean;
  available: boolean;
}

export interface Order {
  id: string;
  tailorId: string;
  tailorName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'ready' | 'delivered';
  createdAt: string;
  estimatedCompletion: string;
  pickupDelivery: 'pickup' | 'delivery';
  totalPrice: number;
}

export interface Measurements {
  neck?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  sleeve?: number;
  shoulder?: number;
}

export interface MeasurementsByCategory {
  shirt?: Measurements & { length?: number };
  pants?: Measurements & { thigh?: number; length?: number };
  blouse?: Measurements & { length?: number };
  dress?: Measurements & { length?: number };
  suit?: Measurements;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<MeasurementsByCategory>({});
  const [orders, setOrders] = useState<Order[]>([]);

  const navigateTo = (view: View, tailorId?: string, orderId?: string) => {
    setCurrentView(view);
    if (tailorId) setSelectedTailorId(tailorId);
    if (orderId) setSelectedOrderId(orderId);
  };

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && (
        <Home 
          navigateTo={navigateTo}
          activeOrders={orders.filter(o => o.status !== 'delivered').length}
        />
      )}
      
      {currentView === 'browse' && (
        <TailorBrowse navigateTo={navigateTo} />
      )}
      
      {currentView === 'tailor-profile' && selectedTailorId && (
        <TailorProfile 
          tailorId={selectedTailorId}
          navigateTo={navigateTo}
        />
      )}
      
      {currentView === 'measurements' && (
        <MeasurementProfile 
          measurements={measurements}
          setMeasurements={setMeasurements}
          navigateTo={navigateTo}
        />
      )}
      
      {currentView === 'order' && selectedTailorId && (
        <OrderFlow 
          tailorId={selectedTailorId}
          measurements={measurements}
          addOrder={addOrder}
          navigateTo={navigateTo}
        />
      )}
      
      {currentView === 'tracking' && selectedOrderId && (
        <OrderTracking 
          orderId={selectedOrderId}
          orders={orders}
          navigateTo={navigateTo}
        />
      )}
      
      {currentView === 'dashboard' && (
        <CustomerDashboard 
          orders={orders}
          navigateTo={navigateTo}
        />
      )}
    </div>
  );
}

export default App;