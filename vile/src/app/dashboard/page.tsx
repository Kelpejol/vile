import { authenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import ErrorToast from "../_components/global/ErrorToast";

const page = async () => {
  const auth = await authenticateUser();
  const { status, user, error } = auth;
  if (status === 200 || status === 201) {
    return redirect(`/dashboard/${user?.workspace[0].id}`);
  } else if (status === 400 || status === 403) {
    return redirect("/auth/sign-in");
  } else {
    console.error(error);
    return <ErrorToast error="Unexpected error occured, Please try again" />;
  }

  return <div></div>;
};

export default page;
