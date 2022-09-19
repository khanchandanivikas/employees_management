const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const employeeControllers = require("../controllers/employee-controllers");

// create new employee
router.post(
  "/create_employee",
  [
    check("fullName").not().isEmpty(),
    check("department").not().isEmpty(),
    check("role").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phoneNumber").isNumeric(),
    check("gender").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
  ],
  employeeControllers.createNewEmployee
);

// get all employees list
router.get("/get_all_employees", employeeControllers.getAllEmployees);

// get employee by id
// router.get("/get_by_id/:id", employeeControllers.getEmployeeById);

// get employee by email
// router.get("/get_by_email/:email", employeeControllers.getEmployeeByEmail);

// modify employee by id
// router.patch("/modify/:id", employeeControllers.modifyEmployeeById);

// delete employee by id
// router.delete("/delete/:id", employeeControllers.deleteEmployeeById);

module.exports = router;