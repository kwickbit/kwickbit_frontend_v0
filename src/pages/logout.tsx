import { ReactNode, FormEvent } from 'react';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/router';

const LogoutPage = (): ReactNode => {
  const router = useRouter();

  const handleLogout = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await apiClient.post('/logout', {});

    router.push('/login' as string);
  };

  return (
      <div>
        <form onSubmit={handleLogout}>
          <button type="submit">Logout from App</button>
        </form>
        <br />
      </div>
  );
};

export default LogoutPage;

