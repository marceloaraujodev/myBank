import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import emailValidator from 'email-validator';

// Need to adjust login to hashed password
export async function login (req, res) {
  try {
    const {userEmail, password} = req.body;
    const user = await User.findOne({email: userEmail}).select('+password');
    // console.log(user)

    if(!user){
      return res.status(401).json({success: false, message: 'Invalid Credentials'})
    }

    // compares the password with the users password, so if 
    const isAuthorized = await bcrypt.compare(password, user.password )

    if(!isAuthorized){
      // console.log('do not give token')
     return res.status(401).json({
        success: false,
        message: 'Invalid Credentials'
      })
    }

    // give token
    if(isAuthorized){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      })
      // Turn httpOnly to true for production
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      res.cookie('token', token, {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/' 
      })
      res.status(200).json({user, token});
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }

}

export async function logout(req, res) {
  res.cookie('token', null, {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/' 
  })
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export async function register (req, res) {
  try {
    let {userName, password, email} = req.body;

    // sanitize
    userName.trim();
    email.trim().toLowerCase();
    password.trim();

    if(!email || !password || !userName){
      console.log('enter no email or ...')
      return res.json({success: false, message: 'All fields are required.'})
    }
 

    if(!emailValidator.validate(email)){
      console.log('enter email wrong')
      return res.json({success: false, message: 'Please provide a valid email'})
    }

  
    const hashedPass = await bcrypt.hash(password, 10)

    const newUser = {
      name: userName,
      password: hashedPass,
      email
    }
    

    const user = await User.create(newUser);

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    })

    // Turn httpOnly to true for production
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    res.cookie('token', token, {
      expires: expirationDate,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/' 
    })
    res.status(200).json({user, token})
    
  } catch (error) {
    console.log(error, error.message)
    res.status(401).json({success: false, message: error.message})
  }
  
}

export async function checkAuth(req, res){
  // console.log('req.cookie:', req.cookies)
  try {
    // Retrieve the token from the request cookies
    const token = req.cookies.token;
    
    // If the token is missing or invalid, return an unauthorized response
    if (!token) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    // console.log(user)
    
    // If the token is valid, the user is authenticated
    res.status(200).json({ success: true, userInfo: user});
  } catch (error) {
    // If token verification fails, return an unauthorized response
    // return res.status(401).json({ success: false, message: 'Unauthorized' });
    return res.json({ success: false, message: 'Unauthorized' });
  }

}

// gets loan request and adds to db and balance
export async function loans(req, res){ 
  try {
    const { loanAmount } = req.body;
    const { token } = req.cookies
 
    if(!token){
      return res.status(400).json({success: false, message: 'Unauthorized. Please login'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    const loanTransaction = {
      day: new Date(),
      transactionType: 'deposit',
      amount: +loanAmount * 100
    };
  
   const newBalance = +loanAmount * 100;
  //  const maxLoan = newBalance * 10
  
    // $inc increments the amount passed to the balance
    const user = await User.findByIdAndUpdate(decoded.id, {
      $inc: { balance: newBalance},
      $push: { transactions: loanTransaction }
      }, {new: true});
  
    // console.log(user)
    return res.status(200).json({success: true, userInfo: user})
    
  } catch (error) {
    return res.status(500).json({success: false, message: 'Internal server error.'})
  }

}

export async function transfer(req, res){
  try {
    const {transferAmount, email} = req.body;
    const amount = Number(transferAmount);
    const token = req.cookies.token;
   
    // If the token is missing or invalid, return an unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if(isNaN(amount) || amount <= 0){
      return res.status(400).json({success: false, message: 'Invalid transfer amount'});
    }
    
    // Verify the token and get user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(amount, decoded.id, email)
    
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // gets sender and recipients
      const sender = await User.findById(decoded.id).session(session);
      const recipient = await User.findOne({ email: email}).session(session);

      // transform amounts to cents
      const senderTransaction = {
        day: new Date(),
        transactionType: 'withdrawal',
        amount: amount * 100
      };
      const recipientTransaction = {
        day: new Date(),
        transactionType: 'deposit',
        amount: amount * 100
      };
  
      if(!sender || sender.balance < amount * 100){
        await session.abortTransaction();
        session.endSession();
        res.status(40).json({success: false, message: 'Insufficent balance or sender not found'});
      }
  
      if(!recipient){
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({success: false, message: 'Recipient not found'});
      }
  
      // deduct from sender
      sender.balance -= amount * 100;
      sender.transactions.push(senderTransaction)
      await sender.save({session});
  
      // add to recipient
      recipient.balance += amount * 100;
      recipient.transactions.push(recipientTransaction)
      await recipient.save({session});
  
      // commit and end session;
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({success: true, message: 'Transfer successful', userInfo: sender})
    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, message: 'Internal server error'})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Internal server error'})
  }

}

export async function deleteUser(req, res){
  try {
    const {token} = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.deleteOne({_id: decoded.id})
    res.status(201).json({success: true, message: 'User deleted successfully'})
    
  } catch (error) {
    console.log(error, 'Internal server error')
  }
}