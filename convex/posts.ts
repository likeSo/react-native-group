import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";

export const page = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("posts").paginate(args.paginationOpts);
  },
});
