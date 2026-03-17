import { components } from '@/lib/api/generated/schema';
import { DiscountResponseDtoApplicableTo as ApplicableTo } from '@/lib/api/generated/schema';
import { DiscountResponseDtoDiscountType as DiscountType } from '@/lib/api/generated/schema';

export { ApplicableTo, DiscountType };
export type Discount = components['schemas']['DiscountResponseDto'];
