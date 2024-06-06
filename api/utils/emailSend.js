import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// data param comes from frontend
const emailSend = async (data) => {
  const transporter = nodemailer.createTransport({
    // mailtrap.io
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });
  

  const message = {
    from: 'ppzmarcelo@gmail.com', // // this is usually contact@url.com
    to: data.email,
    subject: data.subject,
    text: data.message, 
  }
  console.log(message)
  try {
    await transporter.sendMail(message);
    
  } catch (error) {
    console.log(error.message)
  }

}



export default emailSend;