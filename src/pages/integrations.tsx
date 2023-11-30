import IntegrationsView from "../components/integrations/IntegrationsView";
import MainLayout from "@/components/layouts/MainLayout";
import React, { ReactNode } from "react";

const IntegrationsPage = (): ReactNode => {
  return <IntegrationsView />;
};

IntegrationsPage.Layout = MainLayout;

export default IntegrationsPage;
