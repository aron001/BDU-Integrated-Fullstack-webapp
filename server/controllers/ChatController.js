import ChatModel from "../models/chatModel.js";

export const getAllChat = async (req, res) => {
  try {
      const allChats = await ChatModel.find();
      res.status(200).json(allChats);
  } catch (error){
    res.status(500).json(error);
  }
};

export const createChat = async (req, res) => {
  const sender = req.body.senderId;
  const receiver = req.body.receiverId;
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const oldChat = await ChatModel.findOne({$and:[{members:{$in:[sender]}},{members:{$in:[receiver]}}]})
    //const oldReceiver = await ChatModel.find({members:{$in:[receiver]}})
const saveChat = (sen,rec)=>{
  if(newChat.members[0]===sen && newChat.members[1]===rec)
      return res.status(400).json("chat pair already exist, so not created!")
    }
    if(oldChat) 
    {
     
      const sen= oldChat.members[0]
       const rec= oldChat.members[1]
      return saveChat(sen,rec);
    } 
    
    const result = await newChat.save();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};