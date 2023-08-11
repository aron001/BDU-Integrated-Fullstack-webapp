import express from "express";
import {
  createLostAndFound,
  deleteLostAndFoundPost,
  updateLostAndFoundPost,
  getAllLostAndFoundPosts,
  getLostAndFoundPost,
} from "../controllers/LostAndFoundController.js";

const router = express.Router();

router.post("/create", createLostAndFound);
router.get("/:lfId/get", getLostAndFoundPost);
router.get("/getAll", getAllLostAndFoundPosts);
router.put("/:lfId/update", updateLostAndFoundPost);
router.delete("/:lfId/:userId/delete", deleteLostAndFoundPost);

export default router;
