import React from 'react'
import { Search } from '@/components/dashboard/products/search';
import { VehicleCategoriesTable } from '@/components/dashboard/vehicle-categories/vehicle-categories-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getVehicleCategories } from '@/lib/serverActions/vehicle-categories/actions';

const page = async ({searchParams}: {searchParams: { q: string; offset: string };}) => {
    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { categories, newOffset } = await getVehicleCategories(search, Number(offset));

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Vehicle Categories</h1>
                <Link className="ml-auto" href={'/dashboard/master-data/vehicle-categories/add'}>
                    <Button variant="outline">Add New</Button>
                </Link>
            </div>
            <div className="w-full mb-4">
                <Search value={searchParams.q}/>
            </div>
            <VehicleCategoriesTable categories={categories} offset={newOffset} />

        </main>)
}

export default page