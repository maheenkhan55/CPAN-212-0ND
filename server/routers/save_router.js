import express from "express";
import { uploadFunction } from "../middleware/multer.js";

const router = express.Router();

// handle single file uplaod
router.post("/single", uploadFunction.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Single file uploaded successfully",
    file: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    }
  });
});

// handle multiple file uplaod
router.post("/multiple", uploadFunction.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  res.status(200).json({
    message: "Multiple files uploaded successfully",
    files: req.files.map(f => ({
      filename: f.filename,
      path: `/uploads/${f.filename}`
    }))
  });
});

export default router;

