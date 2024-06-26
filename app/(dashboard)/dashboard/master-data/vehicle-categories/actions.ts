'use server';

import {
  addVehicleCategory,
  getVehicleCategoryById,
  updateVehicleCategory,
  deleteVehicleCategoryById
} from '@/lib/serverActions/vehicle-categories/actions';

import { revalidatePath } from 'next/cache';

export async function deleteVehicleCategory(catId: number) {
  // Delete a vehicle category by ID
  await deleteVehicleCategoryById(catId);
  revalidatePath('/');
}

export async function addVehicleCategoryAction(values: any) {
  // Add a new vehicle category
  await addVehicleCategory(values);
}

export async function updateVehicleCategoryAction(values: any, id: string) {
  // Update an existing vehicle category by ID
  await updateVehicleCategory(values, id);
}

export async function fetchSingleVehicleCategoryById(id: string) {
  // Fetch a single vehicle category by ID
  return await getVehicleCategoryById(id);
}
