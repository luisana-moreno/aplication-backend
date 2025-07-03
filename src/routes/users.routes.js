import {Router} from 'express'
import {getUser, getUserid, deleteUserid, postUser, putUser} from '../controllers/users.controllers.js';
import {authenticateToken} from '../middlewares/auth.js';
import {requireAdmin} from '../middlewares/admtoken.js';


const router = Router();

router.get('/users', authenticateToken, getUser)  

router.get('/users/:id',authenticateToken, getUserid)

router.post('/users',requireAdmin,requireAdmin, postUser)

router.put('/users/:id',requireAdmin,requireAdmin, putUser)

router.delete('/users/:id',requireAdmin,requireAdmin,  deleteUserid)

export default router;  