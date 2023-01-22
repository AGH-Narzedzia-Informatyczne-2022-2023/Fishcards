import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const cardRouter = router({

    create: protectedProcedure
        .input(z.object({
            question: z.string(),
            answer: z.string(),
            deckId: z.number(),
        }))
        .mutation(({ ctx, input }) => {
            const { prisma } = ctx;
            const { question, answer, deckId } = input;

            return prisma.card.create({
                data: {
                    question: question,
                    answer: answer,
                    decks: {
                        connect: {
                            id: deckId,
                        },
                    },
                }
            });
        }),

    createProcessed: protectedProcedure
        .input(z.object({
            deckId: z.number(),
            cardId: z.number(),
        }))
        .mutation(({ ctx, input }) => {

        }),

    update: protectedProcedure
        .input(z.object({
            question: z.string(),
            answer: z.string(),
            cardId: z.number(),
        }))
        .mutation(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { question, answer, cardId } = input;
            return prisma.card.update({
                where: {
                    id: cardId
                },
                data: {
                    question: question,
                    answer: answer
                }
            });
        }),

    delete: protectedProcedure
        .input(z.object({
            id: z.number()
        }))
        .mutation(({ ctx, input }) => {
            const { prisma } = ctx;
            const { id } = input;
            return prisma.card.delete({
                where: {
                    id: id
                }
            });
        }),

    getAll: protectedProcedure
        .input(z.object({
            id: z.number()
        }))
        .query(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { id } = input;
            return prisma.card.findMany({
                where: {
                    decks: {
                        some: {
                            id: id
                        }
                    }
                }
            })
        }),

    getBest: protectedProcedure
        .input(z.object({
            deckId: z.number()
        }))
        .query(({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { deckId } = input;
            return prisma.processedCard.findFirst({
                where: {
                    AND: [
                        { userId: session.user.id },
                        { card: {
                                decks: {
                                    some: {
                                        id: deckId,
                                    }
                                }
                            }
                        },
                    ]
                },
                orderBy: {
                    repetitionDate: 'asc'
                }
            })
        }),

    getRandom: protectedProcedure
        .input(z.object({
            deckId: z.number()
        }))
        .query( async ({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { deckId } = input;

            const cardCount = await prisma.card.count({
                where: {
                    decks: {
                        some: {
                            id: deckId
                        }
                    }
                }  
            });

            const skip = Math.floor(Math.random() * cardCount);

            return prisma.card.findFirst({
                where: {
                    decks: {
                        some: {
                            id: deckId
                        }
                    }
                },
                skip: skip
            });
        })
});