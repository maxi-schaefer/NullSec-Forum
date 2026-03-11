import { Router } from "express";
import { CategoryController } from "../controller/category.controller";
import { authorize, requireAuth } from "../middleware/auth";
import { ThreadController } from "../controller/thread.controller";

const router = Router();

// Categories itself
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.put("/:id", requireAuth, authorize("Admin"), CategoryController.update)
router.post("/", requireAuth, authorize("Admin"), CategoryController.create)
router.delete("/", requireAuth, authorize("Admin"), CategoryController.delete)

// Category threads
router.get("/:id/threads", ThreadController.getAllByCategory);
router.post("/:id/threads", requireAuth, ThreadController.create);

export default router;