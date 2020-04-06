import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

export default mongoose.model('Category', categorySchema);