import 'dotenv/config' 
import user from './user'
import password from './password'
import system from './system'
import database  from './database'
const combineConfig = {
    user,
    password,
    system,
    database
}

export default combineConfig