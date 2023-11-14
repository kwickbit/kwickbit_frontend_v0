import { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {toast} from "react-toastify";

const LoginPage = (): ReactNode => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const response = await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/login',
        { username, password}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
    });

    const redirectURL = router.query.redirect || '/';

    if (response.data['result'] === 'NEW_PASSWORD_REQUIRED') {
        const requiredAttributes = response.data?.requiredAttributes as string[] || [];
        router.push(`/change-password?username=${username}&requiredAttributes=${requiredAttributes.join(',')}&redirect=${redirectURL}`);
        toast.info('You must change your password before being logged in.');
    }
    else if (response.data['result'] === 'CONFIRMATION_CODE_REQUIRED') {
        router.push(`/confirm-code?username=${response.data.otherAttributes.username}`);
        toast.info('You must confirm code sent to you by email first. Please confirm code.');
    }
    else if (response.data['result'] === 'LOGIN_SUCCESSFUL') {
        router.push(redirectURL as string);
        toast.info('Successfully logged in');
    }
    else {
        toast.error('Could not change password. Please try to login again');
        return new Promise(() => {});
    }

  };

  const testHelloWorld2 = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
      await axios.get(process.env.NEXT_PUBLIC_API_APP_URL + '/hello2');
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


          <form onSubmit={testHelloWorld2}>

              <button type="submit">Test hello world 2</button>
          </form>
      </div>
  );
};

export default LoginPage;

