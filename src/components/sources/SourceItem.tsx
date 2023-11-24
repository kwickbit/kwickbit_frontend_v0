/* eslint-disable @next/next/no-img-element */
import { SourceWallet } from "@/services/sources";
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
    <div className="grid grid-cols-6 items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
      <div className="col-span-1 flex items-center gap-8">
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(e): void => onSelect(e, walletId)}
          checked={isSelected}
        />
        <img
          src="/assets/stellar-logo.jpeg"
          alt="stellar"
          className="col-span-1 h-8 object-contain"
        />
      </div>

      <div className="col-span-1 flex justify-center">
        <span className="text-gray-400">{name}</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span className="col-span-1 text-gray-400">
          {stripWalletAddress(address)}
        </span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center text-gray-400">
        <span>Oct 15, 2023</span>
        <span>6:15 PM</span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center text-gray-400">
        <span>Oct 15, 2023</span>
        <span>6:15 PM</span>
      </div>
      <div className="col-span-1 flex gap-4 justify-center">
        <BiPencil className="w-6 h-6 cursor-pointer" />
        <CiSearch className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default SourceItem;
