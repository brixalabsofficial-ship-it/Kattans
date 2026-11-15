import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('ckb_kattans_cart') || '[]'),
  isCartOpen: false,
  selectedProductForModal: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),

  openProductModal: (product) => set({ selectedProductForModal: product }),
  closeProductModal: () => set({ selectedProductForModal: null }),

  addItem: (item) => {
    // Generate a unique cart key based on product id, variant, and selected addons
    const variantId = item.selectedVariant?.id || 'default';
    const addonIds = (item.selectedAddons || []).map(a => a.id).sort().join('-');
    const cartItemId = `${item.id}_${variantId}_${addonIds}_${item.instructions || ''}`;

    const items = get().items;
    const existingIndex = items.findIndex(i => i.cartItemId === cartItemId);

    let newItems;
    if (existingIndex > -1) {
      newItems = items.map((i, index) => {
        if (index === existingIndex) {
          const newQty = i.quantity + (item.quantity || 1);
          return {
            ...i,
            quantity: newQty,
            totalPrice: i.unitPrice * newQty
          };
        }
        return i;
      });
    } else {
      const unitPrice = (item.selectedVariant?.price || item.price) +
        (item.selectedAddons || []).reduce((acc, a) => acc + a.price, 0);
      const quantity = item.quantity || 1;

      newItems = [
        ...items,
        {
          ...item,
          cartItemId,
          unitPrice,
          quantity,
          totalPrice: unitPrice * quantity
        }
      ];
    }

    localStorage.setItem('ckb_kattans_cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (cartItemId) => {
    const newItems = get().items.filter(i => i.cartItemId !== cartItemId);
    localStorage.setItem('ckb_kattans_cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (cartItemId, delta) => {
    const items = get().items;
    const newItems = items.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty
        };
      }
      return item;
    }).filter(Boolean);

    localStorage.setItem('ckb_kattans_cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem('ckb_kattans_cart');
    set({ items: [] });
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}));
