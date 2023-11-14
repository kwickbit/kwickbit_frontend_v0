import { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignupPage = (): ReactNode => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [address, setAddress] = useState('');

  const router = useRouter();
  const handleSignup = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const data = {username, password, email, givenName, familyName, address};

    await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
    });

    router.push('/login');
  };


  return (
      <div>
        <form onSubmit={handleSignup}>
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
          <label>
            Email:
            <input type="text" value={email} onChange={(e): void => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Given Name:
            <input type="text" value={givenName} onChange={(e): void => setGivenName(e.target.value)} />
          </label>
          <br />
          <label>
            Family Name:
            <input type="text" value={familyName} onChange={(e): void => setFamilyName(e.target.value)} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" value={address} onChange={(e): void => setAddress(e.target.value)} />
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

