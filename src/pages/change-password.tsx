import React, { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const toCamelCase = (str: string): string => {
  return str
      .split('_')
      .map((word, index) => {
        // If it's the first word, return it as is. Otherwise, capitalize the first letter.
        return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
      })
      .join('');
};

const ChangePasswordPage = (): ReactNode => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [preferredUsername, setPreferredUsername] = useState('');
  const [address, setAddress] = useState('');

  const router = useRouter();

  const attributeFields: {[key: string]: React.JSX.Element } = {
    'family_name': (
        <label>
          Family Name:
          <input type="text" value={familyName} onChange={(e): void => setFamilyName(e.target.value)} />
        </label>
    ),
    'given_name': (
        <label>
          Given Name:
          <input type="text" value={givenName} onChange={(e): void => setGivenName(e.target.value)} />
        </label>
    ),
    'preferred_username': (
        <label>
          Preferred Username:
          <input type="text" value={preferredUsername} onChange={(e): void => setPreferredUsername(e.target.value)} />
        </label>
    ),
    'address': (
        <label>
          Address:
          <input type="text" value={address} onChange={(e): void => setAddress(e.target.value)} />
        </label>
    ),
    'email': (
        <label>
          Email:
          <input type="text" value={email} onChange={(e): void => setEmail(e.target.value)} />
        </label>
    ),
  };

  const requiredAttributes = (router.query.requiredAttributes as string | undefined)?.split(',') || [];
  const username = router.query.username as string;

  const handleChangePassword = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const formAttributes: {[key: string]: string} = {email, givenName, familyName, preferredUsername, address};
    const userAttributes: { [key: string]: any } = {};

    requiredAttributes.forEach(attr => {
      const key = toCamelCase(attr.replace('userAttributes.', ''));
      if (formAttributes[key]) {
        userAttributes[attr] = formAttributes[key];
      }
    });

    const data = {username, newPassword, userAttributes};

    await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/change-password', data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
    });

    router.push('/');
  };

  return (
      <div>
        <form onSubmit={handleChangePassword}>
          <label>
            New Password:
            <input type="password" key="new_password" value={newPassword} onChange={(e): void => setNewPassword(e.target.value)} />
          </label>
          <br />

          {requiredAttributes.map(attr => {
            // Remove 'userAttributes.' prefix and render the corresponding field
            const key = attr.replace('userAttributes.', '');
            return <React.Fragment key={key}>{attributeFields[key]}</React.Fragment> || null;
          })}

          <br />
          <button type="submit">Change password within App</button>
        </form>
      </div>
  );
};

export default ChangePasswordPage;

