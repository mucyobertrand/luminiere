export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'staff';
  loyaltyPoints: number;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  isAvailable: boolean;
  preparationTime: number;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviewCount: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: string[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryAddress?: Address;
  tableNumber?: number;
  orderType: 'delivery' | 'dine-in' | 'pickup';
  paymentMethod: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
  specialInstructions?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  cuisine: string[];
  address: Address;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  isRead: boolean;
  createdAt: string;
  data?: any;
}