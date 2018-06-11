import mongoose from 'mongoose'

//schema Validation
//ทำ Schema ต้อง Validate เสมอ
const userSchema = mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: String,
    age: {
        type: Number, 
        min: 1, 
        max: 100, 
        default: 15, 
        required: true
    },
    status: {
        type: String , 
        enum: ["active", "pending"], 
        required: true
    },
    email: {
        type: String , 
        trim: true
    },
    created_date: {
        type: Date, 
        default: Date.now //วันที่ปัจจุบัน
    }
})

//Command Schema Validation
/*
    lowercase : ตัวเล็ก 
    trim : ให้มันตัดช่องว่างทิ้ง (return true,false)
    min : ค่าต่ำสุด (ตัวเลข)
    max : ค่าสูงสุด
    default : ถ้ากรณีผู้ใช้ไม่ได้กรอกอะไร จะให้มัน Default ตามที่เรากำหนด
*/


const User = mongoose.model("users", userSchema);
export default User