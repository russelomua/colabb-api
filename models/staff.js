import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const staffModel = new Schema({
  id: mongoose.Schema.ObjectId,
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
    middle: { type: String }
  },
  phone: { type: Number, required: true },
  sex: { type: Number, min:0, max: 1, required: true },
  added: { type: Date, default: Date.now },
  salary: { type: Number, required: true },
  position: { type: String, required: true }
});
export default mongoose.model('staff', staffModel);