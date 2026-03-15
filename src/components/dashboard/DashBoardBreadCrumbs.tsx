'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadCrumbsStore } from '@/store/dashboard-store';

function DashBoardBreadCrumbs() {
  const pages = useBreadCrumbsStore((state) => state.pages);
  if (!pages)
    return <h1 className="font-bold text-lg text-black">Dashboard</h1>;

  return (
    <Breadcrumb className="ml-8 lg:ml-16">
      <BreadcrumbList>
        {pages.map((page, idx) => {
          const isLast = idx === pages.length - 1;
          return (
            <React.Fragment key={page.href || idx}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{page.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={page.href}>{page.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DashBoardBreadCrumbs;
