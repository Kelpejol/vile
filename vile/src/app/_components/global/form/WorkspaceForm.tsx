"use client"
import React from "react";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import FormGenerator from "./FormGenerator";

type Props = {};

const WorkspaceForm = () => {
  const { errors, onFormSubmit, register, isPending } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        placeholder="Workspace Name"
        label="Workspace Name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      />
    </form>
  );
};

export default WorkspaceForm;
