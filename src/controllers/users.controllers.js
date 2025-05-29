import { getU,getUid, deleteUid, postU, putUid } from "../models/users.model.js";

export const getUser = async (req, res) => {

        const rows = await getU(); 
        res.json(rows);

};

export const getUserid = async (req, res) => {
    try{
        const {id} = req.param;
        const rows = await getUid (id);


    if (!rows||rows.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(rows);
    }
    
    catch (error){
        console.error("Error al obtener usuario");
        res.status(500).send("Error al obtener usuario")
    }
}

export const postUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await postU(data);
        res.json(user)[0]


    } catch (error) {
        console.error("Error al insertar usuario:", error);
        res.status(500).send("Error al insertar usuario");
    }
}

export const putUser =async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body
        const rows= await putUid (id, data)
        res.json(rows)[0]
    }

    catch (error){
        console.error("Error al editar  usuario:", error);
        res.status(500).send("Error al editar  usuario");
    }
}


export const deleteUser = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteUid (id);


    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"Usuario no encontrado"});
    }
    res.json("usuario eliminado exitosamente");
    }
    
    catch (error){
        console.error ("Error al obtenet el usuario")
        res.status(500).send("Error al obtener el usuario")
    }
    
}