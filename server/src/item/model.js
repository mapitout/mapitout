import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const orderSchema = new mongoose.Schema({
  phone: {
    type: String,
    default: ''
  },
  doordash: {
    type: String,
    default: ''
  },
  postmates: {
    type: String,
    default: ''
  },
  grubhub: {
    type: String,
    default: ''
  },
  ubereat: {
    type: String,
    default: ''
  },
  yelp: {
    type: String,
    default: ''
  },
  others: {
    type: String,
    default: ''
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
  order: orderSchema,
})
itemSchema.index({
  location: "2dsphere"
});
export default mongoose.model('Item', itemSchema);