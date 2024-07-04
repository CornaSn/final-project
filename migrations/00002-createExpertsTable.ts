import { Sql } from 'postgres';
import { z } from 'zod';

export const expertSchema = z.object({
  age: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
  pictureUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  travelBlogUrl: z.string().optional(),
});

export type Expert = {
  id: number | null;
  age: string | null;
  city: string | null;
  bio: string | null;
  pictureUrl: string | null;
  videoUrl: string | null;
  travelBlogUrl: string | null;
};

export type ExpertUser = {
  firstName: string;
  lastName: string;
  email: string;
  isExpert: boolean;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  id: number | null;
  age: string | null;
  city: string | null;
  bio: string | null;
  pictureUrl: string | null;
  videoUrl: string | null;
  travelBlogUrl: string | null;
  userId: number;
};
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE experts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      age varchar(3),
      city varchar(20),
      bio varchar(200),
      picture_url varchar(100),
      video_url varchar(100),
      travel_blog_url varchar(100),
      user_id integer REFERENCES users (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE experts`;
}
