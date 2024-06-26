import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AddEditProductForm from '@/components/dashboard/products/add-product/form';
import { fetchSingleProductById } from '../actions';

// export const generateMetadata = async ({ params }: any) => {
//     const { id } = params;
//     const prods = await fetchSingleProductById(id);

//     return prods
// };

const page = async ({ params }: any) => {

    const { id } = params;
    const res = await fetchSingleProductById(id)

    const product = res.data.product[0]

    // const product = {
    //     name: "TEST PROD",
    //     price: "499.99",
    //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // }

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Update Product</h1>
                <Link className="ml-auto" href={'/dashboard/products'} > 
                    <Button variant="outline">Back</Button>
                </Link>
            </div>
            <AddEditProductForm edit={true} name={product.name} price={product.price.toString()} image={product.image} id={params.id} />

        </main>
    )
}

export default page