import Mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interface/user_interface";

const schema = Mongoose.Schema;

const userSchema: Schema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export const userModel: Model<IUser> = Mongoose.model<IUser>("User", userSchema);

export default userModel;
