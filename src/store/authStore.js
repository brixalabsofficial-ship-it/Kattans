import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('ckb_kattans_user') || 'null'),
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (userData) => {
    localStorage.setItem('ckb_kattans_user', JSON.stringify(userData));
    set({ user: userData, isAuthModalOpen: false });
  },

  logout: () => {
    localStorage.removeItem('ckb_kattans_user');
    set({ user: null });
  }
}));
