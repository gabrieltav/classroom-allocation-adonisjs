import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NotFoundException from "App/Exceptions/NotFoundException";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {

  public async create({ request }: HttpContextContract) {
    const dto = await request.validate(UserValidator);
    try {
      const user = await User.create(dto);

      return user;
      
    } catch (error) {
      throw new NotFoundException("User is already registered");
    }
  }
}
