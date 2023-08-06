import { Router } from "express";
const router = Router();

// Controllers
import controller from "../controllers/user.controller";

router.post("/", controller.create);

export default router;