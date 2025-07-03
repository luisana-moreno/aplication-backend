import { getClient, getClientid, postClient, putClientid, deleteClientid } from "../models/client.models.js";
import clientSchemas from "../Schemas/client.shemas.js";
import handleDatabaseError from "../utils/errors.js";

export const getClients = async (req, res) => {
    try {
        const rows = await getClient(); 
        res.json(rows);
        
    } catch (error) {
        handleDatabaseError(error, res);
    }
};


export const getClientsid = async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await getClientid (id);


    if (!rows||rows.length === 0) {
        return res.status(404).json({ error: "cliente no encontrado" });
    }
    res.json(rows);
    }
    
    catch (error){ 
        handleDatabaseError(error, res);
    }
}

export const postClients = async (req, res) => {
    try {
        const data = req.body;
        const parseUser = userSchema.safeParse(data);

        if (!parseUser.success) {
            return res.status(400).json({ 
                error: parseUser.error.errors });
        }
    
        const client = await postClient(data);
        res.json(client)[0]


    } catch (error) {
        handleDatabaseError(error, res);
    }
}

export const putClientsid =async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body
        const parseUser = userSchema.safeParse(data);

        if (!parseUser.success) {
            return res.status(400).json({ 
                error: parseUser.error.errors });
        }
    
        const rows= await putClientid (id, data)
        res.json(rows)[0]
    }

    catch (error){
        handleDatabaseError(error, res);
    }
}


export const deleteClientsid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteClientid (id);


    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"cliente no encontrado"});
    }
    res.json("cliente eliminado exitosamente");
    }
    
    catch (error){
        handleDatabaseError(error, res);
    }
    
}