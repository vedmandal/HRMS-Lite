import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    department: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);