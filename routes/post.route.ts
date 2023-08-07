import { Router } from "express";
const router = Router();

// Controllers
import controller from "../controllers/post.controller";

router.post("/", controller.create);
router.delete("/:postId", controller.delete)

export default router;