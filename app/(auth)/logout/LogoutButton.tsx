'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <button
        formAction={async () => {
          await logout();
          router.push('/');
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
