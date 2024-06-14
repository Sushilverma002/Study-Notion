import mongoose, { Schema } from "mongoose";
import mailSender from "../Utilities/mailer.js";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 5 * 60,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verfication mail from StudyHub",
      otp
    );
    console.log("Email Sent Sucessfully", mailResponse);
  } catch (error) {
    console.log("Error occur in sending the verification email", error);
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp); // this is basically for the current object/ it helps to make differnce between formal parameter and actual parameter
  next();
});
export default mongoose.model("OTP", OTPSchema);
