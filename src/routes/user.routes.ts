import { Router } from "express";
import UserController from "../controllers/user.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

const UserRouter = Router();

UserRouter.post("/", UserController.create);
UserRouter.get("/", ensureAuthenticated, UserController.findAll);
UserRouter.get("/", ensureAuthenticated, UserController.findOne);
UserRouter.put("/:id", ensureAuthenticated, UserController.update);
UserRouter.get("/:token", UserController.findByToken);
UserRouter.delete("/:id", ensureAuthenticated, UserController.destroy);

export { UserRouter };
