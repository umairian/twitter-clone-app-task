import { Router } from "express";
const router: Router = Router();

// Routers
import userRouter from "./user.route";

router.use("/users", userRouter);

export default router;