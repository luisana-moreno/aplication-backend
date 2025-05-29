import {Router} from 'express'
import { getUser, getUserid, deleteUserid, postUser, putUser} from '../controllers/users.controllers.js';


const router = Router();

router.get('/users',getUser) 

router.get('/users',getUserid)


router.post('/users', postUser)

router.put('/user/:id', putUser)

router.delete('/users/:id',deleteUserid)

export default router; 