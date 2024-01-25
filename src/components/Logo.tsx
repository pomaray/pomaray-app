"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default  function Logo({
  className
}: LogoProps){
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
      <Image
        src="/pomaray_logo.png"
        alt="Logo"
        className={`mx-2 ${className}`}
        width={24}
        height={24}
      />
  );
};

