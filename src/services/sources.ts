export interface SourceProps {
  id: string;
  walletName: string;
  walletAddress: string;
  importDate: string;
  importTime: string;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
}

const sources: SourceProps[] = [
  {
    id: "1",
    walletName: "Wallet 1",
    walletAddress: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
    importDate: "Oct 15, 2023",
    importTime: "12:25 PM",
    lastUpdatedDate: "Oct 15, 2023",
    lastUpdatedTime: "12:25 PM",
  },
  {
    id: "2",
    walletName: "Wallet 2",
    walletAddress: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
    importDate: "Oct 15, 2023",
    importTime: "12:25 PM",
    lastUpdatedDate: "Oct 15, 2023",
    lastUpdatedTime: "12:25 PM",
  },
  {
    id: "3",
    walletName: "Wallet 3",
    walletAddress: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
    importDate: "Oct 15, 2023",
    importTime: "12:25 PM",
    lastUpdatedDate: "Oct 15, 2023",
    lastUpdatedTime: "12:25 PM",
  },
  {
    id: "4",
    walletName: "Wallet 4",
    walletAddress: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
    importDate: "Oct 15, 2023",
    importTime: "12:25 PM",
    lastUpdatedDate: "Oct 15, 2023",
    lastUpdatedTime: "12:25 PM",
  },
];

export const fetchSources = async (): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { data: sources };
};
