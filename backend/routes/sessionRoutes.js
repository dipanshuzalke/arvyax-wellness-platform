import express from "express";
import {
  getAllSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
} from "../controllers/sessionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public route
router.get("/sessions", getAllSessions);

// ✅ Protected routes
router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/my-sessions/:id", authMiddleware, getSessionById);
router.post("/my-sessions/save-draft", authMiddleware, saveDraft);
router.post("/my-sessions/publish", authMiddleware, publishSession);

export default router;
