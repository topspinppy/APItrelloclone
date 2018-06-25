import { HttpMethod, route } from 'koa-decorator';
import validate from '@spksoft/koa-validator-decorator';
import Lanes from '../../model/lanes/lanes.model';
import Card from '../../model/card/card.repository';

@route('/lanes')
export default class UsersController {
  @route('/', HttpMethod.POST)
  async main(ctx) {
    //insert into
    const { namelanes,cards } = ctx.request.body;
    await Lanes.create({
      namelanes,cards
    });
    
    ctx.body = await Lanes.aggregate([
      {
        $lookup:
        {
          from: 'cards',
          localField: 'cards._id',
          foreignField: '_id',
          as: 'cards'
        }
      }
    ])
  }
  
  @route('/:idlanes/:idcard', HttpMethod.DELETE)
  async delete(ctx) {
    //insert into
    const params = ctx.params.idlanes
    const idcard = ctx.params.idcard
    try 
    {
      ctx.body = await Lanes.update(
        {
          "_id" : params,
        },
        {
          $pull: {
            "cards": idcard
          }
        }
      )
    }
    catch (err) {
      ctx.body = await Lanes.find({});
    }
  }

  @route('/', HttpMethod.GET)
  async get(ctx) {
    ctx.body = await Lanes.aggregate([
      {
        $lookup:
        {
          from: 'cards',
          localField: 'cards._id',
          foreignField: '_id',
          as: 'cards'
        }
      }
    ])
  }

  @route('/all', HttpMethod.GET)
  async showjoin(ctx) {
    const { namelanes,cards } = ctx.request.body;
    ctx.body = await Lanes.aggregate([
      {
        $lookup:
        {
          from: 'cards',
          localField: 'cards._id',
          foreignField: '_id',
          as: 'cards'
        }
      }
    ])
  }

  @route('/sortlanes', HttpMethod.PATCH)
  async updatelanes(ctx) {
    const data = ctx.request.body;
    await Lanes.deleteMany({})
    await Lanes.insertMany(data)
    console.log("dddd",data);
    ctx.body = await Lanes.aggregate([
      {
        $lookup:
        {
          from: 'cards',
          localField: 'cards._id',
          foreignField: '_id',
          as: 'cards'
        }
      }
    ])
  }

  @route('/:id', HttpMethod.DELETE)
  async update(ctx) {
    try {
      const param = ctx.params.id;
      const card = await Lanes.find({ _id: param })
      const cardmapid = card[0].cards.map((indexs) => {
            Card.delete({ _id: indexs._id})
      })
      const result = await Lanes.remove({ _id: param });
      const joins = await Lanes.aggregate([
        {
          $lookup:
          {
            from: 'cards',
            localField: 'cards._id',
            foreignField: '_id',
            as: 'cards'
          }
        }
      ])
      ctx.body = joins
    } 
    catch (err) {
      ctx.status = 404
      ctx.body = ctx.status
    }
  }
}
