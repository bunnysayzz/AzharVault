import { create } from 'zustand';

interface StoreState {
  refreshTrigger: number;
  incrementRefreshTrigger: () => void;
}

export const useStore = create<StoreState>((set) => ({
  refreshTrigger: 0,
  incrementRefreshTrigger: () => set((state) => ({ 
    refreshTrigger: state.refreshTrigger + 1 
  })),
})); 