import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode  {
    return <Component {...pageProps} />;
}

export default MyApp;
