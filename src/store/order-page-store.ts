import { create } from 'zustand'

interface OrderState {
  orderId: number | null;
  updateSelectedOrderId: (newSelectedId: number) => void;
}

export const useOrdersStore = create<OrderState>()((set) => ({
  orderId: null,
  updateSelectedOrderId: (newSelectedId: number) => set({ orderId: newSelectedId }),
}))

interface OrderPaginationState {
  page: number;
  updatePage: (newPage: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const useOrderPagination = create<OrderPaginationState>()((set) => ({
  page: 1,
  updatePage: (newPage: number) => set({ page: newPage }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  previousPage: () => set((state) => ({ page: state.page - 1 })),
}))


