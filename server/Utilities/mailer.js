import transporter from "../Config/mailerConfig.js";

const mailSender = async (email, title, body) => {
  try {
    let info = await transporter.sendMail({
      from: "StudyHub || Sushil",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Email information", info);
    return info;
  } catch (error) {
    return error;
  }
};

export default mailSender;
