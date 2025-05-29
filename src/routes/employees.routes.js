import {Router} from 'express'
import {getEmp, getEmpid, postEmp, putEmpid, deleteEmpid } from '../controllers/employees.controllers.js';
import { pool } from '../db.js';


const router = Router();

router.get('/employees',getEmpid)

router.get('/employees/:id',getEmp)


router.post('/employees', postEmp)

router.put('/employees/:id', putEmpid)

router.delete('/employees/:id',deleteEmpid)

export default router; 