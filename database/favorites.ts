import { cache } from 'react';
import { sql } from '../database/connect';
import { UserWithFavoriteExperts } from '../migrations/00017-createFavoritesTable.js';

export const insertFavoritesInsecure = cache(
  async (userId: number, expertUserId: number) => {
    const [userFavorites] = await sql<UserWithFavoriteExperts[]>`
      INSERT INTO
        favorites (user_id, expert_user_id)
      VALUES
        (
          ${userId},
          ${expertUserId}
        )
      RETURNING
        favorites.id,
        favorites.expert_user_id,
        favorites.user_id
    `;
    return userFavorites;
  },
);
