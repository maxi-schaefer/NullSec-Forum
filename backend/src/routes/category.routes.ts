import { Router } from "express";
import { CategoryController } from "../controller/category.controller";
import { authorize, requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.put("/:id", requireAuth, authorize("Admin"), CategoryController.update)
router.post("/", requireAuth, authorize("Admin"), CategoryController.create)
router.delete("/", requireAuth, authorize("Admin"), CategoryController.delete)

export default router;