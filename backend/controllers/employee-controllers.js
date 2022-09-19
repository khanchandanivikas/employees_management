const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Employee = require("../models/employee");
const { createError, isValidEmail } = require("../helpers");

// create new employee
const createNewEmployee = async (req, res, next) => {
  const {
    fullName,
    department,
    role,
    email,
    phoneNumber,
    age,
    gender,
    active,
  } = req.body;
  // check validations
  const errores = validationResult(req);
  if (!errores.isEmpty() || !isValidEmail(email)) {
    return next(createError(422, "Validation error. Check the datas"));
  }
  //   check if employee with email exists
  let existsEmployee;
  try {
    existsEmployee = await Employee.findOne({
      email: email,
    });
  } catch (err) {
    return next(createError(500, "There was a problem with the operation"));
  }
  //   if employee with same email exists
  if (existsEmployee) {
    return next(createError(401, "Employee already exists with this e-mail"));
  } else {
    //   if employee does not exist the create new employee
    const newEmployee = new Employee({
      fullName,
      department,
      role,
      email,
      phoneNumber,
      age,
      gender,
      active,
    });
    // save the created employee
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newEmployee.save({
        session: sess,
      });
      await sess.commitTransaction();
    } catch (err) {
      return next(createError(500, "The datas could not be saved"));
    }
    res.status(201).send({
      success: true,
      message: "New employee created successfully",
      newEmployee,
    });
  }
};

// get all employees list
const getAllEmployees = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.find();
  } catch (err) {
    return next(createError(500, "Validation error. Datas could not be saved"));
  }
  res
    .status(200)
    .send({
      success: true,
      message: "employees recieved successfully",
      employees,
    });
};

exports.createNewEmployee = createNewEmployee;
exports.getAllEmployees = getAllEmployees;
