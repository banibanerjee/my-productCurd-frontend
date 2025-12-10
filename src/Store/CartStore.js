import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(persist(
  (set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (index) => set((state) => {
      const updatedCart = [...state.cart];
      updatedCart.splice(index, 1);
      return { cart: updatedCart };
    }),
    clearCart: () => set({ cart: [] }),
  }),
  {
    name: "cart-storage", // <-- will store in localStorage
  }
));

export default useCartStore;
