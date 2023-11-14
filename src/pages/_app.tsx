import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { isConnected, isRefreshTokenExpired, refreshToken } from '@/lib/session';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode  {
    const { route, replace } = useRouter();

    React.useEffect(() => {
        // List of routes that must be excluded from the authentication check
        const nonAuthExclusiveRoutes = ['/login', '/signup'];
        const authExcludedRoutes = [...nonAuthExclusiveRoutes, '/change-password', '/confirm-code'];

        if (!authExcludedRoutes.includes(route) && !isConnected() && !isRefreshTokenExpired()) refreshToken();
        else if (!authExcludedRoutes.includes(route) && !isConnected() && isRefreshTokenExpired()) {
            replace(`/login?redirect=${route}`);
        } else if (nonAuthExclusiveRoutes.includes(route) && isConnected()) replace('/');
    }, [route, replace]);

    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    );
}

export default MyApp;
