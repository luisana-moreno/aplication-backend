import { pool } from "../db.js";
//get
export const getUsers = async (req, res) =>{
    const {rows} = await pool.query ('SELECT * FROM "user"')
    return rows
}
//get id
export const getUsersid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "user" WHERE  id_user=$1', [id])
    return rows 
}
//post 

export const postUsers = async (data) => {
    const query = 
        'INSERT INTO "user" (password, username,  email, rol) VALUES ($1, $2, $3, $4)RETURNING *'
    const values = [
        data.password,
        data.username,
        data.email, 
        data.rol
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

//put
export const putUsersid = async (id, data) => {
    const query = 
        'UPDATE "user" SET password =$1, username = $2,  email = $3, rol = $4 WHERE id_user=$5 RETURNING *'
    const values = [
        data.password,
        data.username,
        data.email,
        data.rol,
        id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteUsersid = async (id) =>{
    const {rowCount} = await pool.query ('DELETE from "user" WHERE id_user=$1 ' , [id])
    return rowCount
}  
