import { DateTime } from "luxon";
import { BaseModel, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Class from "./Class";

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public matriculation: string;

  @column()
  public email: string;

  @column.date({
    serialize: (value: DateTime) =>
      value ? value.toFormat("yyyy-MM-dd") : value,
  })
  public birthDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Class,{
    pivotTable:'class_students'
  })
  public classes: ManyToMany<typeof Class>
}
