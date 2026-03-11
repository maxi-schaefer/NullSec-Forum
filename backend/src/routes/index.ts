import { Router } from "express";
import authRouter from "./auth.routes";
import threadRouter from "./thread.routes";
import categoryRouter from "./category.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/thread", threadRouter);

export default router;