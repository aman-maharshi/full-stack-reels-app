import mongoose, { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";

export interface InterfaceUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<InterfaceUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
) 

// run pre hook before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
})

const User = models?.User || model<InterfaceUser>("User", userSchema);

export default User;