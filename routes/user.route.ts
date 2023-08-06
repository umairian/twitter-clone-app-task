import { Router } from "express";
const router = Router();

// Controllers
import controller from "../controllers/user.controller";

// Routes
import postRouter from "./post.route";

// Middlewares
import authenticateUser from "../middlewares/authenticateUser";

router.post("/", controller.create);
router.post("/login", controller.login);
router.use("/:userId/posts", authenticateUser, postRouter);

export default router;