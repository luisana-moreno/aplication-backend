import { getEmployee, getEmployeeid, postEmployee, putEmployeeid, deleteEmployeeid } from "../models/employees.model.js";
import userSchema  from "../schemas/employees.schemas.js";
import handleDatabaseError from "../utils/errors.js";

export const getEmp = async (req, res) => {
    try {
        const rows = await getEmployee(); 
        res.json(rows);
        
    } catch (error) {
        handleDatabaseError(error, res);
    } 
};


export const getEmpid = async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await getEmployeeid (id);


    if (!rows||rows.length === 0) {
        return res.status(404).json({ error: "empleado no encontrado" });
    }
    res.json(rows);
    }
    
    catch (error){ 
        handleDatabaseError(error, res);
    }
}

export const postEmp = async (req, res) => {
    try {
        const data = req.body;
        const parseUser = userSchema.safeParse(data);

        if (!parseUser.success) {
            return res.status(400).json({ 
                error: parseUser.error.errors });
        }
    
        const employee = await postEmployee(data);
        res.json(employee)[0]


    } catch (error) {
        handleDatabaseError(error, res);
    }
}

export const putEmpid =async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body
        const parseUser = userSchema.safeParse(data);

        if (!parseUser.success) {
            return res.status(400).json({ 
                error: parseUser.error.errors });
        }
    
        const rows= await putEmployeeid (id, data)
        res.json(rows)[0]
    }

    catch (error){
        handleDatabaseError(error, res);
    }
}


export const deleteEmpid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteEmployeeid (id);


    if (!rowCount || rowCount.length ===0) {
        return res.status(404).json({error:"empleado no encontrado"});
    }
    res.json("empleado eliminado exitosamente");
    }
    
    catch (error){
        handleDatabaseError(error, res);
    }
    
}