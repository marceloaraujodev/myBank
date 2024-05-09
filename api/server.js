import express from 'express';
import morgan from 'morgan';
import user from './routes/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';
dotenv.config();


const app = express();

app.use(morgan('dev')); // logger
// app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser()); // cookie parser

//importing routes
app.use('/api/v1', user);




const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE)
  console.log('Connected to DB successfully');
}
connectDB();

const PORT = 4000;
const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

server.on('close', () => {
  console.log('Server shutting down');
});