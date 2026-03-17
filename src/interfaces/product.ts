import {
  components,
  ProductResponseDtoSex as Sex,
} from '@/lib/api/generated/schema';

export { Sex };

export type Product = components['schemas']['ProductResponseDto'];

export type ProductSku = components['schemas']['ProductSkuResponseDto'];
export type Category = components['schemas']['CategoryResponseDto'];
