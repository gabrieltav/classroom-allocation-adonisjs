import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeacherValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	  name: schema.string(),
    clas_id: schema.string.optional(),
	  matriculation: schema.string(),
	  email: schema.string.optional(),
	  birth_date: schema.date.optional({format: 'yyyy-MM-dd'})
  })

  public cacheKey = this.ctx.routeKey;

  public messages = {}
}