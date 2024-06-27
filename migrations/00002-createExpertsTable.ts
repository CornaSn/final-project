import { Sql } from 'postgres';

export type Expert = {
  id: number;
  age: string;
  city: string;
  bio: string;
  pictureUrl: string;
  videoUrl: string | null;
  travelBlogUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE experts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      age varchar(3) NOT NULL,
      city varchar(20) NOT NULL,
      bio varchar(200) NOT NULL,
      picture_url varchar(100) NOT NULL,
      video_url varchar(100),
      travel_blog_url varchar(100)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE experts`;
}
