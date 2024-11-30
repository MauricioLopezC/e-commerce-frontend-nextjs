import { OrderItem } from "@/interfaces/orders"
import { CldImage } from "next-cloudinary"

function UserOrderItem(orderItem: OrderItem) {
  //TODO: cart item with product basic information here
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
