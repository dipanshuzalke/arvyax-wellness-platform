import Session from "../models/Session.js";

// ✅ Get all published sessions (Public)
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).populate("user_id", "email");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get user’s own sessions (Draft + Published)
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get a single session (only user’s own)
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Save or Update Draft (Auto-save)
export const saveDraft = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    // check if there's an existing draft (optional: based on _id for editing)
    let session = await Session.findOne({ user_id: req.user.id, status: "draft" });

    if (session) {
      // update existing draft
      session.title = title;
      session.tags = tags ? tags.split(",").map(t => t.trim()) : [];
      session.json_file_url = json_file_url;
      session.updated_at = new Date();
      await session.save();
    } else {
      // create a new draft
      session = await Session.create({
        user_id: req.user.id,
        title,
        tags: tags ? tags.split(",").map(t => t.trim()) : [],
        json_file_url,
        status: "draft",
      });
    }

    res.json({ message: "✅ Draft saved successfully", session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Publish a Session
export const publishSession = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    // create published session
    const session = await Session.create({
      user_id: req.user.id,
      title,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      json_file_url,
      status: "published",
    });

    res.status(201).json({ message: "✅ Session published", session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
