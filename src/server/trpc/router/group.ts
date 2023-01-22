import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const groupRouter = router({

    create: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const userId = session.user.id;
            const { name } = input;
            return prisma.group.create({
                data: {
                    name: name,
                    users: {
                        connect: {
                            id: userId,
                        },
                    },
                }
            });
        }),

    update: protectedProcedure
        .input(z.object({
            name: z.string(),
            id: z.number()
        }))
        .mutation(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { name, id} = input;
            return prisma.group.update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            });
        }),

    delete: protectedProcedure
        .input(z.object({
            id: z.number()
        }))
        .mutation(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { id } = input;
            return prisma.group.delete({
                where: {
                    id: id
                }
            });
        }),

    getAll: protectedProcedure
        .query(({ctx}) => {
            const { prisma, session } = ctx;
            const userId = session.user.id;
            return prisma.group.findMany({
                where: {
                    users: {
                        some: {
                            id: userId
                        }
                    }
                }
            })
        }),

    addToGroup: protectedProcedure
        .input(z.object({
            groupId: z.number(),
            userEmail: z.string().email()
        }))
        .mutation(({ctx, input}) => {
            const { prisma, session } = ctx;
            const { groupId, userEmail } = input;
            return prisma.group.update({
                where: {
                    id: groupId
                },
                data: {
                    users: {
                        connect: {
                            email: userEmail
                        }
                    }
                }
            })
        })
});