import React from "react";
import MainHeader from "./MainHeader";
import { UserWebSocketProvider } from "@/hooks/useWebSocket";
import { QuickBooksDataProvider } from "@/hooks/useQuickBooksDataProvider";
import { TokenMappingDataProvider } from "@/hooks/useTokenMappingsDataProvider";

const MainLayout = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element => {
  return (
    <UserWebSocketProvider>
        <TokenMappingDataProvider>
            <QuickBooksDataProvider>
                <>
                    <MainHeader />
                    {children}
                </>
            </QuickBooksDataProvider>
        </TokenMappingDataProvider>
    </UserWebSocketProvider>
  );
};

export default MainLayout;
