import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { reportTypes } from "@/lib/report-types";

interface Props {
  pathname: string;
}

export const ReportsDropdown = ({ pathname }: Props): React.JSX.Element => {
  const [isReportsButtonHovered, setIsReportsButtonHovered] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const dropdownItemStyles = (index: number): string => classNames(
    "block w-full px-4 py-2 font-manrope text-base text-left text-[#9095A1] hover:bg-[#EFF6FB] bg-[#D7F0FB] border border-[#D7F0FB]",
    index === 0 ? "rounded-tr-lg" : "",
    index === reportTypes.length - 1 ? "rounded-b-lg" : "border-b-0"
  );

  return <div
    className="relative group"
    onMouseEnter={(): void => setIsReportsButtonHovered(true)}
    onMouseLeave={(): void => setIsReportsButtonHovered(false)}
    onClick={(): void => setIsReportsButtonHovered(false)}
  >
    <Link
      className={classNames(
        "relative cursor-pointer px-4 py-2 text-base text-[#9095A1] font-manrope font-bold transition-all duration-200 ease-in-out capitalize",
        isReportsButtonHovered ? "rounded-t-lg rounded-b-none" : "rounded-lg",
        pathname.startsWith("/reports") || isReportsButtonHovered
          ? "bg-[#D7F0FB] group-hover:text-[#565D6D]"
          : "bg-transparent"
      )}
      href="/reports"
    >
      Reports
    </Link>
    {(isReportsButtonHovered || isDropdownHovered) && (
      <div className="absolute left-0 top-full mt-[1px] w-[calc(100%+50%)] transition-all duration-200 ease-in-out">
        {reportTypes.map((report, index) => (
          <Link
            key={index}
            onMouseEnter={(): void => setIsDropdownHovered(true)}
            onMouseLeave={(): void => setIsDropdownHovered(false)}
            className={dropdownItemStyles(index)}
            href={report.link}
          >
            {report.title}
          </Link>
        ))}
      </div>
    )}
  </div>;
};
