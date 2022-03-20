import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ClassValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    room_number: schema.number(),
    capacity: schema.number(),
    availability: schema.boolean.optional(),
  });

  public messages = {};
}
