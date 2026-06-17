import { inngest } from "./client";
import prisma from "../lib/prisma";

// inngest functions to save user data to the database

export const syncUserCreation = inngest.createFunction(
    {
      id: "sync-user-creation",
      triggers: { event: "user.created" },
    },
    async ({ event }) => {
      const { data } = event;
      await prisma.user.create({
        data: {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.emailAddresses[0].emailAddress,
          image: data.imageUrl,
        },
      });
    }
  );


// inngest functions to update user data to the database

export const syncUserUpdate = inngest.createFunction(
    {
      id: "sync-user-update",
      triggers: { event: "user.updated" },
    },
    async ({ event }) => {
      const { data } = event;
      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.emailAddresses[0].emailAddress,
          image: data.imageUrl,
        },
      });
    }
  );


// inngest functions to delete user data to the database


export const syncUserDeletion = inngest.createFunction(
    {
      id: "sync-user-deletion",
      triggers: { event: "user.deleted" },
    },
    async ({ event }) => {
      const { data } = event;
      await prisma.user.delete({
        where: { id: data.id },
      });
    }
  );