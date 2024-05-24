import User from '../model/user.js';
import bcrypt, { hash } from 'bcrypt';


// Need to adjust login to hashed password
export async function login (req, res) {
  try {
    const {userName, password} = req.body;
    console.log(userName, password)

    const user = await User.findOne({user: userName});

    const response = await bcrypt.compare(password, user.password )
    console.log(res)
    
    console.log(user)
    if(!response){
      res.status(403).json({
        success: false,
        message: 'User name or password not correct. Please try again.'
      })
    }

    
    res.status(200).json(user);
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