import nodeMailer from "nodemailer";
import "dotenv/config";

export const transporter = nodeMailer.createTransport({
  service: process.env.SERVICE_EMAIL,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PWD_EMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
