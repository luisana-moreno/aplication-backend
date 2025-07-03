import { getUsers,getUsersid, deleteUsersid, postUsers, putUsersid } from "../models/users.model.js";
import userSchema  from "../schemas/users.schemas.js";
import bcrypt from "bcryptjs";
import handleDatabaseError from "../utils/errors.js";   

export const getUser = async (req, res) => {

        const rows = await getUsers();  
        res.json(rows);
}

export const getUserid = async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await getUsersid (id);


    if (!rows) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(rows);
    } 
    
    catch (error){
        res.status(500).json({ message: error.message })
        handleDatabaseError(error, res);
    }
}

export const postUser = async (req, res) => {
    try {
        const data = req.body;
        
        const parseUser = userSchema.safeParse(data);
        if (!parseUser.success) {
            return res.status(400).json({ error: parseUser.error.errors });
        }
        const {password} = data
        
        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);
    
        const newUser = await postUsers({
            ...data,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: newUser,
        });


    } catch (error) {
        res.status(500).json({ message: error.message })
        handleDatabaseError(error, res);
    }
}

export const putUser = async (req, res) => {
    
    try {
        const { id } = req.params;
        const data = req.body;
        const parseUser = userSchema.safeParse(data);
        if (!parseUser.success) {
            return res.status(400).json({ error: parseUser.error.errors });
        }
        
        const { password } = data;

        let hashedPassword = password;
        if (password && !password.startsWith("$2a$") && !password.startsWith("$2b$")) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const users = await putUsersid(id, {
            ...data,
            password: hashedPassword,
        });

        res.status(200).json(users);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

export const deleteUserid = async (req, res) =>{
    try{
        const {id}= req.params;
        const rowCount = await deleteUsersid (id);


    if (!rowCount) {
        return res.status(404).json({error:"Usuario no encontrado"});
    }
    res.status(200).json("usuario eliminado exitosamente");
    }
    
    catch (error){
        res.status(500).json({ message: error.message })
        handleDatabaseError(error, res);
    }
    
}
