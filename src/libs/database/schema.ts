import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const countries = pgTable(
  'countries',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
  },
  (countries) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(countries.name),
    };
  },
);

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
});

export const testimonial = pgTable('testimonials', {
  id: serial('id'),
  name: varchar('name', { length: 256 }),
  title: varchar('title', { length: 256 }),
  quote: text('quote'),
  imageSrc: text('image_src'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const todo = pgTable('todo', {
  id: serial('id'),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
