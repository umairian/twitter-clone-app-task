import { Router } from "express";
const router = Router();

// Controllers
import controller from "../controllers/user.controller";

router.post("/", controller.create);
router.post("/login", controller.login);

export default router;