import { Router } from "express";
import { UserRouter } from "./UserRoutes";
import { PostRouter } from "./PostRoutes";
import { AuthenticateRouter } from "./AuthenticateUserRoutes";

const router = Router();

router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/sessions", AuthenticateRouter);

export { router };
