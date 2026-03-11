import { Router } from "express";
import { ThreadController } from "../controller/thread.controller";
import { authorize, requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:id", ThreadController.getById);
router.put("/:id", requireAuth, authorize("Admin", "Moderator"), ThreadController.update);
router.delete("/:id", requireAuth, authorize("Admin", "Moderator"), ThreadController.delete);

export default router;