import express from "express";
import { subscribeToNewsletter } from "../controllers/newsletterController.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", subscribeToNewsletter);

export default newsletterRouter;
