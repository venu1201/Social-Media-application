import express from 'express';
import { getusers, getuserbyId, getProfileData, getNetwork, removeNetwork, updateUser, addNetwork, getTopCreators, getNetworkByQuery, SavePost, UpdateNotifications } from '../controllers/usercontroller.js';
const router=express.Router();

router.post('/users',getusers)
// router.get('/:id',getuserbyid);
// router.get('/:id',getselfdata);

router.get('/:id',getuserbyId);
router.get('/TopCreators/byFormula',getTopCreators);
router.get('/Profile/:id',getProfileData);
router.get('/Network/:user/:type',getNetwork);
router.post('/Network/:type/:user/:touser',removeNetwork);
router.post('/Network/:user/:touser',addNetwork);
router.post('/update',updateUser);
router.get('/NetworkbyQuery/:query',getNetworkByQuery);
router.post('/SavePost/:user/:id',SavePost);
router.post('/UpdateNotifications/:user',UpdateNotifications);
export default router;