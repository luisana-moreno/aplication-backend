import {Router} from 'express'
import {getEmpid, getEmp, postEmp, putEmpid, deleteEmpid } from '../controllers/employees.controllers.js';


const router = Router();

router.get('/employees',getEmp)

router.get('/employees/:id',getEmpid)

router.post('/employees', postEmp) 

router.put('/employees/:id', putEmpid)

router.delete('/employees/:id',deleteEmpid)

export default router; 