'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteAccountButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    if (!window.confirm('Would you really like to delete your account?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/deleteAccount/`,

        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Error while deleting the account');
      }

      alert('Account was successfully deleted');
      // Redirect to homepage or login page after account deletion
      router.push('/');
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`btn btn-danger ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleDeleteAccount}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
}
