import Image from "next/image";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props): JSX.Element => {
  return (
    <Image
      src="/assets/logo.svg"
      alt="logo"
      className={className}
      width={300}
      height={100}
    />
  );
};

export default Logo;
