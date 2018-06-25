import {HttpMethod, route} from 'koa-decorator'
import validate from '@spksoft/koa-validator-decorator'
import Cards from '../../model/card/card.repository'
import Lanes from '../../model/lanes/lanes.model';


@route('/manage')
export default class CardsController {
  @route('/cards/:idlanes', HttpMethod.POST)
  async main(ctx) {
    const params = ctx.params.idlanes
    const { namecards , description , Attachment } = ctx.request.body
    let _id

    await Cards.create({
      namecards,
      description : '',
      Attachment : ''
    }).then( (res) =>{
      _id = res._id
    })
    console.log(_id)
    let a = await Lanes.findOneAndUpdate(
      {
        "_id" : params,
      },
      {
        $push: { 
          cards: {
            _id,
          }  
        }
      },
      { 
        upsert : true 
      }
    );
    console.log('test',a)
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
    ]);
  }

  @route('/cards', HttpMethod.GET)
  async get (ctx) {
    const result = await Cards.find({})
    ctx.body = result
  }

  @route('/cards', HttpMethod.PATCH)
  async update (ctx) {
    const { nameHeader , description , Attachment } = ctx.request.body
    const id = await Cards.find({nameHeader})
    const userid = id.items[0]._id  

    const result = await Cards.update({userid},{ nameHeader , description , Attachment })
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

  @route('/cardsdescription', HttpMethod.PATCH)
  async updatedescription (ctx) {
    const { _id , description } = ctx.request.body

    const result = await Cards.update({_id},{ description })
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
  
  @route('/cards/:id', HttpMethod.DELETE)
  async delete (ctx) {
    try 
    {
      const param = ctx.params.id
      const result = await Cards.delete({_id: param})
      ctx.body = await Lanes.aggregate([
        {
          $lookup:
          {
            from: 'cards',
            localField: 'cards',
            foreignField: '_id',
            as: 'cards'
          }
        }
      ])
    }
    catch(err)
    {
      ctx.status = 404
      ctx.body = await Lanes.aggregate([
        {
          $lookup:
          {
            from: 'cards',
            localField: 'cards',
            foreignField: '_id',
            as: 'cards'
          }
        }
      ])
    }
  }
}