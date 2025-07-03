import { getBovine, getBovineid, postBovine, putBovineid, deleteBovineid} from "../models/bovine.models.js";
import userSchema  from "../schemas/bovine.schemas.js";
import handleDatabaseError from "../utils/errors.js";


export const getBovines = async (req, res) => {

        const rows = await getBovine();  
        res.json(rows);

};

export const getBovinesid = async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await getBovineid (id);


    if (!rows||rows.length === 0) {
        return res.status(404).json({ error: "bovino no encontrado" });
    }
    res.json(rows);
    } 
    
    catch (error){
        handleDatabaseError(error, res);
    }
}

export const postBovines = async (req, res) => {
    try {
        const data = req.body;
        const parseUser = userSchema.safeParse(data);

    if (!parseUser.success) {
        return res.status(400).json({ 
            error: parseUser.error.errors });
    }

        const bovine = await postBovine(data);
        res.json(bovine)[0]


    } catch (error) {
        handleDatabaseError(error, res);
    }
}

export const putBovinesid =async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body
        const parseUser = userSchema.safeParse(data);

    if (!parseUser.success) {
        return res.status(400).json({ 
            error: parseUser.error.errors });
    }

        const rows= await putBovineid (id, data)
        res.json(rows)[0]
    }

    catch (error){
        handleDatabaseError(error, res);
    }
}


export const deleteBovinesid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteBovineid(id);

        console.log(rowCount);

    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"bovino no encontrado"});
    }
    res.json("bovino eliminado exitosamente");
    }
    
    catch (error){
        handleDatabaseError(error, res);
    }
    
}

// Obtener bovinos filtrados
export const getFilteredBovines = async (req, res) => {
    try {
        const filters = req.query; // Los filtros se envían como parámetros de consulta
        const rows = await getFilteredBovine(filters);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: "No se encontraron bovinos con los filtros especificados" });
        }

        res.json(rows);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};