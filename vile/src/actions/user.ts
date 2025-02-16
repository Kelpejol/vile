"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const authenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }
    const userExist = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
      },
    });
    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return {
        status: 201,
        user: newUser,
      };
    }
    return {
      status: 400,
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };
    const notifications = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length > 0) {
      return {
        status: 200,
        data: notifications,
      };
    }
    return {
      status: 400,
      data: [],
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const users = await db.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },

          { lastname: { contains: query } },
        ],
        NOT: [{ clerkId: user.id }],
      },
      select: {
        id: true,

        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return {
        status: 200,
        data: users,
      };
    }
    return { status: 404, data: users };
  } catch (error) {
    return { status: 500, error };
  }
};
