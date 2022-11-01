import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Character = new Schema({
  name: { type: String },
  title: { type: String },
  blurb: { type: String },
  image_loading: { type: String },
  image_splash: { type: String },
  tags: [{ type: String }],
  partype: { type: String },
});

export default mongoose.model('characters', Character);
