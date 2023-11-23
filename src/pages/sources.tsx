import { ReactNode } from "react";
import Head from "next/head";
import SourcesView from "@/components/sources/SourcesView";
import MainLayout from "@/components/layouts/MainLayout";

const SourcesPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Sources</title>
      </Head>
      <SourcesView />
    </>
  );
};

SourcesPage.Layout = MainLayout;

export default SourcesPage;
