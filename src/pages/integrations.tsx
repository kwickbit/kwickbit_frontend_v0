import MainLayout from "@/components/layouts/MainLayout";
import React, { ReactNode } from "react";
import QuickBooksIntegrationCard from "@/components/integrations/quickbooks/QuickBooksIntegrationCard";

const IntegrationsPage = (): ReactNode => {
  return (
    <div className="max-w-7xl mx-auto overflow-x-auto mt-12 px-4 pb-12">
      <h1>Integrations</h1>
      <div className="mt-8">
        <QuickBooksIntegrationCard/>
      </div>
    </div>
  );
};

IntegrationsPage.Layout = MainLayout;

export default IntegrationsPage;
