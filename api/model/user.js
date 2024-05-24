import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw'],
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  }, 
  transactions: [TransactionSchema],
},{
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;