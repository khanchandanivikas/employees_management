const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

employeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Employee", employeeSchema);
