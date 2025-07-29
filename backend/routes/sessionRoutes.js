import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
  deleteSession
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/sessions", getAllSessions);
router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/my-sessions/:id", authMiddleware, getSessionById);
router.post("/my-sessions/save-draft", authMiddleware, saveDraft);
router.post("/my-sessions/publish", authMiddleware, publishSession);
router.delete("/my-sessions/:id", authMiddleware, deleteSession);  // ✅ NEW

export default router;
