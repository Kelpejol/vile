"use client"
import React from "react";
import {
  Card as _Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const Card = ({ title, description, children, footer }: Props) => {
  return (
    <_Card className="bg-transparent">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#9d9d9d]">{title}</CardTitle>
        <CardDescription className="text-[#707070] text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <div className="pt-2">{children}</div>
    </_Card>
  );
};

export default Card;
