import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("history", (table) => {
    table.increments();
    table.date("date");
    table.boolean("holiday");
    table.float("temperature");
    table.float("rainfall");
    table.integer("demand");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("history");
}
