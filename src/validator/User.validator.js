import { body } from "express-validator";


export const RegistrationValidator = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 8, max:20}).withMessage("Password must be between 8 to 20 characters"),
    body("MonthlyIncome").isInt().withMessage("Monthly Income must be an integer"),
    body("Profession").notEmpty().withMessage("Profession is required"),
    body("name").notEmpty().withMessage("Name is required")
];


export const LoginValidator = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 8, max:20 }).notEmpty().withMessage("Password is required")
];