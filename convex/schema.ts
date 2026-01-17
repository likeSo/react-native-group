import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  news: defineTable({
    title: v.string(),
    description: v.optional(v.nullable(v.string())),
    image: v.optional(v.nullable(v.string())),
    link: v.string(),
    category: v.union(v.literal("react"), v.literal("react-native")),
    enabled: v.boolean(),
  })
    .index("by_title", ["title"])
    .index("by_enabled", ["enabled"]),
  posts: defineTable({
    content: v.string(),
    image: v.optional(v.nullable(v.string())),
    username: v.string(),
    likesCount: v.number(),
  }),
});
