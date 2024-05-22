import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface UserType {
    username: string;
    password: string;
  }

export interface UserModelType extends UserType, Document {
  validatePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<UserModelType> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

userSchema.methods.validatePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

export const UserModel = mongoose.model<UserModelType>("users", userSchema);
