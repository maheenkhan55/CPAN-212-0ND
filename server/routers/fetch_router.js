import express from "express";
import fs from "fs";
import lodash from "lodash";
import path from "path";
import { uploadsDir } from "../middleware/multer.js";

const router = express.Router();

router.get("/single", (req, res) => {
    const uploadArray = fs.readdirSync(uploadsDir);
    const randomFile = lodash.sample(uploadArray);
    if (!randomFile) {
        return res.status(404).json({ message: "Empty directory" });
    }
    res.sendFile(path.join(uploadsDir, randomFile), (err) => {
        if (err) {
            res.status(500).send("Error sending file");
        }
    });
});

router.get("/multiple", (req, res) => {
  const uploadArray = fs.readdirSync(uploadsDir).filter(f =>
    [".png", ".jpg", ".jpeg", ".gif"].includes(path.extname(f).toLowerCase())
  );

  if (uploadArray.length === 0) {
    return res.status(404).json({ message: "Empty directory" });
  }

  const randomFiles = lodash.sampleSize(uploadArray, Math.min(3, uploadArray.length));
  const filePaths = randomFiles.map(f => `http://localhost:8000/uploads/${f}`);
  res.status(200).json(filePaths);
});

export default router;



{/*

    Use fs.readdirSync to read the uploads directory
    Use lodash.sample for random file selection for /single
    Use lodash.sampleSize for multiple random files for /multiple
    Filter image files by extension in /multiple
    Return meaningful 404 messages if no files

*/}