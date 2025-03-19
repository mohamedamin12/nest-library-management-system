import { Schema, Document } from 'mongoose';



export const AuthorSchema = new Schema({
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  bio: { type: String, required: true },
},{timestamps:true});