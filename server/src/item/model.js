import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const orderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true, 'order title is required'
    ]
  },
  notes: {
    type: String
  },
  actions: {
    type: String
  }
})

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [
      true, 'title is required.'
    ]
  },
  address: {
    type: String,
    required: [
      true, 'address is required.'
    ]
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  open_hour: [{
    type: Schema.Types.ObjectId,
    ref: 'OpenHour'
  }],
  menu: {
    type: String
  },
  order: [orderSchema],
})

export default mongoose.model('Item', itemSchema);

