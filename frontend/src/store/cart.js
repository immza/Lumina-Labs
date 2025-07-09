// frontend/src/store/cart.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [], // Initially the cart is empty
      isSidebarOpen: false, // <--- NEW: State to control sidebar visibility

      // <--- NEW: Actions to open and close the sidebar
      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),

      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item._id === product._id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== productId),
        }));
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Optionally, you can explicitly persist only the 'cart' and 'isSidebarOpen'
      // partialize: (state) => ({ cart: state.cart, isSidebarOpen: state.isSidebarOpen }),
      // Note: isSidebarOpen probably doesn't need to be persisted if it should always be closed on refresh.
      // If you want it always closed on refresh, remove isSidebarOpen from here or from state.
      // For this case, let's NOT persist isSidebarOpen, as a fresh load should start with sidebar closed.
      partialize: (state) => ({ cart: state.cart }), // <--- Reverted partialize to only save cart
    }
  )
);
