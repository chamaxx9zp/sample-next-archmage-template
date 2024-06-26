import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddEditVehicleCategoryForm from '@/components/dashboard/vehicle-categories/add-product/form';
import { fetchSingleVehicleCategoryById } from '../actions';

const page = async ({ params }: any) => {
    const { id } = params;
    const res = await fetchSingleVehicleCategoryById(id);

    const vehicleCategory = res.data.category[0];

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Update Vehicle Category</h1>
                <Link className="ml-auto" href={'/dashboard/master-data/vehicle-categories'}> 
                    <Button variant="outline">Back</Button>
                </Link>
            </div>
            <AddEditVehicleCategoryForm
                edit={true}
                name={vehicleCategory.vehicle_category_name}
                image={vehicleCategory.image}
                content={vehicleCategory.content}
                slug={vehicleCategory.slug}
                id={params.id}
            />
        </main>
    );
};

export default page;
