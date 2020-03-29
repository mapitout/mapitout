import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const openHourSchema = new mongoose.Schema({
  openAt: {
    type: Number,
    required: true
  },
  closeAt: {
    type: Number,
    required: true
  },
  dayOfWeek: {
    type: Number,
    required: true
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }
})


export default mongoose.model('OpenHour', openHourSchema)