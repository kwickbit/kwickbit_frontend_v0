import { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignupPage = (): ReactNode => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();
  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/signup',
        { username, password, email}, {
        headers: {
          'Content-Type': 'application/json'
        }
    });

    router.push('/login');
  };


  return (
      <div>
        <form onSubmit={handleLogin}>
            <label>
                Email:
                <input type="text" value={email} onChange={(e): void => setEmail(e.target.value)} />
            </label>
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
          <button type="submit">Signup with App</button>
        </form>
        <p>
          Have an account already? <Link href="/login">Go to Login</Link>
        </p>
      </div>
  );
};

export default SignupPage;

