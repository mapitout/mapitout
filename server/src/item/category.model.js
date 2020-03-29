import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  }
})

export default mongoose.model('Category', categorySchema);