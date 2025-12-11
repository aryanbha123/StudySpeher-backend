import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // optional fields
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// -----------------------------------------
// HASH PASSWORD BEFORE SAVE
// -----------------------------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// -----------------------------------------
// COMPARE PASSWORD METHOD
// -----------------------------------------
userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
