/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";

const headerList = [
  {
    link: "/sources",
    title: "Sources",
  },
  {
    link: "/transactions",
    title: "Transactions",
  },
  {
    link: "/integration",
    title: "Integration",
  },
];

const MainHeader = (): JSX.Element => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <div className="z-50 my-[57px] container mx-auto">
      <div className="border-2 rounded-[20px] border-[#BDC1CA] relative flex items-center justify-between py-3 px-6">
        <div className="flex-1 flex items-center gap-5 xl:gap-7">
          <Link href="/" passHref className="flex-shrink-0 flex items-center">
            <img
              src="/assets/logo.svg"
              className="w-[158px] h-[24px]"
              alt="logo"
            />
          </Link>
          <div className="flex items-center gap-5 xl:gap-7">
            {headerList.map((item, idx) => (
              <Link
                key={`hnv-${idx}`}
                className={classNames(
                  "cursor-pointer px-4 py-2 text-[16px] leading-[26px] font-bold text-[#9095A1] hover:text-[#565D6D] font-manrope hover:bg-[#D7F0FB] rounded-lg transition-all duration-200 ease-in-out relative capitalize ",
                  pathname === item.link ? "bg-[#D7F0FB]" : "bg-transparent"
                )}
                href={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <button className="uppercase bg-[#39BFF0] text-[16px] leading-[26px] text-[#565D6D] font-bold px-[20px] py-[7px] rounded-[6px] shadow-sm transition-all duration-200 ease-in-out hover:scale-95">
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
