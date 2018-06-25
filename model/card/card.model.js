import mongoose from 'mongoose';

// schema Validation
// ทำ Schema ต้อง Validate เสมอ
const cardSchema = mongoose.Schema({
  namecards: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  Attachment: {
    type: String,
  },
  index: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now, // วันที่ปัจจุบัน
  },
});

// Command Schema Validation
/*
    lowercase : ตัวเล็ก
    trim : ให้มันตัดช่องว่างทิ้ง (return true,false)
    min : ค่าต่ำสุด (ตัวเลข)
    max : ค่าสูงสุด
    default : ถ้ากรณีผู้ใช้ไม่ได้กรอกอะไร จะให้มัน Default ตามที่เรากำหนด
*/


const Card = mongoose.model('cards', cardSchema);
export default Card;
