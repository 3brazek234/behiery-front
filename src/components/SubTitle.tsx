import { cn } from "@/lib/utils";
import React from "react";

function SubTitle({title, className}: {title: string, className?: string}   ) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <div className="w-36 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
    </div>
  );
}

export default SubTitle;
