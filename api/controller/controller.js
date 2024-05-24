import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Need to adjust login to hashed password
export async function login (req, res) {
  try {
    const {userEmail, password} = req.body;
    const user = await User.findOne({email: userEmail}).select('+password');

    console.log(req.headers)

    if(!user){
      return res.status(401).json({success: false, message: 'Invalid Credentials'})
    }

    // compares the password with the users password, so if 
    const isAuthorized = await bcrypt.compare(password, user.password )

    if(!isAuthorized){
      console.log('do not give token')
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
      res.cookie('token', token, {httpOnly: false})
      res.status(200).json({user, token});
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }

}

export async function logout(req, res){
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: false
  })
  res.status(200).json({success: true, message: 'Logged out successfully'});
}

export async function register (req, res) {
  try {
    const {userName, password, email} = req.body;
  
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = {
      user: userName,
      password: hashedPass,
      email
    }
    const user = await User.create(newUser);

    // create a session or token not to use the 5 min timeout.
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    })

    console.log(user)
    console.log('token', token)
    res.status(200).json({newUser, token})
    
  } catch (error) {
    console.log(error, error.message)
    res.status(401).json({success: false, message: error.message})
  }
  
}

export async function checkAuth(req, res){
  // set the token to be req.cookies so after logout it wont exists, now fix the errors
  const token = req.cookies;
  console.log(token)
  if(!token){
    return res.status(401).json({ success: false, isAuthenticated: false});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({success: true, isAuthenticated: true, userId: decoded.id})
  } catch (error) {
   return res.status(401).json({ success: false, isAuthenticated: false });
  }

}