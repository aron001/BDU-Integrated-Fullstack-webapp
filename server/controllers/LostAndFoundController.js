import lostAndFoundModel from "../models/lostAndFoundModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating an lostAndFoundPost

export const createLostAndFound = async (req, res) => {
  const newLostFoundPost = new lostAndFoundModel(req.body);
  const {userId} = req.body
  try {
    const userData = await UserModel.findById(userId)
    const { password, ...otherDetails } = userData._doc;
    newLostFoundPost.lfOwnerData.push(otherDetails);
    await newLostFoundPost.save();
    res.status(200).json(newLostFoundPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// getting a lostAndFoundPost

export const getLostAndFoundPost = async (req, res) => {
  const id = req.params.lfId;

  try {
    const lostAndFoundPost = await lostAndFoundModel.findById(id);
    res.status(200).json(lostAndFoundPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update lostAndFoundPost
export const updateLostAndFoundPost = async (req, res) => {
  const id = req.params.lfId;
  const { userId } = req.body;
  try {
    const lostAndFoundPost = await lostAndFoundModel.findById(id);
    if (lostAndFoundPost.userId === userId) {
      await lostAndFoundPost.updateOne({ $set: req.body });
      const updatedData = await lostAndFoundModel.findById(id);
      res.status(200).json(updatedData);
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete an lostAndFoundPost
export const deleteLostAndFoundPost = async (req, res) => {
 
  const {lfId} = req.params;
  const {userId} = req.params;
  try {
    const lostAndFoundPost = await lostAndFoundModel.findById(lfId);
    if (lostAndFoundPost.userId === userId) {
      await lostAndFoundPost.deleteOne();
      res.status(200).json(lostAndFoundPost);
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get all adverts
export const getAllLostAndFoundPosts = async (req, res) => {
  try {
     const allLostAndFounds = await lostAndFoundModel.find().sort({_id:-1});
     res.status(200).json(allLostAndFounds)
  } catch (error) {
    res.status(500).json(error);
  }
};
