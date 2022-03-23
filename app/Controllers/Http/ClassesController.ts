import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Class from "App/Models/Class";
import Teacher from "App/Models/Teacher";
import { ClassStudentService } from "App/Services/ClassStudentService";
import ClassValidator from "App/Validators/ClassValidator";
import NotFoundException from "App/Exceptions/NotFoundException";

export default class ClassesController {
  private classStudentService = new ClassStudentService();

  public async store(ctx: HttpContextContract) {
    const { teacher_id } = ctx.params;

    const teacher = await Teacher.find(teacher_id)

    if(!teacher) throw new NotFoundException("Teacher not found")

    const dto = await ctx.request.validate(ClassValidator);
    
    const classe = await this.classStudentService.createClass(teacher_id, dto);

    return classe;
  }

  public async index(ctx: HttpContextContract) {
    const { teacher_id } = ctx.params;

    const teacher = await Teacher.find(teacher_id)

    if(!teacher) throw new NotFoundException("Teacher not found")

    const classe = await Class.query()
      .where("teacher_id", teacher.id)
      .preload("teacher")
      .preload("students");

    await teacher.load("classes");
    return ctx.response.json({ classe });
  }

  public async show({ params }: HttpContextContract) {
    const classe = await Class.find(params.id);

    if(!classe) throw new NotFoundException("Class not found")

    return classe;
  }

  public async findAll(ctx: HttpContextContract) {
    const classes = await Class.all();

    return ctx.response
    .status(200)
    .json({
      message:"Classes found successfully",
      classes
    });
  }

  public async update(ctx: HttpContextContract) {
    const { teacher_id, id } = ctx.params;

    const data = await ctx.request.validate(ClassValidator);

    const teacher = await Teacher.find(teacher_id)
    if(!teacher) throw new NotFoundException("Teacher not found")

    const classe = await Class.find(id);
    if(!classe) throw new NotFoundException("Class not found")

    if (classe?.teacherId === teacher?.id) {
      
      classe?.merge(data);
      await classe?.save();

      return ctx.response
        .status(200)
        .json({
          message:"Class updated successfully",
          classe
        });
    }

    throw new NotFoundException("This room does not belong to this teacher");
  }

  public async destroy(ctx: HttpContextContract) {
    const { teacher_id, id } = ctx.params;
    const classe = await Class.findOrFail(id);
    const teacher = await Teacher.findOrFail(teacher_id);

    if (classe.teacherId === teacher.id) {
      //console.log("caindo aqui..");
      await classe.delete();
      return ctx.response
        .status(200)
        .json({ message: "Room successfully deleted" });
    }
    throw new NotFoundException("This room does not belong to this teacher");
  }
}
