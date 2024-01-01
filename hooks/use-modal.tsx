import { create } from "zustand";

interface useModalStore {
  isOpen: boolean;
  isIncomeModal: boolean;
  isExpenseModal: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModal = create<useModalStore>((set) => ({
  isOpen: false,
  isIncomeModal: false,
  isExpenseModal: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
