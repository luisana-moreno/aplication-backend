import { pool } from "../db.js";
import { getE, getEid, postE, putEid, deleteEid } from "../models/employees.model.js";

export const getEmp = async (req, res) => {
    try {
        const empleados = await getE(); 
        res.status(200).json(empleados);
    } catch (error) {
        console.error("Error al obtener empleados:", error.message);
        res.status(500).json({ error: "Error al obtener empleados" });
    }
};


export const getEmpi = async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await getEid (id);


    if (!rows||rows.length === 0) {
        return res.status(404).json({ error: "empleado no encontrado" });
    }
    res.json(rows);
    }
    
    catch (error){
        console.error("Error al obtener empleado");
        res.status(500).send("Error al obtener empleado")
    }
}

export const postEmp = async (req, res) => {
    try {
        const data = req.body;
        const employee = await postE();
        res.json(employee)[0]


    } catch (error) {
        console.error("Error al insertar empleado:", error);
        res.status(500).send("Error al insertar empleado");
    }
}

export const putEmpid =async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body
        const rows= await putEid (id, data)
        res.json(rows)[0]
    }

    catch (error){
        console.error("Error al editar  empleado:", error);
        res.status(500).send("Error al editar  empleado");
    }
}


export const deleteEmpid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteEid (id);


    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"empleado no encontrado"});
    }
    res.json("empleado eliminado exitosamente");
    }
    
    catch (error){
        console.error ("Error al obtenet el empleado")
        res.status(500).send("Error al obtener el empleado")
    }
    
}