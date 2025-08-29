import Image from "next/image";
import React from "react";

export default function Logo({
    title,
    className
}:{
    title?:string
    className?:string
}) {
  return (
    <div className={className}>
      <Image
        src="https://behiryperfume.com/images/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="size-8"
      />
      {title && <span className="font-bold inline-block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
        {title}
      </span>}
    </div>
  );
}
