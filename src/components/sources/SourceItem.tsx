/* eslint-disable @next/next/no-img-element */
import { SourceProps } from "@/services/sources";
import { ReactNode, SyntheticEvent } from "react";
import { BiPencil } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const stripWalletAddress = (address: string): string => {
  return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

interface Props {
  source: SourceProps;
  onSelect: (e: SyntheticEvent<HTMLInputElement, Event>, id: string) => void;
  isSelected?: boolean;
}

const SourceItem = ({ source, onSelect, isSelected }: Props): ReactNode => {
  const {
    id,
    walletName,
    walletAddress,
    importDate,
    importTime,
    lastUpdatedDate,
    lastUpdatedTime,
  } = source;

  return (
    <div className="grid grid-cols-6 items-center shadow p-6 rounded-lg border hover:border-[#39bff0] transition-all">
      <div className="col-span-1 flex items-center gap-8">
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(e): void => onSelect(e, id)}
          checked={isSelected}
        />
        <img
          src="/assets/stellar-logo.jpeg"
          alt="stellar"
          className="col-span-1 h-8 object-contain"
        />
      </div>

      <div className="col-span-1 flex justify-center">
        <span className="text-gray-400">{walletName}</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <span className="col-span-1 text-gray-400">
          {stripWalletAddress(walletAddress)}
        </span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center text-gray-400">
        <span>{importDate}</span>
        <span>{importTime}</span>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center text-gray-400">
        <span>{lastUpdatedDate}</span>
        <span>{lastUpdatedTime}</span>
      </div>
      <div className="col-span-1 flex gap-4 justify-center">
        <BiPencil className="w-6 h-6 cursor-pointer" />
        <CiSearch className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default SourceItem;
