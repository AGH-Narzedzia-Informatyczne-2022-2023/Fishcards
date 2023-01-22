import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const deckRouter = router({

    create: protectedProcedure
        .input(z.object({
            name: z.string(),
            description: z.string(),
            groupId: z.number()
        }))
        .mutation(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const userId = session.user.id;
            const { name, description, groupId } = input;
            return prisma.deck.create({
                data: {
                    name: name,
                    description: description,
                    groups: {
                        connect: {
                            id: groupId,
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
            return prisma.deck.findMany({
                where: {
                    groups: {
                        some: {
                            users: {
                                some: {
                                    id: userId
                                }
                            }
                        }
                    }
                }
            })
        }),

    getOne: protectedProcedure
        .input(z.object({
            id: z.number()
        }))
        .query(({ctx, input}) => {
            const { prisma, session } = ctx;
            const deckId = input.id;

            return prisma.deck.findUnique({
                where: {
                    id: deckId
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