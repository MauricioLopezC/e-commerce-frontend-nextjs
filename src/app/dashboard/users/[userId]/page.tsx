import React from 'react';
import { BreadcrumbUpdater } from '@/components/dashboard/BreadcrumbUpdater';

function UserPage() {
  return (
    <>
      <BreadcrumbUpdater
        items={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Usuarios', href: '/dashboard/users' },
          { name: 'Ver Usuario', href: '#' },
        ]}
      />
      <div>User</div>
    </>
  );
}

export default UserPage;
