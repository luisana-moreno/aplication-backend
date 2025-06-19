import { Router } from 'express';
import { register, logout, login } from '../controllers/login.controllers.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);


export default router;