"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/interfaces/orders";
import { peso } from "@/lib/constants";
import { CldImage } from "next-cloudinary";

function UserOrdersCard({ order }: { order: Order }) {
  if (!order.orderItems) return null;
  return (
    <Card key={order.id}>
      <CardHeader className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 items-start p-6">
        <div>
          <div className="text-sm font-medium">Orden</div>
          <div className="text-sm text-muted-foreground">{order.id}</div>
        </div>
        <div>
          <div className="text-sm font-medium">Fecha</div>
          <div className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("es-AR")}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">Total</div>
          <div className="text-sm text-muted-foreground">
            {peso.format(order.total)}
          </div>
        </div>
        <div className="flex gap-2 sm:justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="#">Ver Orden</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#">Ver Factura</Link>
          </Button>
        </div>
        <Separator className="sm:col-span-2 md:col-span-4" />
      </CardHeader>
      <CardContent className="p-0">
        {order.orderItems.map((order, index) => (
          <div key={order.id}>
            {index > 0 && <Separator />}
            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-[100px_1fr] md:grid-cols-[125px_1fr]">
                <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
                  <CldImage
                    src={
                      order.product?.images[0].imgSrc || "samples/animals/cat"
                    }
                    alt={order.product?.name ?? "product image"}
                    fill
                    className="border object-cover"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8vw"
                    priority
                  />
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <h3 className="font-semibold">
                          {order.product?.name.toUpperCase()}
                        </h3>
                        <Badge>Cantidad: {order.quantity}</Badge>
                        <div className="flex divide-x">
                          <h2 className="text-md text-left text-gray-600 pr-3">
                            {order.productSku?.color}
                          </h2>
                          <h2 className="text-md text-right text-gray-600 pl-3">
                            {order.productSku?.size.toUpperCase()}
                          </h2>
                        </div>
                      </div>
                      <div className="text-right font-medium">
                        {peso.format(order.price)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Entregado{" "}
                      {new Date(order.createdAt).toLocaleDateString("es-AR")}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary"
                        asChild
                      >
                        <Link href={`/products/${order.product?.id ?? 1}`}>
                          Ver producto
                        </Link>
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary"
                        asChild
                      >
                        <Link href="#">Comprar de nuevo</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default UserOrdersCard;
