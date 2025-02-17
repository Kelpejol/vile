"use client";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { ArrowRight,  Folder as FolderDualTone } from "lucide-react";
import React from "react";
import Folder from "./Folder";

type Props = {
  workspaceId: string;
};

const Folders = ({ workspaceId }: Props) => {
  //  useQueryData()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <FolderDualTone />
          <h2 className="text-[#bdbdbd] text-xl"> Folders</h2>
        </div>
        <div className="items-center flex gap-2">
          <p className="text-[#bdbdbd]">See all</p>
          <ArrowRight color="#707070"/>
        </div>
      </div>
      <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
        <Folder name="Folder Title"/>
      </section>
    </div>
  );
};

export default Folders;
