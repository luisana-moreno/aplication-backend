import {Router} from 'express'
import { getRoles, register } from '../controllers/register.controllers.js';

const router = Router();

router.get("/name_rol_enum", getRoles);
router.post('/register',register);

export default router; 