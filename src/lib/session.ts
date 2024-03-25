import Cookies from 'js-cookie';
import axios from 'axios';

export const isConnected = (): boolean => {
    const tokenExpirationDateTimeCookie = Cookies.get('x-auth-kwickbit-token-expiration-date');
    return tokenExpirationDateTimeCookie !== undefined && (new Date(tokenExpirationDateTimeCookie as string).getTime() - new Date().getTime() > 30000);
};

export const isRefreshTokenExpired = (): boolean => {
    const refreshTokenExpirationDateTimeCookie = Cookies.get('x-auth-kwickbit-refresh-token-expiration-date');
    return refreshTokenExpirationDateTimeCookie === undefined || new Date(refreshTokenExpirationDateTimeCookie as string) <= new Date();
};

export const refreshToken = async (): Promise<void> => {
    await axios.post(process.env.NEXT_PUBLIC_API_APP_URL + '/refresh-token', {}, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};