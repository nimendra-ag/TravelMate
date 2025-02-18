import express from "express";
import { getCities } from "../controller/CityController.js";
const cityRouter = express.Router();

cityRouter.get('/getCities', getCities);


export default cityRouter;