import { Schema } from "mongoose";
import { RolesEnum } from "../enum/roles";


export const  UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: {
        type: [String],
        enum: Object.values(RolesEnum),
        default:RolesEnum.USER 
      },
});