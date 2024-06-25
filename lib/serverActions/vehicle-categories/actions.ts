import { vehicleCategories } from '@/lib/models/vehicle-categories/vehicleCategoriesModel';
import { eq, ilike, sql } from 'drizzle-orm';
import { db } from '@/lib/db';

import { SelectVehicleCategory } from '@/lib/models/vehicle-categories/vehicleCategoriesModel';

export async function getVehicleCategories(
  search: string,
  offset: number
): Promise<{
  categories: SelectVehicleCategory[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      categories: await db
        .select()
        .from(vehicleCategories)
        .where(ilike(vehicleCategories.vehicle_category_name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { categories: [], newOffset: null };
  }

  const moreCategories = await db.select().from(vehicleCategories).limit(20).offset(offset);
  const newOffset = moreCategories.length >= 20 ? offset + 20 : null;
  return { categories: moreCategories, newOffset };
}

export async function getVehicleCategoryById(id: string) {
  try {
    const category = await db
      .select()
      .from(vehicleCategories)
      .where(eq(vehicleCategories.vehicle_category_id, Number(id)));

    return {
      error: false,
      message: 'Category fetched successfully',
      data: {
        category
      }
    };
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function addVehicleCategory(category: any) {
    try {
      const data = {
        vehicle_category_name: category.vehicle_category_name,
        image: category.image,
        content: category.content,
        slug: category.slug,
        visibility: category.visibility,
        created_by: category.created_by,
        updated_by: category.updated_by,
      };
      await db.insert(vehicleCategories).values(data);
      return true;
    } catch (error) {
      console.log({ error });
      throw error;
    }
}
  
export async function updateVehicleCategory(category: any, id: string) {
    try {
      const data = {
        name: category.name,
        image: category.image,
        content: category.content,
        slug: category.slug,
        visibility: category.visibility,
        updated_by: category.updated_by
      };
      console.log({ id, data });
  
      const vehicleCategory = await db
        .select()
        .from(vehicleCategories)
        .where(eq(vehicleCategories.vehicle_category_id, Number(id)));
  
      console.log({ vehicleCategory });
      if (vehicleCategory.length == 0) {
        return {
          error: true,
          message: 'Vehicle category not found'
        };
      }
      await db
        .update(vehicleCategories)
        .set(data)
        .where(sql`${vehicleCategories.vehicle_category_id} = ${id} `);
  
      return true;
    } catch (error) {
      console.log({ error });
      throw error;
    }
}

export async function deleteVehicleCategoryById(id: number) {
    await db.delete(vehicleCategories).where(eq(vehicleCategories.vehicle_category_id, id));
}
  
