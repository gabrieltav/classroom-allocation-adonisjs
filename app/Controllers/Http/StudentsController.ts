import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NotFoundException from "App/Exceptions/NotFoundException";
import Student from "App/Models/Student";
import StudentValidator from "App/Validators/StudentValidator";

export default class StudentsController {
  public async create({ request }: HttpContextContract) {
    const dto = await request.validate(StudentValidator);
    try {
      const student = await Student.create(dto);

      return student;
    } catch (error) {
      throw new NotFoundException("Student already registered");
    }
  }

  public async show(ctx: HttpContextContract) {
    const { id } = ctx.params;
    try {
      const student = await Student.findOrFail(id);
      if (!student) {
        throw new NotFoundException("Student not found!");
      }
      student?.load("classes");
      return student;
    } catch (error) {
      throw new NotFoundException("Student not found!");
    }
  }

  public async update(ctx: HttpContextContract) {
    const dto = await ctx.request.validate(StudentValidator);
    const { id } = ctx.params;

    try {
      const student = await Student.find(id);

      student?.merge(dto);
      await student?.save();

      return student;
    } catch (error) {
      throw new NotFoundException("Student not found!");
    }
  }

  public async index({}: HttpContextContract) {
    const all = await Student.all();

    return all;
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;

    try {
      await Student.query().where({ id: id }).delete();
      return ctx.response
        .status(204)
        .json({ message: "Student successfully deleted" });
    } catch (error) {
      throw new NotFoundException("Student not found!");
    }
  }
}
