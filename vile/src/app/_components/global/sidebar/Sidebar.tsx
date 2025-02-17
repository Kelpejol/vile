"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { NotificationProps, WorkspaceProps } from "@/types/index.types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import Modal from "../Modal";
import { Loader, Menu, PlusCircle } from "lucide-react";
import SearchUser from "../SearchUser";
import { MENU_ITEMS } from "@/constant";
import SideBarItems from "./SideBarItems";
import { count } from "console";
import WorkspacePlaceholder from "./WorkspacePlaceholder";
import Card from "../Card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data, isFetched } = useQueryData(["user-workspaces"]);
  const { data: notifications } = useQueryData(["user-notifications"]);

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace = workspace.workspace.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  const workSpace = currentWorkspace?.name || "Select a Workspace";

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const sidebar = (
    <div className="flex-none bg-black relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="flex p-4 gap-2 justify-start items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/ai/aivid.svg" height={40} width={40} alt="logo" />
        <p className="text-xl">AiVid Pro</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue className=" text-white font-bold">
            {workSpace}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className=" bg-[#171717] text-white backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel className=" text-center text-neutral-500">
              Workspaces
            </SelectLabel>
            <Separator />
            {workspace.workspace.map((workSpace) => (
              <SelectItem key={workSpace.id} value={workSpace.id}>
                {workSpace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.workspace && (
                    <SelectItem
                      key={workspace.workspace.id}
                      value={workspace.workspace.id}
                    >
                      {workspace.workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan === "PRO" && (
          <Modal
            title="Invite To Workspace"
            description="Invite other users to your workspace"
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px]">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
          >
            <SearchUser workSpaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#909090] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SideBarItems
              key={item.href}
              href={item.href}
              icon={<item.icon />}
              selected={pathName === item.href}
              title={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm text-ellipsis">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No workspaces"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[100px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type === "PERSONAL" && (
                  <SideBarItems
                    href={`/dashboard/${item.id}`}
                    key={item.id}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SideBarItems
                href={`/dashboard/${item.workspace.id}`}
                key={item.workspace.id}
                selected={pathName === `/dashboard/${item.workspace.id}`}
                title={item.workspace.name}
                notifications={0}
                icon={
                  <WorkspacePlaceholder>
                    {item.workspace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <Card
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more"
          footer={
            <Button className="text-sm w-full bg-white text-black mt-2">
              <Loader />
              {/* Upgrade */}
            </Button>
          }
        ></Card>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="md:hidden fixed py-4">
        <Sheet>
          <SheetTrigger asChild className="mt-[2px]">
            <Button variant={"ghost"}
            className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
          {sidebar}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
};

export default Sidebar;
