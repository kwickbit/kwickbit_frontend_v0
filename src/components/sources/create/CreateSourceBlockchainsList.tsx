/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { SourceBlockchain } from "./CreateSourceModal";

interface Props {
  sourceBlockchains: SourceBlockchain[];
  onClickBlockchainItem: (blockchainId: string) => void;
}

const CreateSourceBlockchainLists = ({
  sourceBlockchains,
  onClickBlockchainItem,
}: Props): ReactNode => {
  return (
    <>
      {sourceBlockchains?.map((blockchain) => (
        <div
          key={blockchain.name}
          onClick={(): void => onClickBlockchainItem(blockchain.id)}
          className="w-[140px] shadow border rounded-md px-2 py-1 hover:border-[#39bff0] transition-all cursor-pointer"
        >
          <img
            src={blockchain.image}
            alt={blockchain.name}
            className="h-9 object-contain"
          />
          <h3 className="font-semibold text-center">{blockchain.name}</h3>
        </div>
      ))}
    </>
  );
};

export default CreateSourceBlockchainLists;
