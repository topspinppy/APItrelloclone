//import
import path from 'path'
import mongoose from 'mongoose'
import config from './config'
import mongooseClient from './libraries/database/client/mongoose'
import Koa from 'koa'
import cors from '@koa/cors'
import { load } from 'koa-decorator'
import bodyParser from 'koa-bodyparser'
import route from 'koa-router'

//middlewares
const app = new Koa()
const router = new route()

app.use(cors())
app.use(bodyParser())


//call env
require('dotenv').config()

//load router
const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js')
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods({
  throw: true
}))


// router.get('/users', async(ctx, next) => {
//     let users = await User.find({})
//     ctx.body = JSON.stringify(users)
// })


//connect Database
if (config.database.databaseURI) 
{
    mongooseClient(config.database.databaseURI)
    .then(dbClient => {
        console.log(`Connected Database to ${dbClient.host}:${dbClient.port}/${dbClient.name}`)
    })
    .catch(err => {
        console.error('Unable to start server!', err)
        process.exit(1)
    })
}


app.listen(config.system.port)
console.log(`starting server on port ${config.system.port}`)





































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
// let person = new User({ firstname: 'Saiwarun', lastname: 'Yenjitpissamai', age: '10', status: 'pending' });
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