import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.sendotpusername,
    pass: process.env.sendotppassword,
  },
});