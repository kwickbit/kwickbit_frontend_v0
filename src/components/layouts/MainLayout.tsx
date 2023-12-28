import React from "react";
import MainHeader from "./MainHeader";
import { UserWebSocketProvider } from "@/hooks/useWebSocket";

const MainLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  return (
    <UserWebSocketProvider>
      <>
        <MainHeader />
        {children}
      </>
    </UserWebSocketProvider>
  );
};

export default MainLayout;
