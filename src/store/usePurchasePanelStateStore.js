import { create } from 'zustand';

const usePurchasePanelStateStore = create((set) => ({
  visible: false,
  show: () => set(() => ({ visible: true })),
  hide: () => set(() => ({ visible: false })),
}));

export default usePurchasePanelStateStore;
