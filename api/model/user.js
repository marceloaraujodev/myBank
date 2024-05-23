import { Timestamp } from "firebase-admin/firestore";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;