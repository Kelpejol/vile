import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notifications?: number;
};

const SideBarItems = ({
  icon,
  title,
  href,
  selected,
  notifications,
}: Props) => {
  return (
    <li className="cursor-pointer my-[5px]">
      <Link
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D] ",
          selected ? "bg-[#1D1D1D]" : ""
        )}
        href={href}
      >
        <div className="flex items-center cursor-pointer gap-2 transition-all p-[5px] ">
          {icon}
          <span
            className={cn(
              "font-medium group-hover:[#9D9D9D] transition-all truncate w-32",
              selected ? "text-[#9D9D9D]" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
        {}
      </Link>
    </li>
  );
};

export default SideBarItems;
