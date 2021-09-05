import { Router } from "express";
import AuthenticateUserController from "../controllers/authenticate-user.controller";

const AuthenticateRouter = Router();

AuthenticateRouter.post("/", AuthenticateUserController.authenticate);

export { AuthenticateRouter };
