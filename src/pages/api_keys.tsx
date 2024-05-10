import { APIKeysView } from "@/components/api_keys/APIKeysView";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head"

const APIKeysPage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>API Keys</title>
      </Head>
      <APIKeysView />
    </>
  );
};

APIKeysPage.Layout = MainLayout;

export default APIKeysPage;
