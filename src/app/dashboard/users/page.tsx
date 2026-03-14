import UsersTable from '@/components/dashboard/users/UsersTable';
import { PaginationWithLinks } from '@/components/ui/paginations-with-links';
import { getUsers } from '@/lib/actions/user.actions';
import { parseQueryNumber } from '@/lib/parse-query';

async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  const pageSize = parseQueryNumber(filters.limit, 10);
  const currentPage = parseQueryNumber(filters.page, 1);

  const { data: usersData } = await getUsers({
    page: currentPage,
    limit: pageSize,
  });
  if (!usersData) return null;

  return (
    <section className="container mx-auto px-4 mt-4 mb-16">
      <UsersTable usersData={usersData} />
      <div className="mt-4 mb-16">
        <PaginationWithLinks
          page={currentPage}
          pageSize={pageSize}
          totalCount={usersData.metadata._count}
        />
      </div>
    </section>
  );
}

export default UsersPage;
