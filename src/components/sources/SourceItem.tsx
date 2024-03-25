import { SourceWallet } from "@/services/sources";
import Image from "next/image";
import { ReactNode, SyntheticEvent } from "react";
import { BiPencil } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const stripWalletAddress = (address: string): string => {
  if (!address) return "";
  if (address.length < 7) return address;
  return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

interface Props {
  source: SourceWallet;
  onSelect: (e: SyntheticEvent<HTMLInputElement, Event>, id: string) => void;
  isSelected?: boolean;
}

const SourceItem = ({ source, onSelect, isSelected }: Props): ReactNode => {
  const { walletId, address, name } = source;
  return (
    <div className="grid grid-cols-6 bg-white text-[#BDC1CA] font-bold items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
      <div className="col-span-1 flex items-center gap-8">
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(e): void => onSelect(e, walletId)}
          checked={isSelected}
        />
        <Image
          src="/assets/stellar-logo.jpeg"
          alt="stellar"
          className="col-span-1 h-8 object-contain"
          width={90}
          height={45}
          style={{ width: "70%", height: "auto" }}
          priority={true}
        />
      </div>

      <div className="col-span-1 flex justify-center">
        <span className="">{name}</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span className="col-span-1 ">{stripWalletAddress(address)}</span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center ">
        <span>Oct 15, 2023</span>
        <span>6:15 PM</span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center ">
        <span>Oct 15, 2023</span>
        <span>6:15 PM</span>
      </div>
      <div className="col-span-1 flex gap-4 justify-center">
        <BiPencil className="w-6 h-6 cursor-pointer text-neutral-900" />
        <CiSearch className="w-6 h-6 cursor-pointer text-neutral-900" />
      </div>
    </div>
  );
};

export default SourceItem;
