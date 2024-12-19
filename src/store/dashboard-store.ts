import { create } from 'zustand'

interface BreadCrumbsState {
  pages: { name: string, href: string }[] | null;

}

export const useBreadCrumbsStore = create<BreadCrumbsState>()((set) => ({
  pages: null,
  updatePages: (newPages: { name: string, href: string }[]) => set({ pages: newPages }),
}))

