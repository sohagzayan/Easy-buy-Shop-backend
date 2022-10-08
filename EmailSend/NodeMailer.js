const nodemailer = require("nodemailer");
const SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      form: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: `
        <div style="width: 70%">
        <h2>Quality<span style="color:#198DCF">C</span>ookie</h2>
        <h1 style="color:#198DCF ; margin-bottom: 10px">Hi, MD Najmul</h1>
        <div style="border: 1px solid #E6E6E6  ; padding : 10px ; border-radius : 10px ; margin-top : 15px ; width : 100%">
        <h3 style="margin-bottom : 10px">We're happy you signed up for Qulity Cookie. To Start expoloring the productapp nad neighborhood, pleace conform your email address</h3>
        <a href=${text} style="background: #198DCF; border: none; border-radius: 5px; color: #fff; padding: 15px 40px ; margin :30px 0px ; display: inline-block  ; font-size:18px ">Verify Now</a>
        <h3>Welcome to Ring!</h3>
        <h3>The <span style="color: #198DCF">QualityCookie</span> Team</h3>
        </div>
        <h3>Did you receive this email without signing up? <a style="color: #198DCF"href=${text} >Click here</a>. This verification link will expaire in 24 hours</h3>
        </div>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = SendEmail;
