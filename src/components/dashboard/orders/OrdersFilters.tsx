'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OrdersFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const [status, setStatus] = useState<string>(params.get('status') ?? 'ALL');

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newStatus === 'ALL'
        ? newParams.delete('status')
        : newParams.set('status', newStatus);
      router.push(`/dashboard/orders?${newParams.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    handleStatusChange(status);
  }, [status, handleStatusChange]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filtros</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Estado</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="ALL">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="IN_PROGRESS">
            En progreso
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="COMPLETED">
            Completado
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="CANCELLED">
            Cancelado
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrdersFilters;
