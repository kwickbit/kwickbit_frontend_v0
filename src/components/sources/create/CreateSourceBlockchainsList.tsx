import { ReactNode } from "react";
import { SourceBlockchain } from "./CreateSourceModal";
import Image from "next/image";

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
          onClick={(): void => onClickBlockchainItem(blockchain.chain)}
          className="w-[140px] shadow border rounded-md px-2 py-1 hover:border-[#39bff0] transition-all cursor-pointer"
        >
          <Image
            src={blockchain.image}
            alt={blockchain.name}
            className="h-9 object-contain"
            width={90}
            height={40}
            style={{ width: '100%', height: 'auto' }}
            priority={true}
          />
          <h3 className="font-semibold text-center">{blockchain.name}</h3>
        </div>
      ))}
    </>
  );
};

export default CreateSourceBlockchainLists;
