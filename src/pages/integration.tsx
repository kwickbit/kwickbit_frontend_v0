import Integration from "@/components/integration";
import MainLayout from "@/components/layouts/MainLayout";
import React, { ReactNode } from "react";

const IntegrationsPage = (): ReactNode => {
  return <Integration />;
};

IntegrationsPage.Layout = MainLayout;

export default IntegrationsPage;
