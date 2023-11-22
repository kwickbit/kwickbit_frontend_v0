import {FormEvent, ReactNode} from 'react';
import { apiClient } from '@/lib/api-client';
import MainLayout from '@/components/layouts/MainLayout';


const HelloWorldPage = (): ReactNode => {
    const requestHelloWorld = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        await apiClient.post(process.env.NEXT_PUBLIC_API_APP_URL + '/hello', {name: 'Charles'});
    };

    return (
        <div>
            <form onSubmit={requestHelloWorld}>
                <br />
                <button type="submit">Hello World</button>
            </form>
        </div>
    );
};

HelloWorldPage.Layout = MainLayout;
export default HelloWorldPage;