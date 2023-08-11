import advertModel from "../models/advertModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating an advert

export const createAdvert = async (req, res) => {
  const newAdvert = new advertModel(req.body);
  const { userId } = req.body;
  try {
    const userData = await UserModel.findById(userId);
    const { password, ...otherDetails } = userData._doc;
    newAdvert.creatorData.push(otherDetails);
    await newAdvert.save();
    res.status(200).json(newAdvert);
  } catch (error) {
    res.status(500).json(error);
  }
};

// getting an advert

export const getAdvert = async (req, res) => {
  const adId = req.params.adId;

  try {
    const advert = await advertModel.findById(adId);
    res.status(200).json(advert);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updateAdvert = async (req, res) => {
  const adId = req.params.adId;
  const { userId } = req.body;

  try {
    const advert = await advertModel.findById(adId);
    if (advert.userId === userId) {
      await advert.updateOne({ $set: req.body });
      const updatedAdvert = await advertModel.findById(adId);
      res.status(200).json(updatedAdvert);
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete an advert
export const deleteAdvert = async (req, res) => {
  const { adId } = req.params;
  const { userId } = req.params;
  try {
    const advert = await advertModel.findById(adId);
    if (advert.userId === userId) {
      await advert.deleteOne();
      res.status(200).json("advert deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all adverts
export const getAllAdverts = async (req, res) => {
  try {
    const allAdverts = await advertModel.find().sort({_id:-1});
    res.status(200).json(allAdverts);
  } catch (error) {
    res.status(500).json(error);
  }
};
