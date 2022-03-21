import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import AuthorizationException from "App/Exceptions/AuthorizationException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Class from "App/Models/Class";

export default class ClasseStudentsController {
  public async addStudent(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const classe = await Class.findOrFail(id);

    const { student_id } = ctx.request.only(["student_id"]);

    const totalAlunos = await Database.from("class_students")
      .select("*")
      .where("class_id", classe?.id);

    if (totalAlunos.length < classe.capacity) {
      await classe?.related("students").attach([...student_id]);

      await classe?.save();

      await classe?.load("students");

      return classe;
    }

    throw new AuthorizationException(
      "The room has reached its maximum student capacity."
    );
  }

  public async remoteStudent(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const { student_id } = ctx.request.only(["student_id"]);

    const classe = await Class.find(id);
    if (classe?.students === student_id) {
      await classe?.save();

      return classe;
    }

    throw new NotFoundException("This room does not belong to this teacher");
  }
}
