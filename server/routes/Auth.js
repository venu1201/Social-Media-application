import express from 'express';
import { google_auth ,signin,signup} from '../controllers/Authcontroller.js';
const router=express.Router();
router.post('/signin',signin);
router.post('/signup',signup);

router.post('/googleauth',google_auth)

export default router;