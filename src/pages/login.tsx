import { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginPage = (): ReactNode => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/login',
        { username, password}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
    });

    const redirectURL = router.query.redirect || '/';
    router.push(redirectURL as string);
  };

  return (
      <div>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e): void => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e): void => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login with App</button>
        </form>
        <p>
            {"Don't have an account?"} <Link href="/signup">Go to Signup</Link>
        </p>
      </div>
  );
};

export default LoginPage;

