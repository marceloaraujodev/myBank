import express from 'express';
import {login, register} from '../controller/controller.js'

const router = express.Router();

// user routes


router.route('/login').post(login);
router.route('/register').post(register);


export default router