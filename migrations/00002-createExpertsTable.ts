import { Sql } from 'postgres';

export type Expert = {
  id: number | null;
  age: string | null;
  city: string | null;
  bio: string | null;
  pictureUrl: string | null;
  videoUrl: string | null;
  travelBlogUrl: string | null;
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
