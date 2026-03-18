'use client';
import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { components } from '@/lib/api/generated/schema';

type CategoryResponseDto = components['schemas']['CategoryResponseDto'];

interface FiltersMenuProps {
  categories: CategoryResponseDto[];
}

export function FiltersMenu({ categories }: FiltersMenuProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <FilterIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filtros</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Categorías</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            router.push(`/products?${params.toString()}`);
          }}
          className={!selectedCategory ? 'bg-accent' : ''}
        >
          Todas
        </DropdownMenuItem>
        {categories?.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('category', category.name);
              router.push(`/products?${params.toString()}`);
            }}
            className={selectedCategory === category.name ? 'bg-accent' : ''}
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function OrderByMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ChevronDownIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Ordenar por</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Orden</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('orderBy', 'price');
            router.push(`/products?${params.toString()}`);
          }}
        >
          Menor precio
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('orderBy', '-price');
            router.push(`/products?${params.toString()}`);
          }}
        >
          Mayor precio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
