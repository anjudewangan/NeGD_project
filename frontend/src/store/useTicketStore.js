import {create} from 'zustand';

export const useTicketStore = create((set) => ({
  selectedTicketId: null,
  setSelectedTicketId: (ticket) => set({ selectedTicketId: ticket }),
}));