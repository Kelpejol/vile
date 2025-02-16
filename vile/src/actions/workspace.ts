"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkSpace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
      };
    }

    const isUserWorkSpace = await db.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            user: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                user: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: { workspace: isUserWorkSpace },
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await db.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            video: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders,
      };
    }
    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
      };
    }
    const videos = await db.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }

    const workspaces = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            workSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workspaces) return { status: 200, data: workspaces };
    return { status: 404, data: [] };
  } catch (error) {
    return {
      status: 400,
    };
  }
};
