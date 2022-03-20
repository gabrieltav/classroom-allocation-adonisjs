import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Classes extends BaseSchema {
  protected tableName = "classes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("teacher_id").notNullable(), table.integer("room_number");
      table.integer("capacity");
      table.boolean("availability").defaultTo(true);

      table
        .foreign("teacher_id")
        .references("id")
        .inTable("teachers"),
        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
