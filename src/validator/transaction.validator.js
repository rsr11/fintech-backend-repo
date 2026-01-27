import { body } from "express-validator";

export const transactionValidation = [
    body("amountPaid").isInt({gt:0}).withMessage("Amount must be a number greater than 0"),
    body("category").notEmpty().withMessage("Category is required")
];