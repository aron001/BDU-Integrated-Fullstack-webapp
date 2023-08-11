import express from "express";
import {createAdvert, deleteAdvert, updateAdvert, getAdvert, getAllAdverts} from "../controllers/AdvertController.js"

const router = express.Router();

router.post('/create',createAdvert);
router.get('/:adId/get',getAdvert);
router.get('/getAll',getAllAdverts);
router.put('/:adId/update',updateAdvert);
router.delete('/:adId/:userId/delete',deleteAdvert);

export default router;