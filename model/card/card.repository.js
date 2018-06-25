import CardModel from './card.model'
import MongooseBaseRepository from '@spksoft/mongoose-repository'


class CardRepository extends MongooseBaseRepository {

}

const instance = new CardRepository(CardModel)
export default instance