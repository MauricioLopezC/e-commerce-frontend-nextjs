import { components } from '@/lib/api/generated/schema.d';
import { DiscountResponseDtoApplicableTo as ApplicableTo } from '@/lib/api/generated/schema.d';
import { DiscountResponseDtoDiscountType as DiscountType } from '@/lib/api/generated/schema.d';

export { ApplicableTo, DiscountType };
export type Discount = components['schemas']['DiscountResponseDto'];
