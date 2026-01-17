// convex/migrations.ts
import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api.js";
import { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
// export const migrations = new Migrations<DataModel>(components.migrations);

// 导出 runner（可选，方便批量跑）
export const run = migrations.runner();

// 数据迁移
export const backfillNewsEnabled = migrations.define({
  table: "news",
  migrateOne: async (ctx, doc) => {
    if (doc.enabled === undefined) {
      await ctx.db.patch(doc._id, {
        enabled: true, // ← 这里填你想要的默认值，true/false 都行
      });
    }
    // 也可以直接返回对象 shorthand 写法：
    // return doc.enabled === undefined ? { enabled: true } : undefined;
  },
  // 可选参数
  // batchSize: 50,           // 默认 100，文档很大时可调小
  // parallelize: true,       // 批次内并行，小心竞态
});

// 执行迁移：bun convex run migrations:run '{fn: "migrations:backfillNewsEnabled", dryRun: false, cursor: null}'
