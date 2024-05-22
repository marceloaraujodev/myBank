import User from '../model/user.js';
import bcrypt from 'bcrypt';

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



export async function signup (req, res) {
  const {user, password} = req.body;
  console.log(user, password)
  const newUser = {
    user,
    password
  }
  await User.create(newUser);
}