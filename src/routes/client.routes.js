import {Router} from 'express'
import {getClients, getClientsid, postClients, putClientsid, deleteClientsid } from '../controllers/client.controllers.js';


const router = Router();

router.get('/client',getClients)

router.get('/client/:id',getClientsid)

router.post('/client', postClients)

router.put('/client/:id', putClientsid)

router.delete('/client/:id',deleteClientsid)

export default router; 