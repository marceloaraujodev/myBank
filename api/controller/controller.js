import User from '../model/user.js';
import bcrypt from 'bcrypt';

export async function login (req, res) {
  try {
    const {user, password} = req.body;
    console.log(user)
  
    const logginUser = await User.findOne({user});
    
    console.log(logginUser)
    if(password !== logginUser.password){
      res.status(401).json({
        success: 'fail',
        message: 'Username or Password does not match!'
      })
    }
    
    res.json('ok');
  } catch (error) {
    
  }

}

export async function signup (req, res) {
  const {user, password} = req.body;
  console.log(user, password)
  const newUser = {
    user,
    password
  }
  await User.create(newUser);
}