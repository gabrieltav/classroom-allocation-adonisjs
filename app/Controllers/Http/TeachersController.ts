import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NotFoundException from "App/Exceptions/NotFoundException";
import Teacher from "App/Models/Teacher";
import UserValidator from "App/Validators/UserValidator";

export default class TeachersController {
  public async create({ request }: HttpContextContract) {
    const dto = await request.validate(UserValidator);
    try {
      const student = await Teacher.create(dto);

      return student;
    } catch (error) {
      throw new NotFoundException("Teacher already registered");
    }
  }

  public async show(ctx: HttpContextContract) {
    const { id } = ctx.params;
    try {
      const student = await Teacher.findOrFail(id);
      if (!student) {
        throw new NotFoundException("Teacher not found!");
      }
      return student;
    } catch (error) {
      throw new NotFoundException("Teacher not found!");
    }
  }
}
