import React, { useState, ReactNode, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {toast} from "react-toastify";

const ConfirmCodePage = (): ReactNode => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [shouldRequestNewConfirmationCode, setShouldRequestNewConfirmationCode] = useState(false);

  const router = useRouter();

  const username = router.query.username as string;

  const handleConfirmCode = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const data = { username, confirmationCode };

    const response = await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/confirm-code', data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false,
    });

    if (response.data.result === 'CODE_CONFIRMED_SUCCESSFULLY') {
        router.push('/login');
        toast.success('Code confirmed successfully. You can log in now.');
    } else if (response.data.errorCode === 'CodeMismatchException') {
        toast.error('Wrong confirmation code provided.');
    } else if (response.data.errorCode === 'ExpiredCodeException') {
        setShouldRequestNewConfirmationCode(true); // Show the button to request a new code
        toast.error('Confirmation code expired. Please request a new code.');
    } else {
        toast.error('An error occurred. Please try again.');
    }

  };

    const handleResendCode = async (): Promise<void> => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_APP_URL}/resend-code`, { username }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        });

        if (response.data.result === 'RESENT_CODE_SUCCESSFULLY') {
            toast.success(`A new confirmation code has been sent to ${response.data.deliveryDetails.destination}`);
            setShouldRequestNewConfirmationCode(false);
        } else if (response.data.errorCode) {
            toast.error('Failed to resend confirmation code. Please try again later.');
        }

    };

  return (
      <div>
        <form onSubmit={handleConfirmCode}>
          <label>
            Confirmation Code:
            <input type="text" key="confirmation_code" value={confirmationCode} onChange={(e): void => setConfirmationCode(e.target.value)} />
          </label>
          <br />
          <button type="submit">Confirm code</button>
        </form>
        {shouldRequestNewConfirmationCode && (
            <button onClick={handleResendCode}>Resend Confirmation Code</button>
        )}
      </div>
  );
};

export default ConfirmCodePage;

