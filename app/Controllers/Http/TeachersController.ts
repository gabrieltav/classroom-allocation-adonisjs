import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NotFoundException from "App/Exceptions/NotFoundException";
import Teacher from "App/Models/Teacher";
import TeacherValidator from "App/Validators/TeacherValidator";

export default class TeachersController {
  public async create({ request }: HttpContextContract) {
    const dto = await request.validate(TeacherValidator);
    try {
      const teacher = await Teacher.create(dto);

      return teacher;
    } catch (error) {
      throw new NotFoundException("Teacher already registered");
    }
  }

  public async show(ctx: HttpContextContract) {
    const { id } = ctx.params;
    try {
      const teacher = await Teacher.findOrFail(id);
      if (!teacher) {
        throw new NotFoundException("Teacher not found!");
      }
      return teacher;
    } catch (error) {
      throw new NotFoundException("Teacher not found!");
    }
  }

  public async update(ctx: HttpContextContract) {
    const dto = await ctx.request.validate(TeacherValidator);
    const { id } = ctx.params;

    try {
      const teacher = await Teacher.find(id);

      teacher?.merge(dto);
      await teacher?.save();

      return teacher;
    } catch (error) {
      throw new NotFoundException("Teacher not found!");
    }
  }

  public async index(ctx: HttpContextContract) {
    const teachers = await Teacher.all();

    return ctx.response
    .status(200)
    .json({
      message:"Teachers found successfully",
      teachers
    });
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;

    try {
      await Teacher.query().where({ id: id }).delete();
      return ctx.response
        .status(204)
        .json({ message: "Teacher successfully deleted" });
    } catch (error) {
      throw new NotFoundException("Teacher not found!");
    }
  }
}
