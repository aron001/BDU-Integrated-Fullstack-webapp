import QuestionModel from "../models/QuestionModel.js";
import UserModel from "../models/userModel.js";
import AnswerModel from "../models/AnswerModel.js";
import CategoryModel from "../models/CategoryModel.js";
import mongoose from "mongoose";

//creating a Question
export const createQuestion = async (req, res) => {
  const newQuestion = new QuestionModel(req.body);
  const { userId } = req.body;

  try {
    const userData = await UserModel.findById(userId);
    const { password, ...otherDetails } = userData._doc;
    newQuestion.questionOwnerData.push(otherDetails);
    await newQuestion.save();
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(500).json(error);
  }
};

//creating answers
export const createAnswer = async (req, res) => {
  const id = req.params.qId;
  const { userId } = req.body;
  const newAnswer = new AnswerModel(req.body);
  try {
    const userData = await UserModel.findById(userId);
    const { password, ...otherDetails } = userData._doc;
    newAnswer.answerOwnerData.push(otherDetails);
    newAnswer.questionId = id;
    await newAnswer.save();
    res.status(200).json(newAnswer);
  } catch (error) {
    res.status(500).json(error);
  }
};

// upvote/downvote an answer
export const voteAnswer = async (req, res) => {
  const ansId = req.params.ansId;
  const { userId, voteStatus } = req.body;
  try {
    const answer = await AnswerModel.findById(ansId);
    const hasUpvoted = answer.upVotes.includes(userId);
    const hasDownvoted = answer.downVotes.includes(userId)
    if (voteStatus === "up") {
      if (hasUpvoted) {
        await answer.updateOne({ $pull: { upVotes: userId } });
        res.status(200).json("upvote canceled")
      } else {
        if(hasDownvoted) await answer.updateOne({ $pull: { downVotes: userId } })
        await answer.updateOne({ $push: { upVotes: userId } });
        res.status(200).json("upvote committed")
      }
    } else if(voteStatus === "down") {
      if (hasDownvoted) {
        await answer.updateOne({ $pull: { downVotes: userId } });
        res.status(200).json("downvote canceled")
      } else {
        if (hasUpvoted) await answer.updateOne({ $pull: { upVotes: userId } });
        await answer.updateOne({ $push: { downVotes: userId } });
        res.status(200).json("downvote committed")
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a Question

export const getQuestion = async (req, res) => {
  const id = req.params.id;

  try {
    const question = await QuestionModel.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get an answer

export const getAnswer = async (req, res) => {
  const id = req.params.id;

  try {
    const answer = await AnswerModel.findById(id);
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update question
export const updateQuestion = async (req, res) => {
  const questionId = req.params.qId;
  const { userId } = req.body;

  try {
    const question = await QuestionModel.findById(questionId);
    if (question.userId === userId) {
      await question.updateOne({ $set: req.body });
      const updatedQuestion = await QuestionModel.findById(questionId);
      res.status(200).json(updatedQuestion);
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// update an answer

export const updateAnswer = async (req, res) => {
  const answerId = req.params.ansId;
  const { userId } = req.body;

  try {
    const answer = await AnswerModel.findById(answerId);
    if (answer.userId === userId) {
      await answer.updateOne({ $set: req.body });
      const updatedAnswer = await AnswerModel.findById(answerId);
      res.status(200).json(updatedAnswer);
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// delete a question
export const deleteQuestion = async (req, res) => {
  const id = req.params.qId;
  const { userId } = req.params;
  try {
    const question = await QuestionModel.findById(id);
    if (question.userId === userId) {
      await question.deleteOne();
      res.status(200).json("question deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete an answer
export const deleteAnswer = async (req, res) => {
  const id = req.params.ansId;
  const { userId } = req.params;
  try {
    const answer = await AnswerModel.findById(id);
    if (answer.userId === userId) {
      await answer.deleteOne();
      res.status(200).json("answer deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all questions

export const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await QuestionModel.find().sort({ _id: -1 });
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all answers

export const getAllAnswers = async (req, res) => {
  try {
    const allAnswers = await AnswerModel.find();
    res.status(200).json(
      allAnswers.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

//Category controllers

export const createCategory = async (req, res) => {
  console.log("in the create category");
  const newCategory = new CategoryModel(req.body);
  try {
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
};
