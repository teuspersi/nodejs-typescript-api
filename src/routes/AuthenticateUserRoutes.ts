import { Router } from "express";
import AuthenticateUserController from "../controllers/AuthenticateUserController";

const AuthenticateRouter = Router();

AuthenticateRouter.post("/", AuthenticateUserController.authenticate);

export { AuthenticateRouter };
