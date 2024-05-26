import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
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
    expires: new Date(0), // Set expiration date to immediately expire
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
    path: '/' 
  })
  res.status(200).json({ success: true, message: 'Logged out successfully' });
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

    // console.log(user)
    // console.log('token', token)
    res.status(200).json({newUser, token})
    
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
    console.log(token)
    
    // If the token is missing or invalid, return an unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    const user = await User.findById(decoded.id);
    console.log(user)
    
    // If the token is valid, the user is authenticated
    res.status(200).json({ success: true, userInfo: user});
  } catch (error) {
    // If token verification fails, return an unauthorized response
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

}

// gets loan request and adds to db and balance
export async function loans(req, res){
  const {id, loanAmount} = req.body;
  //$inc increments the amount passed to the balance
  const user = await User.findByIdAndUpdate(id, {$inc: { balance: Number(loanAmount)}}, {new: true});

  console.log(user)
}