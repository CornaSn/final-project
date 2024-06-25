import { getUsersInsecure } from '../../database/users';

export const metadata = {
  title: 'All_users',
  description: 'users',
};

export default async function Users() {
  const users = await getUsersInsecure();

  console.log(users);

  return (
    <div className="card m-4 w-80 shadow">
      <figure>
        <img src="https://picsum.photos/id/103/500/250" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Users</h2>
        <div>
          {users.map((user) => (
            <a key={`users-${user.id}`}>
              {user.firstName} {user.lastName}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
