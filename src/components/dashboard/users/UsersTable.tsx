'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { peso } from "@/lib/constants"
import { UsersData } from "@/lib/actions/user.actions"
import DeleteUserAlert from "./DeleteUserAlert"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

function UsersTable({ usersData }: { usersData: UsersData }) {

  const [alertOpen, setAlertOpen] = useState(false)
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
        <CardDescription>
          Gestione sus Clientes y visualice su rendimiento de ventas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Compras
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Total Comprado
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Creado el
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              usersData.users?.map((user, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium flex space-x-2">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    {user.role === "ADMIN" &&
                      <>
                        <Badge>TÚ</Badge>
                      </>
                    }
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.order.reduce((previous, current) => {
                      if (current.orderItems) {
                        return previous
                          + current.orderItems?.reduce((previous, current) => (previous + current.quantity), 0)
                      } else return 0
                    }, 0)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {peso.format(
                      user.order.reduce((previous, current) => (
                        previous + current.total
                      ), 0)
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString('es-AR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={async () => {
                          console.log(user.id)
                          setAlertOpen(true)
                          setDeletedUserId(user.id)
                        }}>
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <DeleteUserAlert isOpen={alertOpen} setIsOpen={setAlertOpen} userId={deletedUserId} />
      </CardFooter>
    </Card>
  )
}

export default UsersTable
