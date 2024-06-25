import React from 'react'
import { getProducts } from '@/lib/serverActions/products/actions';
import { Search } from '@/components/dashboard/products/search';
import { ProductTable } from '@/components/dashboard/products/products-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const page = async ({searchParams}: {searchParams: { q: string; offset: string };}) => {
    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { products, newOffset } = await getProducts(search, Number(offset));

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
                <Link className="ml-auto" href={'/dashboard/products/add'} >                <Button variant="outline">Add Product</Button>
                </Link>
            </div>
            <div className="w-full mb-4">
                <Search value={searchParams.q} />
            </div>
            <ProductTable products={products} offset={newOffset} />

        </main>)
}

export default page