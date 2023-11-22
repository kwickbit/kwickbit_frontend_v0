import React from 'react';
import MainHeader from './MainHeader';

const MainLayout = ({children}: {
    children: JSX.Element | JSX.Element[]
}):JSX.Element => {

    return (
        <>
            <MainHeader />
            { children }
        </>
    )
} 

export default MainLayout;