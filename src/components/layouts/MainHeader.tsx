import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import Logo from "../Logo";
import useLogout from "@/hooks/useLogout";
import useMounted from "@/hooks/useMounted";

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
    link: "/integrations",
    title: "Integrations",
  },
];

const MainHeader = (): JSX.Element | null => {
  const router = useRouter();
  const pathname = router.pathname;

  const mounted = useMounted();
  const { handleLogout, logout } = useLogout();

  if (!mounted) return null;

  return (
    <div className="z-50 my-14 container mx-auto max-w-7xl px-4">
      <div className="border-2 rounded-[20px] border-[#BDC1CA] bg-white relative flex items-center justify-between py-3 px-6">
        <div className="flex-1 flex items-center gap-5 xl:gap-7">
          <Link href="/" passHref className="flex-shrink-0 flex items-center">
            <Logo className="w-[158px] h-[24px]" />
          </Link>
          <div className="flex items-center gap-5 xl:gap-7">
            {headerList.map((item, idx) => (
              <Link
                key={`hnv-${idx}`}
                className={classNames(
                  "cursor-pointer px-4 py-2 text-base font-bold text-[#9095A1] hover:text-[#565D6D] font-manrope hover:bg-[#D7F0FB] rounded-lg transition-all duration-200 ease-in-out relative capitalize ",
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
          <button
            onClick={handleLogout}
            className={classNames(
              "uppercase bg-[#39BFF0] text-base text-[#565D6D] font-bold px-5 py-2 rounded-md shadow-sm transition-all duration-200 ease-in-out hover:scale-95",
              logout.isPending && "cursor-not-allowed opacity-50"
            )}
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
