import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ClassStudents extends BaseSchema {
  protected tableName = "class_students";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("class_id").notNullable(),
      table.integer("student_id").notNullable(),
      table
        .foreign("class_id")
        .references("id")
        .inTable("classes")
        .onDelete("cascade")
        .onUpdate("cascade"),
      table
        .foreign("student_id")
        .references("id")
        .inTable("students")
        .onDelete("cascade")
        .onUpdate("cascade"),
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
