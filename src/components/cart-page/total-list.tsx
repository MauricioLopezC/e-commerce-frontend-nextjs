import { peso } from "@/lib/constants";
import { Separator } from "../ui/separator";
import { CalcDiscountsData } from "@/lib/actions/cart.actions";
import { CirclePercent } from "lucide-react";

interface TotalListProps {
  cartTotal: number
  calcDiscountsData: CalcDiscountsData
}

function TotalList({ cartTotal, calcDiscountsData }: TotalListProps) {

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <span className=''>Subtotal</span>
        <span className="font-medium">{peso.format(cartTotal)}</span>
      </div>
      <div className='flex justify-between'>
        <span >Delivery</span>
        <span className="font-medium">Free</span>
      </div>

      <Separator />

      <ul className="space-y-4 my-4">
        <li className="flex items-center justify-between">
          <span className="font-semibold">DESCUENTOS</span>
          <CirclePercent />
        </li>
        {calcDiscountsData.appliedDiscounts.map((item) => (
          <li className="flex items-center justify-between" key={item.discountId}>
            <span>{item.discountName.toLowerCase()}</span>
            <span>{item.discountValue}% x{item.appliedTimes}</span>
          </li>
        ))}
      </ul>

      <div className='flex justify-between py-4'>
        <span className='font-semibold'>Importe del descuento</span>
        <span className="text-red-500">- {peso.format(calcDiscountsData.discountAmount)}</span>
      </div>
      <Separator />
      <div className='flex justify-between py-6'>
        <span className='font-bold'>Precio Final</span>
        <span>{peso.format(calcDiscountsData.finalTotal)}</span>
      </div>
    </div>
  )
}

export default TotalList
