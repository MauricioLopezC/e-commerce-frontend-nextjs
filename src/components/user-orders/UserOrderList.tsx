import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Order } from "@/interfaces/orders"


function UserOrderList(order: Order) {
  //all cart data here 
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orden con id: {order.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>PAGO: tarjeta</p>
          <p>Direccion: Mariano Saravia 1666</p>
        </div>

        <div className="flex p-8">
          <div>
            {/* <CldImage /> */}
            <div>DATOS PRODUCTO</div>
          </div>
          <div>DATOS ENVIO</div>
          <div>DATOS XD</div>

        </div>


      </CardContent>
    </Card>
  )
}

export default UserOrderList
