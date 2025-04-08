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
import BanUserAlert from "./BanUserAlert"
import UnBanUserAlert from "./UnBanUserAlert"

function UsersTable({ usersData }: { usersData: UsersData }) {

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertBanOpen, setAlertBanOpen] = useState(false)
  const [alertUnBanOpen, setAlertUnBanOpen] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
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
              <TableHead className="hidden md:table-cell">Estado</TableHead>
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
                    {!user.isBanned &&
                      <Badge variant='outline'>Activo</Badge>
                    }
                    {user.isBanned &&
                      <Badge variant='destructive'>Bloqueado</Badge>
                    }
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {/*//OPTIMIZE:  fetch data from rest api to /orders?userId=x */}
                    {user.totalOrders}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {peso.format(user.totalSpent ?? 0)}
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
                        {!user.isBanned &&
                          <DropdownMenuItem
                            onClick={async () => {
                              console.log(user.id)
                              setUserId(user.id)
                              setAlertBanOpen(true)
                            }}>
                            Bloquear
                          </DropdownMenuItem>
                        }
                        {user.isBanned &&
                          <DropdownMenuItem onClick={async () => {
                            console.log(user.id)
                            setUserId(user.id)
                            setAlertUnBanOpen(true)
                          }}>
                            desbloquear
                          </DropdownMenuItem>
                        }
                        <DropdownMenuItem className="text-red-500"
                          onClick={async () => {
                            console.log(user.id)
                            setAlertOpen(true)
                            setUserId(user.id)
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
        <DeleteUserAlert isOpen={alertOpen} setIsOpen={setAlertOpen} userId={userId} />
        <BanUserAlert isOpen={alertBanOpen} setIsOpen={setAlertBanOpen} userId={userId} />
        <UnBanUserAlert isOpen={alertUnBanOpen} setIsOpen={setAlertUnBanOpen} userId={userId} />
      </CardFooter>
    </Card>
  )
}

export default UsersTable
