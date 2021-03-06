import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  group: String,
  src: String,
  lastUpdatedAt: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
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
  thursday: [openClose],
  friday: [openClose],
  saturday: [openClose],
  sunday: [openClose],
})

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
  ubereats: {
    type: String,
    default: ''
  },
  yelp: {
    type: String,
    default: ''
  },
  googlemap: {
    type: String,
    default: ''
  },
  website: {
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
  images:[imageSchema],
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  open_hour: openHourSchema,
  menu: {
    type: String
  },
  order: orderSchema,
})
itemSchema.index({
  location: "2dsphere"
});
export default mongoose.model('Item', itemSchema);