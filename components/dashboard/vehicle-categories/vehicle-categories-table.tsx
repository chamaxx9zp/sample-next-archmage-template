'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { deleteVehicleCategory } from 'app/(dashboard)/dashboard/master-data/vehicle-categories/actions';
import { useRouter } from 'next/navigation';
import { SelectVehicleCategory } from '@/lib/models/vehicle-categories/vehicleCategoriesModel';
import Link from 'next/link';

export function VehicleCategoriesTable({
  categories,
  offset
}: {
  categories: SelectVehicleCategory[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Category ID</TableHead>
              <TableHead className="hidden md:table-cell">Category Name</TableHead>
              <TableHead className="hidden md:table-cell">Published</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <CategoryRow key={category.vehicle_category_id} category={category} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function CategoryRow({ category }: { category: SelectVehicleCategory }) {
  const categoryId = category.vehicle_category_id;
  const deleteCategoryWithId = deleteVehicleCategory.bind(null, categoryId);

  return (
    <TableRow>
      <Link href={`/dashboard/master-data/vehicle-categories/${categoryId}`}>
        <TableCell className="font-medium">{category.vehicle_category_id}</TableCell>
      </Link>
      <TableCell className="hidden md:table-cell">{category.vehicle_category_name}</TableCell>
      {/* <TableCell className="hidden md:table-cell">{category.visibility ? 'Available' : 'Unavailable'}</TableCell> */}
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteCategoryWithId}
        // disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
