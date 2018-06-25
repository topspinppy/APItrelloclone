import mongoose from 'mongoose';

// schema Validation
// ทำ Schema ต้อง Validate เสมอ
const cardInfoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
}, { _id: false });

const lanesSchema = mongoose.Schema({
  namelanes: {
    type: String,
    required: true,
    trim: true,
  },
  cards: {
    type: [cardInfoSchema],
    default: [],
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

const Lanes = mongoose.model('lanes', lanesSchema);
export default Lanes;
