//Connect 
import mongoose from 'mongoose'
import config from './config'
import mongooseClient from './libraries/database/client/mongoose'
import User from './model/user/user.model.js'


//call env
require('dotenv').config()


//connect Database
if (config.database.databaseURI) 
{
    mongooseClient(config.database.databaseURI)
    .then(dbClient => {
        console.log(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`)
    })
    .catch(err => {
        console.error('Unable to start server!', err)
        process.exit(1)
    })
}









































// let uri = 'mongodb://admin:admin1234@localhost:27017/trello?authSource=admin'
// mongoose.connect(uri, (err, result) => {
//     if(err) {
//         console.log('Unabled to Connect to the server. Please start the server. Error: ',err)
//     }
//     else {
//         console.log('Connect to Server Successfully');
//     }
// })
// mongoose.Promise = global.Promise


//Insert 
// let person = new User({ firstname: 'Saran', lastname: 'trairattanasuwan', age: '20', status: 'active' });
// person.save((err, data) => {
//     if(err) console.log(err);
//     console.log('saved document successfully' ,data);
// })

//Update
// User.findByIdAndUpdate('5b19223d43d1ed079c3677e1' , { age : 18 }, (err, data) => {
//     if(err) console.log(err);
//     console.log('user.findByIDAndUpdate | ', data);
// })


// User.findOneAndUpdate({firstname: "Paranatsssssssssssssss"} , { age: 1 }, {new: true, upsert: true}, (err,data) =>{
//     if(err) console.log(err)
//     console.log('User.findOneAndUpdate | ', data)
// })

// User.findOne({status: 'Active', age :{$lt : 20}}, (err, data) => {
//     if(err) console.log(err);
//     console.log('User.findOne | ', data)
// })

// User.find().sort({age : 1}).exec((err,data) => {
//     if(err) console.log(err);

//     console.log(data)
// })