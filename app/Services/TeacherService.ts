import AuthorizationException from "App/Exceptions/AuthorizationException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Teacher from "App/Models/Teacher";

export class TeacherService {
  public async getTeacherFullView(teacherId: string) {
    try {
      const teacher = await Teacher.query()
        .where("id", teacherId)
        .preload("classes")
        .firstOrFail();
      return teacher;
    } catch (error) {
      throw new NotFoundException("Teacher can't be found");
    }
  }
  public async createClass(teacherId: string, data) {
    const teacher = await Teacher.query()
      .where("id", teacherId)
      .preload("classes")
      .firstOrFail();

    /*const classAlreadExist = await Class.firstOrFail(data.room_number);
        
        if (classAlreadExist) {
            throw new AuthorizationException('Classe ja existe')
        }*/

    if (teacher.classes) {
      const classe = await teacher?.related("classes").create(data);
      return { ...teacher.$attributes, classe };
    }

    throw new AuthorizationException("Teacher already has a room created");
  }

  public async getTeacherOnly(teacherId: string) {
    const teacher = await Teacher.find(teacherId);
    if (!teacher) {
      throw new NotFoundException("teacher can't be found");
    }
    return teacher;
  }
}
