import express from 'express';
import morgan from 'morgan';
import user from './routes/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
dotenv.config();



const app = express();

app.use(cookieParser()); // cookie parser

app.use(morgan('dev')); // logger
app.use(cors({
  origin:  ['http://localhost:5173', 'https://mybank-client.onrender.com'],
  // origin:  'https://mybank-client.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust this based on your needs
  credentials: true
}));
app.use(express.json());


//importing routes
app.use('/api/v1', user);


const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE)
  console.log('Connected to DB successfully');
}
connectDB();

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

server.on('close', () => {
  console.log('Server shutting down');
});