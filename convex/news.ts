import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const all = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("news").order("desc").collect();
  },
});

export const latest = query({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db.query("news").order("desc").take(args.count);
    return records;
  },
});

export const page = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("enabled"), true))
      .order("desc")
      .paginate(args.paginationOpts);
    return records;
  },
});
