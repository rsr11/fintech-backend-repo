import express from "express";
import { userAuthentication } from "../middlewares/auth.middleware.js";
import { Last10DayData, transactionSummary } from "../controllers/analytics.controller.js";


const route = express.Router();



route.get(`/analyticSummary`, userAuthentication, transactionSummary );

route.get('/last-10-day-data', userAuthentication, Last10DayData );






export default route;