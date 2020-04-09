import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const openClose = new mongoose.Schema({
  from: {
    type: Number
  },
  to: {
    type: Number
  }
})

const openHourSchema = new mongoose.Schema({
  monday: [openClose],
  tuesday: [openClose],
  wednesday: [openClose],
  thursday: [openClose]
})

const orderSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [
      true, 'order title is required.'
    ]
  },
  notes: {
    type: String
  },
  action: {
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
  open_hour: openHourSchema,
  menu: {
    type: String
  },
  order: [orderSchema],
})
itemSchema.index({ location: "2dsphere" });
export default mongoose.model('Item', itemSchema);

