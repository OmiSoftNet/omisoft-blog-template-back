import nodemailer from "nodemailer";
import CONFIG from "./";

const transporter = nodemailer.createTransport(
  {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: CONFIG.NODEMAILER_EMAIL,
      pass: CONFIG.NODEMAILER_IMAP_PASSWORD,
    },
  },
  { from: `OmiSoft <${CONFIG.NODEMAILER_EMAIL}>` }
);

export const mailer = (message: Object) => {
  transporter.sendMail(message, (err: Error | null) => {
    if (err) return console.log(err);
    console.log("Mail sent");
  });
};
