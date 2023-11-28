/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import MainHeader from "./MainHeader";
import { useUserWebSocket } from "@/hooks/useWebSocket";

const MainLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const sockets = useUserWebSocket();

  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};

export default MainLayout;
