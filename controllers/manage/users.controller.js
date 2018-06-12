import {HttpMethod, route} from 'koa-decorator'
import validate from '@spksoft/koa-validator-decorator'
import User from '../../model/user/user.repository'

@route('/manage')
export default class UsersController {
  @route('/', HttpMethod.POST)
  async main(ctx) {
    const { firstname , lastname , age , status , email } = ctx.request.body
    await User.create({
      firstname,
      lastname,
      age,
      status,
      email
    })

    ctx.body = {
      hello: 'world',
    }
  }

  @route('/', HttpMethod.GET)
  async get (ctx) {
    const result = await User.find({})
    ctx.body = result
  }
}