import express from 'express'
import { createChat, findChat, getAllChat, userChats } from '../controllers/ChatController.js';
const router = express.Router()

router.post('/new/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.get('/', getAllChat);

export default router