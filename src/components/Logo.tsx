import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number,
}

const Logo = ({ className, width, height }: Props): React.JSX.Element => {
  return (
    <Image
      src="/assets/logo.svg"
      alt="logo"
      className={className}
      width={width}
      height={height}
      style={{ width: '100%', height: 'auto' }}
      priority={true}
    />
  );
};

export default Logo;
