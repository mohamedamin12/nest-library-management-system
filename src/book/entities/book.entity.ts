import { Schema } from "mongoose";

export const BookSchema = new Schema({
  title: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId,ref:'Author', required: true },
  publishedDate: { type: Date, required: false },
  pages: { type: Number, required: true },
  isbn: { type: String, required: false },
  available_copies: { type: Number, required: true },
  total_copies: { type: Number, required: true },
  category_id:{type:Schema.Types.ObjectId,ref:'Category',required:false}

},{timestamps:true});
