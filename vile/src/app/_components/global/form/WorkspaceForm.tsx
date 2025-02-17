"use client";
import React from "react";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import FormGenerator from "./FormGenerator";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type Props = {};

const WorkspaceForm = () => {
  const { errors, onFormSubmit, register, isPending } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        placeholder="Workspace Name"
        label="Name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Loader /> : "Create Workspace"}
      </Button>
    </form>
  );
};

export default WorkspaceForm;
