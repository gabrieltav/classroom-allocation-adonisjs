import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Teacher extends BaseModel {
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
}
