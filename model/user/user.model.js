import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    status: String,
    created_date: Date 
})

const User = mongoose.model("users", userSchema);

export default User