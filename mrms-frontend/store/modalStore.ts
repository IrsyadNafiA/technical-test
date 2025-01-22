import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any | null;
  openModal: (type: string, data: any) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalType: null,
  modalData: null,
  openModal: (type: string, data: any) =>
    set({ isModalOpen: true, modalType: type, modalData: data }),
  closeModal: () =>
    set({ isModalOpen: false, modalType: null, modalData: null }),
}));

export default useModalStore;
