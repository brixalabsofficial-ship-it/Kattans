import { create } from 'zustand';

export const useOrderStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem('ckb_kattans_orders') || '[]'),

  addOrder: (orderData) => {
    const orderId = `CKB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'confirmed', // 'confirmed' -> 'preparing' -> 'out_for_delivery' -> 'delivered'
      statusHistory: [
        { status: 'confirmed', title: 'Order Received', time: 'Just now', done: true },
        { status: 'preparing', title: 'Kitchen Preparing Dum & Charcoal Fire', time: '10-15 mins', done: false },
        { status: 'out_for_delivery', title: 'Rider on the Way', time: '20-30 mins', done: false },
        { status: 'delivered', title: 'Delivered Fresh & Hot', time: 'Estimated 35 mins', done: false }
      ],
      estimatedTime: '30-40 mins',
      ...orderData
    };

    const updated = [newOrder, ...get().orders];
    localStorage.setItem('ckb_kattans_orders', JSON.stringify(updated));
    set({ orders: updated });
    return newOrder;
  },

  getOrderById: (orderId) => {
    return get().orders.find(o => o.id === orderId);
  },

  getOrdersByUser: (phone) => {
    if (!phone) return [];
    return get().orders.filter(o => o.customerPhone === phone);
  }
}));
