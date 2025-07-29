import { create } from "zustand";

interface NavigationStore {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isCollapsed: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed }),
})); 