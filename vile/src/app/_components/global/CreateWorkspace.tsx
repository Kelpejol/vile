"use client";
import { useQueryData } from "@/hooks/useQueryData";
import { UserWorkspaces } from "@/types/index.types";
import React from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import  WorkspaceForm from "./form/WorkspaceForm"

type Props = {};

const CreateWorkspace = ({}: Props) => {
  const { data } = useQueryData(["user-workspaces"]);

  const { data: plan } = data as UserWorkspaces;

//   if (plan.subscription?.plan === "FREE") {
//     return <></>;
//   }
  return (
    <Modal
      title="Create a Workspace"
      description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private."
      trigger={
        <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
          <FolderPlus />
          Create a workspace
        </Button>
      }
    >
        <WorkspaceForm/>
        
    </Modal>
  );
};

export default CreateWorkspace;
