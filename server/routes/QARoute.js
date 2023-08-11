import express from "express";
import {
  deleteQuestion,
  updateQuestion,
  getQuestion,
  voteAnswer,
  createAnswer,
  createQuestion,
  getAnswer,
  updateAnswer,
  deleteAnswer,
  getAllQuestions,
  getAllAnswers,
  createCategory,
  getAllCategories,
} from "../controllers/QAController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
const router = express.Router();
//question routes
router.post("/question/create", createQuestion);
router.get("/question/:qId/get", getQuestion);
router.put("/question/:qId/update", updateQuestion);
router.delete("/question/:qId/:userId/delete", deleteQuestion);
router.get("/question/getAll", getAllQuestions)
 
//answer routes
router.post("/answer/:qId/create", createAnswer);
router.get("/answer/:ansId/get", getAnswer);
router.put("/answer/:ansId/vote", voteAnswer);
router.put("/answer/:ansId/update", updateAnswer);
router.delete("/answer/:ansId/:userId/delete", deleteAnswer);
router.get("/answer/getAll", getAllAnswers);

//category routes
router.post("/category/create", createCategory);
router.get("/category/getAll", getAllCategories);




export default router;
