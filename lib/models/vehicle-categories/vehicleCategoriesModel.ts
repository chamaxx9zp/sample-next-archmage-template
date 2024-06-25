import {
    pgTable,
    boolean,
    serial,
    varchar,
    timestamp,
    text
  } from 'drizzle-orm/pg-core';
  
  export type SelectVehicleCategory = typeof vehicleCategories.$inferSelect;
  
  export const vehicleCategories = pgTable('vehicle_categories', {
    vehicle_category_id: serial('vehicle_category_id').primaryKey(),
    vehicle_category_name: varchar('vehicle_category_name', { length: 60 }).notNull(),
    image: varchar('image', { length: 500 }).notNull(),
    content: text('content').notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    visibility: boolean('visibility').notNull().default(true),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    created_by: varchar('created_by', { length: 100 }).notNull(),
    updated_by: varchar('updated_by', { length: 100 }).notNull()
  });
  