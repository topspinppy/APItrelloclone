//Connect 
import mongoose from 'mongoose'
import User from './model/user/user.model.js'

mongoose.connect('mongodb://localhost/trello')
mongoose.Promise = global.Promise;



//Insert 
let person = new User({ firstname: 'Saran', lastname: 'trairattanasuwan', age: '20' });
person.save((err, data) => {
    if(err) console.log(err);
    console.log('saved document successfully' ,data);
})
