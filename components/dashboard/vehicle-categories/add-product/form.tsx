"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addVehicleCategoryAction, updateVehicleCategoryAction } from 'app/(dashboard)/dashboard/master-data/vehicle-categories/actions'

interface VehicleCategoryFormProps {
    id?: string,
    name?: string,
    image?: string,
    content?: string,
    slug?: string,
    edit: boolean
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    image: z.string().url({
        message: "Image must be a valid URL.",
    }),
    content: z.string().optional(),
    slug: z.string().min(2, {
        message: "Slug must be at least 2 characters.",
    }),
    visibility: z.boolean()
})

const AddEditVehicleCategoryForm: React.FC<VehicleCategoryFormProps> = ({ id, name, image, content, slug, edit }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: edit ? name : "",
            image: edit ? image : "",
            content: edit ? content : "",
            slug: edit ? slug : "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (edit) {
            id && await updateVehicleCategoryAction(values, id)
        } else {
            await addVehicleCategoryAction(values)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehicle Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Vehicle Category Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the name of the vehicle category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Image URL" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the URL of the vehicle category image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input placeholder="Content" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the content of the vehicle category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="Slug" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the slug for the vehicle category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               
                <Button type="submit">{edit ? "Update" : "Add"}</Button>
            </form>
        </Form>
    )
}

export default AddEditVehicleCategoryForm
