import Link from "next/link"

const headerList = [
    {
        link: '#',
        title: 'Sources'
    },
    {
        link: '#',
        title: 'Transactions'
    },
    {
        link: '#',
        title: 'Integration'
    }
];

const MainHeader = ():JSX.Element => {

    return (
        <div className="z-50 my-[57px] container mx-auto">
            <div className="border-2 rounded-[20px] border-[#BDC1CA] relative flex items-center justify-between py-3 px-6">
                <div className="flex-1 flex items-center gap-5 xl:gap-7">
                    <Link
                        href="/"
                        passHref
                        className="flex-shrink-0 flex items-center"
                    >
                        <img 
                            src="/assets/logo.svg" 
                            className="w-[158px] h-[24px]"
                            alt="logo" 
                        />
                    </Link>
                    <div className="hidden lg:flex items-center gap-5 xl:gap-7">
                    { headerList.map((item, idx) => (
                        <Link
                            key={`hnv-${idx}`}
                            className="cursor-pointer px-4 py-2 text-[16px] leading-[26px] font-bold text-[#9095A1] hover:text-[#565D6D] font-manrope bg-transparent hover:bg-[#D7F0FB] rounded-lg transition-all duration-200 ease-in-out relative capitalize "
                            href={item.link}
                        >
                            { item.title }
                        </Link>

                    ))}

                    </div>
                </div>
                <div className="hidden lg:flex items-center">
                    <button className="uppercase bg-[#3ABDED] hover:bg-[#2177A8] hover:text-[#9095A1] text-[16px] leading-[26px] text-[#565D6D] font-bold px-[20px] py-[7px] rounded-[6px] shadow-sm">
                        log out
                    </button>
                </div>            
            </div>
        </div>

    )
}

export default MainHeader;