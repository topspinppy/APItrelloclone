import { HttpMethod, route } from 'koa-decorator';
import validate from '@spksoft/koa-validator-decorator';
import User from '../../model/user/user.repository';

@route('/manage')
export default class UsersController {
  @route('/user', HttpMethod.POST)
  async main(ctx) {
    //insert into
    const { firstname, lastname, age, status, email } = ctx.request.body;
    await User.create({
      firstname,
      lastname,
      age,
      status,
      email
    });

    ctx.body = {
      hello: 'world'
    };
  }

  @route('/user', HttpMethod.GET)
  async get(ctx) {
    //select * from
    const result = await User.find({});
    ctx.body = result;
  }

  @route('/user', HttpMethod.PATCH)
  async update(ctx) {
    const { firstname, lastname, age, status, email } = ctx.request.body;
    const id = await User.find({ firstname });
    const userid = id.items[0]._id;

    const result = await User.update(
      { userid },
      { firstname, lastname, age, status, email }
    );
    ctx.body = result;
  }

  @route('/user/:id', HttpMethod.DELETE)
  async update(ctx) {
    try {
      const param = ctx.params.id;
      const result = await User.delete({ _id: param });
      ctx.body = result;
    } catch (err) {
      ctx.status = 404;
      ctx.body = "Can't Delete";
    }
  }
}
