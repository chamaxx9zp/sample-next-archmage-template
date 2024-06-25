import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddEditVehicleCategoryForm from '@/components/dashboard/vehicle-categories/add-product/form';

const page = () => {
    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Add Product</h1>
                <Link className="ml-auto" href={'/dashboard/master-data/vehicle-categories'} > <Button variant="outline">Back</Button>
                </Link>
            </div>
            <AddEditVehicleCategoryForm edit={false} />

        </main>)

}

export default page