import { Sql } from 'postgres';
import { Expert } from './00002-createExpertTable';

const experts: Expert[] = [
  {
    id: 1,
    age: '30',
    city: 'Vienna',
    bio: 'Here comes the text',
    pictureUrl:
      'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325936/person_nmil9z.jpg',
    videoUrl:
      'https://res.cloudinary.com/dmntpv6mf/video/upload/v1719325114/samples/elephants.mp4',
    travelBlogUrl: '',
  },

  {
    id: 2,
    age: '25',
    city: 'New York',
    bio: 'Another Bio text should be here - up to 200 characters',
    pictureUrl:
      'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325124/samples/smile.jpg',
    videoUrl:
      'https://res.cloudinary.com/dmntpv6mf/video/upload/v1719325112/samples/sea-turtle.mp4',
    travelBlogUrl: '',
  },
  {
    id: 3,
    age: '42',
    city: 'Salzburg',
    bio: 'Another Bio text should be here - up to 200 characters',
    pictureUrl:
      'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325124/samples/smile.jpg',
    videoUrl:
      'https://res.cloudinary.com/dmntpv6mf/video/upload/v1719325112/samples/sea-turtle.mp4',
    travelBlogUrl: '',
  },
  {
    id: 4,
    age: '37',
    city: 'Vienna',
    bio: 'Another Bio text should be here - up to 200 characters',
    pictureUrl:
      'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325124/samples/smile.jpg',
    videoUrl:
      'https://res.cloudinary.com/dmntpv6mf/video/upload/v1719325112/samples/sea-turtle.mp4',
    travelBlogUrl: '',
  },
  {
    id: 5,
    age: '24',
    city: 'St. Poelten',
    bio: 'Another Bio text should be here - up to 200 characters',
    pictureUrl:
      'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325124/samples/smile.jpg',
    videoUrl:
      'https://res.cloudinary.com/dmntpv6mf/video/upload/v1719325112/samples/sea-turtle.mp4',
    travelBlogUrl: '',
  },
];

export async function up(sql: Sql) {
  for (const expert of experts) {
    await sql`
      INSERT INTO
        experts (
          age,
          city,
          bio,
          picture_url,
          video_url,
          travel_blog_url
        )
      VALUES
        (
          ${expert.age},
          ${expert.city},
          ${expert.bio},
          ${expert.pictureUrl},
          ${expert.videoUrl},
          ${expert.travelBlogUrl}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const expert of experts) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${expert.id}
    `;
  }
}
