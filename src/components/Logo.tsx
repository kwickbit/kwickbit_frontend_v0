/* eslint-disable @next/next/no-img-element */

interface Props {
  className?: string;
}

const Logo = ({ className }: Props): JSX.Element => {
  return <img src="/assets/logo.svg" alt="logo" className={className} />;
};

export default Logo;
