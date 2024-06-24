import { Sql } from 'postgres';

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    passwordHash: 'e99a18c428cb38d5f260853678922e03',
    createdAt: '',
    updatedAt: '',
  },

  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    passwordHash: 'ab56b4d92b40713acc5af89985d4b786',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    passwordHash: '2c1743a391305fbf367df8e4f069f9f9',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    passwordHash: '45c48cce2e2d7fbdea1afc51c7c6ad26',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 5,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.w@example.com',
    passwordHash: 'd41d8cd98f00b204e9800998ecf8427e',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 6,
    firstName: 'David',
    lastName: 'Jones',
    email: 'david.j@example.com',
    passwordHash: 'a87ff679a2f3e71d9181a67b7542122c',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 7,
    firstName: 'Eva',
    lastName: 'Davis',
    email: 'eva.davis@example.com',
    passwordHash: 'c4ca4238a0b923820dcc509a6f75849b',
    createdAt: '',
    updatedAt: '',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          first_name,
          last_name,
          email,
          password_hash
        )
      VALUES
        (
          ${user.firstName},
          ${user.lastName},
          ${user.email},
          ${user.passwordHash}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
