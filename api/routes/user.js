import express from 'express';
import {login} from '../controller/controller.js'

const router = express.Router();

// user routes


router.route('/login').post(login);
router.route('/signup');

export default router