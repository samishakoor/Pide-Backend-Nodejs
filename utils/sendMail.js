const nodemailer = require("nodemailer");

module.exports = async function sendEmail(text) {
  try {
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "noreply@gmail.com",
      to: "samishakoor787@gmail.com",
      subject: "Password Reset",
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);

    if (error.code === "ENVELOPE") {
      console.error("Invalid email address:", to);
      return false;
    }
    return false;
  }
};
