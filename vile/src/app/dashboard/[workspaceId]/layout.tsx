import { authenticateUser, getNotifications } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkSpace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import Sidebar from "@/app/_components/global/sidebar/Sidebar";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await authenticateUser();
  if (!auth.user?.workspace) return redirect("/auth/sign-in");
  if (!auth.user?.workspace.length) return redirect("/auth/sign-in");

  const hasAccess = await verifyAccessToWorkSpace(workspaceId);

  if (hasAccess.status !== 200) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="h-screen w-screen bg-[#171717]">
        <Sidebar activeWorkspaceId={workspaceId} />
        {children}
      </div>
    </HydrationBoundary>
  );
};

export default layout;
