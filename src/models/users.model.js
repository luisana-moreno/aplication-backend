import { pool } from "../db.js";
//get
export const getU = async (req, res) =>{
    const {rows} = await pool.query ('SELECT * FROM "user"')
    return rows
}
//get id
export const getUid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "user" WHERE  id_user=$1', [id])
    return rows [0]
}
//post

export const postU = async (data) => {
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
export const putUid = async (id, data) => {
    const query = 
        'UPDATE "user" SET password =$1, name = $2, last_name = $3, email = $4, phone = $5, rol = $6 RETURNING *'
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


//delete
export const deleteUid = async (id) =>{
    const {rowCount} = await pool.query ('DELETE FROM "user" WHERE id_user=$1 ' , [id])
    return rowCount
}  
