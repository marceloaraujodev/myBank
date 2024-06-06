import express from 'express';
import {
  login, 
  logout, 
  register, 
  checkAuth,
  loans,
  transfer,
  deleteUser,
  forgotPassword
} from '../controller/controller.js'

const router = express.Router();

// user routes
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(register);
router.route('/checkauth').get(checkAuth);
router.route('/loans').post(loans);
router.route('/transfer').post(transfer);
router.route('/delete').delete(deleteUser);


router.route('/forgotpassword').post(forgotPassword);


export default router;