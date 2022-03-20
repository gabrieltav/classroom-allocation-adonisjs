import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

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
}
