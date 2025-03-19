import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: 'demo.image.png' },
});