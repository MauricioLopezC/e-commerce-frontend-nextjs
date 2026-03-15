'use client';

import { useEffect } from 'react';
import { useBreadCrumbsStore } from '@/store/dashboard-store';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbUpdaterProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbUpdater({ items }: BreadcrumbUpdaterProps) {
  useEffect(() => {
    useBreadCrumbsStore.getState().updatePages(items);
  }, [items]);

  return null;
}
