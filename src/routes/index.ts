import { Router } from "express";
import { UserRouter } from "./user.routes";
import { PostRouter } from "./post.routes";
import { AuthenticateRouter } from "./authenticate-user.routes";

const router = Router();

router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/sessions", AuthenticateRouter);

export { router };
