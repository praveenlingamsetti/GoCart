import { inngest } from "./client";
import prisma from "../lib/prisma";

// inngest functions to save user data to the database

export const syncUserCreation = inngest.createFunction({
    id: "sync-user-creation",
    event: "user.created",
    data: {
        name: "Sync User Creation",
        description: "Sync user creation to the database",
    },
    run: async ({ event }) => {
        const { data} = event
        await prisma.user.create({
            data: {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.emailAddresses[0].emailAddress,
                image: data.imageUrl,
            },
        });
    },
});


// inngest functions to update user data to the database

export const syncUserUpdate = inngest.createFunction({
    id: "sync-user-update",
    event: "user.updated",
    data: {
        name: "Sync User Update",
        description: "Sync user update to the database",
    },
    run: async ({ event }) => {
        const { data } = event;
        await prisma.user.update({
            where: { id: data.id },
            data: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.emailAddresses[0].emailAddress,
                image: data.imageUrl,
            },
        });
    },
});


// inngest functions to delete user data to the database


export const syncUserDeletion = inngest.createFunction({
    id: "sync-user-deletion",
    event: "user.deleted",
    data: {
        name: "Sync User Deletion",
        description: "Sync user deletion to the database",
    },
    run: async ({ event }) => {
        const { data } = event;
        await prisma.user.delete({
            where: { id: data.id },
        });
    },
});