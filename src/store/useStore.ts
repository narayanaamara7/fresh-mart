import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/mockData';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'freshmart-cart-storage',
    }
  )
);

interface User {
  name: string;
  mobile: string;
}

interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  pincode: string;
  isDefault?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'te';
  addresses: Address[];
  login: (mobile: string, name?: string) => void;
  logout: () => void;
  setLanguage: (lang: 'en' | 'te') => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      language: 'en',
      addresses: [],
      login: (mobile, name = 'Customer') => set({ user: { name, mobile }, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setLanguage: (language) => set({ language }),
      addAddress: (address) => set((state) => ({ 
        addresses: [...state.addresses, address] 
      })),
      removeAddress: (id) => set((state) => ({ 
        addresses: state.addresses.filter(a => a.id !== id) 
      })),
      setDefaultAddress: (id) => set((state) => ({
        addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === id }))
      })),
    }),
    {
      name: 'freshmart-auth-storage',
    }
  )
);

export interface Order {
  id: string;
  date: string;
  items: CartItem[]; // Full cart items
  total: number;
  status: string; // 'Pending', 'Processing', 'Delivered', etc.
  deliveryAddress: {
    fullName: string;
    street: string;
    landmark?: string;
    pincode: string;
    phone: string;
  };
  deliverySlot: string;
  paymentMethod: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      })),
    }),
    {
      name: 'freshmart-order-storage',
    }
  )
);


interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: '' }),
}));
