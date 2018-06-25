import LanesModel from './lanes.model';
import MongooseBaseRepository from '@spksoft/mongoose-repository';

class LanesRepository extends MongooseBaseRepository {}

const instance = new LanesRepository(LanesModel);
export default instance;
