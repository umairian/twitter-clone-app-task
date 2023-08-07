import { Router } from "express";
const router: Router = Router();

// Controllers
import controller from "../controllers/user.controller";

// Routes
import postRouter from "./post.route";

// Middlewares
import authenticateUser from "../middlewares/authenticateUser";

router.post("/", controller.create);
router.post("/login", controller.login);
router.get("/:userId/searchUsers", authenticateUser, controller.search);
router.post("/:userId/follow", authenticateUser, controller.follow);
router.get("/:userId/profile", authenticateUser, controller.profile);
router.use("/:userId/posts", authenticateUser, postRouter);

export default router;