'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Button} from '@/components/ui/button'
import {CheckCircleIcon, MoreHorizontal, UserCheckIcon, UserRoundX} from 'lucide-react'
import {peso} from "@/lib/constants"
import {banUser, deleteUser, unBanUser, UsersData} from "@/lib/actions/user.actions"
import {useState} from "react"
import {Badge} from "@/components/ui/badge"
import {User} from "@/interfaces/users";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useToast} from "@/hooks/use-toast";

interface ConfirmState {
  action: "delete" | "block" | "unblock";
  user: User;
  onConfirm: () => void;
}


function UsersTable({usersData}: { usersData: UsersData }) {
  const [confirmData, setConfirmData] = useState<ConfirmState | null>(null);
  const {toast} = useToast()

  //close dialog
  const closeConfirm = () => {
    setConfirmData(null);
  };

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
                Registrado el
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
                    {user.role !== 'ADMIN' &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                              {!user.isBanned &&
                                  <DropdownMenuItem
                                      onClick={() => {
                                        setConfirmData({
                                          action: "block",
                                          user,
                                          onConfirm: async () => {
                                            const {user: bannedUser, error} = await banUser(user.id);
                                            if (bannedUser) {
                                              toast({
                                                description: (
                                                  <div>
                                                    <h2 className="font-semibold text-md">
                                                      <span><UserRoundX
                                                        className="h-6 w-6 mr-2 text-red-500 inline"/></span>
                                                      Usuario bloqueado!
                                                    </h2>
                                                  </div>
                                                ),
                                              })
                                              return
                                            }
                                            console.log(error)
                                            toast({
                                              description: (
                                                <div>
                                                  <h2 className="font-semibold text-md">
                                                    <span><CheckCircleIcon
                                                      className="h-6 w-6 mr-2 text-red-500 inline"/></span>
                                                    Error! intenta nuevamente
                                                  </h2>
                                                </div>
                                              ),
                                            })
                                          }
                                        })

                                      }}>
                                      Bloquear
                                  </DropdownMenuItem>
                              }
                              {user.isBanned &&
                                  <DropdownMenuItem onClick={async () => {
                                    setConfirmData({
                                      action: 'unblock',
                                      user,
                                      onConfirm: async () => {
                                        const {user: unbannedUser, error} = await unBanUser(user.id)
                                        if (unbannedUser) {
                                          toast({
                                            description: (
                                              <div>
                                                <h2 className="font-semibold text-md">
                                                  <span><UserCheckIcon className="h-6 w-6 mr-2 text-green-500 inline"/></span>
                                                  Usuario desbloqueado!
                                                </h2>
                                              </div>
                                            ),
                                          })
                                          return
                                        }
                                        console.log(error)
                                        toast({
                                          description: (
                                            <div>
                                              <h2 className="font-semibold text-md">
                                                <span><CheckCircleIcon
                                                  className="h-6 w-6 mr-2 text-red-500 inline"/></span>
                                                Error! intenta nuevamente
                                              </h2>
                                            </div>
                                          ),
                                        })
                                      }
                                    })
                                  }}>
                                      Desbloquear
                                  </DropdownMenuItem>
                              }
                                <DropdownMenuItem className="text-red-500"
                                                  onClick={() => {
                                                    setConfirmData({
                                                      action: 'delete',
                                                      user,
                                                      onConfirm: async () => {
                                                        const {user: deletedUser, error} = await deleteUser(user.id)
                                                        if (deletedUser) {
                                                          toast({
                                                            description: (
                                                              <div>
                                                                <h2 className="font-semibold text-md">
                                                                  <span><CheckCircleIcon
                                                                    className="h-6 w-6 mr-2 text-green-500 inline"/></span>
                                                                  Usuario eliminado
                                                                </h2>
                                                              </div>
                                                            ),
                                                          })
                                                          return
                                                        }
                                                        console.log(error)
                                                        toast({
                                                          description: (
                                                            <div>
                                                              <h2 className="font-semibold text-md">
                                                  <span><CheckCircleIcon
                                                    className="h-6 w-6 mr-2 text-red-500 inline"/></span>
                                                                Error! intenta nuevamente
                                                              </h2>
                                                            </div>
                                                          ),
                                                        })
                                                      }
                                                    })
                                                  }}>
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {confirmData && (
          <AlertDialog open={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {confirmData.action === "delete" && `Eliminar ${confirmData.user.firstName} ${confirmData.user.lastName}`}
                  {confirmData.action === "block" && `Bloquear ${confirmData.user.firstName} ${confirmData.user.lastName}`}
                  {confirmData.action === "unblock" && `Desbloquear ${confirmData.user.firstName} ${confirmData.user.lastName}`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmData.action === "delete" && "Esta acción no se puede deshacer."}
                  {confirmData.action === "block" && "El usuario no podrá iniciar sesión."}
                  {confirmData.action === "unblock" && "El usuario podrá volver a usar su cuenta."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => closeConfirm()}>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {

                    confirmData.onConfirm();
                    closeConfirm()
                  }}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  )
}

export default UsersTable
