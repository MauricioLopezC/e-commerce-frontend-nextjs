import { OrderItem } from "@/interfaces/orders"
import { CldImage } from "next-cloudinary"

function UserOrderItem(orderItem: OrderItem) {
  return (
    <div className="flex p-8">
      <div>
        {/* <CldImage /> */}
        <div>{orderItem.product?.name}</div>
      </div>
      <div>{orderItem.price}</div>
      <div>DATOS XD</div>
    </div>
  )
}

export default UserOrderItem
