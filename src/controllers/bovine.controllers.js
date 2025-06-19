import { getBovine, getBovineid, postBovine, putBovineid, deleteBovineid} from "../models/bovine.models.js";
import userSchema  from "../Schemas/bovine.schemas.js";

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
        console.error("Error al obtener bovino");
        res.status(500).send("Error al obtener bovino")
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
        console.error("Error al insertar bovino:", error);
        res.status(500).send("Error al insertar bovino");
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
        console.error("Error al editar  bovino:", error);
        res.status(500).send("Error al editar  bovino");
    }
}


export const deleteBovinesid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteBovineid (id);


    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"bovino no encontrado"});
    }
    res.json("bovino eliminado exitosamente");
    }
    
    catch (error){
        console.error ("Error al obtenet el bovino")
        res.status(500).send("Error al obtener el bovino")
    }
    
}