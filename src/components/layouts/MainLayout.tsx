import React from "react";
import MainHeader from "./MainHeader";
import { UserWebSocketProvider } from "@/hooks/useWebSocket";
import {QuickBooksDataProvider} from "@/hooks/useQuickBooksDataProvider";

const MainLayout = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element => {
  return (
    <UserWebSocketProvider>
        <QuickBooksDataProvider>
            <>
                <MainHeader />
                {children}
            </>
        </QuickBooksDataProvider>
    </UserWebSocketProvider>
  );
};

export default MainLayout;
