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
        'INSERT INTO "user" (password, name, last_name, email, phone, rol) VALUES ($1, $2, $3, $4, $5, $6)RETURNING *'
    const values = [
        data.password,
        data.name,
        data.last_name,
        data.email,
        data.phone, 
        data.rol
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

//put
export const putUsersid = async (id, data) => {
    const query = 
        'UPDATE "user" SET password =$1, name = $2, last_name = $3, email = $4, phone = $5, rol = $6 WHERE id_user=$7 RETURNING *'
    const values = [
        data.password,
        data.name,
        data.last_name,
        data.email,
        data.phone,
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
