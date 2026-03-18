import { getMyProfile } from '@/lib/actions/user.actions';
import LogOutButton from './LogOutButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, User as UserIcon, ShieldCheck, ShoppingBag, DollarSign } from 'lucide-react';
import { redirect } from 'next/navigation';

async function UserProfile() {
  const { data: user, error } = await getMyProfile();

  if (error || !user) {
    redirect('/auth/login');
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const joinedDate = new Date(user.createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="userPage" className="min-h-[70vh] max-w-2xl container mx-auto mt-16 px-4 pb-16">
      <Card className="shadow-lg border-muted">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
              <AvatarImage src={user.profileImage ?? undefined} alt={fullName} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <CardTitle className="text-3xl font-bold">{fullName.toUpperCase()}</CardTitle>
                {user.role === 'ADMIN' && (
                  <Badge variant="secondary" className="font-semibold">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    ADMIN
                  </Badge>
                )}
              </div>
              <CardDescription className="text-lg flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Información de la Cuenta
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span className="font-medium">Nombre:</span>
                  <span className="text-muted-foreground">{user.firstName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span className="font-medium">Apellido:</span>
                  <span className="text-muted-foreground">{user.lastName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">Miembro desde:</span>
                  <span className="text-muted-foreground">{joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Estadísticas de Compra
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
                    <ShoppingBag className="w-3 h-3" />
                    Pedidos
                  </div>
                  <div className="text-2xl font-bold">{user.totalOrders ?? 0}</div>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
                    <DollarSign className="w-3 h-3" />
                    Gastado
                  </div>
                  <div className="text-2xl font-bold">
                    ${(user.totalSpent ?? 0).toLocaleString('es-ES')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground italic">
              Última actualización: {new Date(user.updatedAt).toLocaleDateString('es-ES')}
            </div>
            <LogOutButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default UserProfile;
