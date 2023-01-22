import { router } from "../trpc";
import { authRouter } from "./auth";
import { deckRouter } from "./deck";
import { groupRouter } from "./group";
import { cardRouter } from "./card";

export const appRouter = router({
  group: groupRouter,
  deck: deckRouter,
  card: cardRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
