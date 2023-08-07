import { Router } from "express";
const router = Router();

// Controllers
import controller from "../controllers/post.controller";

router.post("/", controller.create);
router.delete("/:postId", controller.delete);
router.put("/:postId/like", controller.like)

export default router;