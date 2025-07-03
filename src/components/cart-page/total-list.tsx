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
    <div className='flex flex-col w-full justify-around'>
      <div className='py-6 space-y-4'>
        <div className='flex justify-between'>
          <p className='font-bold'>Subtotal</p>
          <p>{peso.format(cartTotal)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>Delivery</p>
          <p>Free</p>
        </div>
      </div>
      <Separator />

      <ul className="space-y-4 my-4">
        <li className="flex items-center justify-between">
          <span className="font-semibold">DESCUENTOS</span>
          <CirclePercent />
        </li>
        {calcDiscountsData.appliedDiscounts.map((item) => (
          <li className="flex items-center justify-between">
            <span className="font-semibold">{item.discountName.toLowerCase()}</span>
            <span>{item.discountValue}% x{item.appliedTimes}</span>
          </li>
        ))}
      </ul>

      <div className='flex justify-between py-4'>
        <p className='font-bold'>Importe del descuento</p>
        <p className="text-red-500">- {peso.format(calcDiscountsData.discountAmount)}</p>
      </div>
      <Separator />
      <div className='flex justify-between py-6'>
        <p className='font-bold'>Precio Final</p>
        <p>{peso.format(calcDiscountsData.finalTotal)}</p>
      </div>
    </div>
  )
}

export default TotalList
