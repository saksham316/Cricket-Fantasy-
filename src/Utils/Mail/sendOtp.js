// ----------------------------------------------imports------------------------------------------------
import nodemailer from "nodemailer";
// -----------------------------------------------------------------------------------------------------

// sendOtp - this method is used to send otp on users mail
export const sendOtpMail = (email, otp) => {
  // transporter - configuration nodemailer with credentials to send mail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });

  console.log(email)

  //   mailOptions - details of the user to whom the mail needs to be delivered
 let  mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "Cricket Fantasy OTP",
    html: `<h1>OTP - ${otp}</h1>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Otp Sent Successfully" + info.response);
      }
    });
  });
};
