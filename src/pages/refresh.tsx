import { FormEvent, ReactNode } from 'react';
import { apiClient } from '@/lib/api-client';



const RefreshPage = (): ReactNode => {
    const handleRefresh = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        await apiClient.post('/refresh-token', {});
    };

    return (
        <div>
            <form onSubmit={handleRefresh}>
                <br />
                <button type="submit">Refresh Token</button>
            </form>
            <br />
        </div>
    );
};

export default RefreshPage;