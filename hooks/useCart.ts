import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, MenuItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  addItem: (menuItem: MenuItem, quantity?: number, customizations?: string[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  loadStoredCart: () => Promise<void>;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  totalAmount: 0,
  itemCount: 0,

  addItem: (menuItem: MenuItem, quantity = 1, customizations = []) => {
    const { items } = get();
    const existingItemIndex = items.findIndex(
      item => item.menuItem.id === menuItem.id && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    let newItems: CartItem[];
    
    if (existingItemIndex >= 0) {
      newItems = items.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}`,
        menuItem,
        quantity,
        customizations,
      };
      newItems = [...items, newItem];
    }

    const totalAmount = newItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

    set({ items: newItems, totalAmount, itemCount });
    AsyncStorage.setItem('cart', JSON.stringify(newItems));
  },

  removeItem: (itemId: string) => {
    const { items } = get();
    const newItems = items.filter(item => item.id !== itemId);
    const totalAmount = newItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

    set({ items: newItems, totalAmount, itemCount });
    AsyncStorage.setItem('cart', JSON.stringify(newItems));
  },

  updateQuantity: (itemId: string, quantity: number) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    const newItems = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );

    const totalAmount = newItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

    set({ items: newItems, totalAmount, itemCount });
    AsyncStorage.setItem('cart', JSON.stringify(newItems));
  },

  clearCart: () => {
    set({ items: [], totalAmount: 0, itemCount: 0 });
    AsyncStorage.removeItem('cart');
  },

  loadStoredCart: async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const items = JSON.parse(storedCart);
        const totalAmount = items.reduce((sum: number, item: CartItem) => sum + (item.menuItem.price * item.quantity), 0);
        const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
        set({ items, totalAmount, itemCount });
      }
    } catch (error) {
      console.error('Failed to load stored cart:', error);
    }
  },
}));