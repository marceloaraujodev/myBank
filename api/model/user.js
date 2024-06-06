import mongoose from "mongoose";
import crypto from 'crypto';

const TransactionSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  transactionType: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true,
  },
  amount: {
    type: Number
  }
},{
  timestamps: true
});

const UserSchema = new mongoose.Schema({
  name: {
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
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
},{
  timestamps: true
});

// generate forgot password token
UserSchema.methods.getPasswordToken = function(){
                      // this is a object
  const forgotToken = crypto.randomBytes(20).toString('hex');

  // need to run this for database and frontend
  this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');

  this.forgotPasswordExpires = Date.now() + 20 * 60 * 1000;

  return forgotToken;
}

const User = mongoose.model('User', UserSchema);

export default User;