import User from '../model/user.js';
import bcrypt, { hash } from 'bcrypt';

export async function login (req, res) {
  try {
    const {userName, password} = req.body;
    console.log(userName, password)

    const logginUser = await User.findOne({user: userName});
    
    console.log(logginUser)
    if(password !== logginUser.password){
      res.status(401).json({
        success: 'fail',
        message: 'Username or Password does not match!'
      })
    }
    
    res.status(200).json(logginUser);
  } catch (error) {
    console.log(error)
  }

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

    console.log(user)
    res.json(newUser)
    
  } catch (error) {
    console.log(error, error.message)
    res.status(401).json({success: false, message: error.message})
  }
  
}