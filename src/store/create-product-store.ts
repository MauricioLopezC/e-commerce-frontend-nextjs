import { create } from 'zustand'
//
//
interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  category: string;
  sex: string;
}

interface CreateProductSkuDto {
  size: string;
  color: string;
  quantity: number;
}

interface NewProductState {
  product: CreateProductDto;
  updateNewProduct: (newProduct: CreateProductDto) => void

}

export const useNewProductStore = create<NewProductState>()((set) => ({
  product: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sex: '',
  },
  updateNewProduct: (newProduct: CreateProductDto) => set({ product: newProduct }),
}))

interface NewProductSkusState {
  productSkus: CreateProductSkuDto[];
  updateProductSkus: (newSkus: CreateProductSkuDto[]) => void

}

export const useNewProductSkusStore = create<NewProductSkusState>()((set) => ({
  productSkus: [],
  updateProductSkus: (newSkus: CreateProductSkuDto[]) => set({ productSkus: newSkus })
}))

