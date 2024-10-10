import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // 初始化為空的購物車
  }),
  actions: {
    addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    updateQuantity(index, quantity) {
      if (quantity > 0) {
        this.cartItems[index].quantity = quantity;
      }
    },
    clearCart() {
      this.cartItems = [];
    },
  },
  getters: {
    totalItems(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal(state) {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    total(state) {
      return this.subtotal + 5; // 假設運費為 5
    },
  },
});
