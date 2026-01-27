import express from 'express';
import { BalanceDetail, categoryListing, transferMoney } from '../controllers/transaction.controller.js';
import { userAuthentication } from '../middlewares/auth.middleware.js';
import { transactionValidation } from '../validator/transaction.validator.js';
import { dataValidator } from '../middlewares/validation.middleware.js';





const route = express.Router();


route.get('/categoryListing', categoryListing);

route.post('/transfer',userAuthentication, transactionValidation, dataValidator,transferMoney);

route.get(`/getBalanceDetail`,userAuthentication,BalanceDetail);




export default route;




