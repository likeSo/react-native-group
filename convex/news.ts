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