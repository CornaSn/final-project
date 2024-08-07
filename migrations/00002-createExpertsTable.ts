import { Sql } from 'postgres';
import { z } from 'zod';

export const expertSchema = z.object({
  age: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
  pictureUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  travelBlogUrl: z.string().optional(),
  selectedItemsCountries: z.array(z.string()),
  selectedItemsLanguages: z.array(z.string()),
  selectedItemsExpertise: z.array(z.string()),
});

export type Expert = {
  id: number;
  age: string | null;
  city: string | null;
  bio: string | null;
  pictureUrl: string | null;
  videoUrl: string | null;
  travelBlogUrl: string | null;
  userId: number;
};

export type ExpertUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isExpert: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: number;
  age: string | null;
  city: string | null;
  bio: string | null;
  pictureUrl: string | null;
  videoUrl: string | null;
  travelBlogUrl: string | null;
};

export type ExpertUserWithChoices = {
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  city: string | null;
  age: string | null;
  countryName: string[] | null;
  countryId: number[] | null;
  languageName: string[] | null;
  expertiseName: string[] | null;
  expertiseId: number[] | null;
  expertId: number | null;
  pictureUrl: string | null;
  videoUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE experts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      age varchar(3),
      city varchar(20),
      bio varchar(1000),
      picture_url varchar(200),
      video_url varchar(200),
      travel_blog_url varchar(200),
      user_id integer NOT NULL UNIQUE REFERENCES users (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE experts`;
}
