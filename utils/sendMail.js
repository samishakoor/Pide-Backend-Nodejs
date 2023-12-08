const nodemailer = require("nodemailer");

module.exports = async function sendEmail(link, recipientEmail) {
  try {
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
      to: recipientEmail,
      subject: "Password Reset",
      html: `
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to reset it.</p>
      <a href="${link}">
        <button style="padding: 10px 20px; background-color: #007BFF; color: #ffffff; border: none; border-radius: 5px; text-decoration: none; cursor: pointer; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">
          Reset Password
        </button>
      </a>
      <p>If you did not request this password reset, please ignore this email. The link is valid for a limited time.</p>
      <p>Thank you,<br>PIDE</p>
    `,
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
