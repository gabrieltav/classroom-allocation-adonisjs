import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Student from "./Student";
import Teacher from "./Teacher";

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public teacherId: number;

  @column()
  public room_number: number;

  @column()
  public capacity: number;

  @column()
  public availability: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Student, {
    pivotTable: "class_students",
    pivotTimestamps: true,
  })
  public students: ManyToMany<typeof Student>;

  @belongsTo(() => Teacher, { foreignKey: "teacherId" })
  public teacher: BelongsTo<typeof Teacher>;
}
