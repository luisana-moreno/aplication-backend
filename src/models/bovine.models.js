import { pool } from "../db.js";
//get
export const getBovine = async (req, res) =>{
    const {rows} = await pool.query ('SELECT * FROM "bovine"')
    return rows
}
//get id
export const getBovineid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "bovine" WHERE  id_bovine=$1', [id])
    return rows [0]
}
//post

export const postBovine = async (data) => {
    const query = 
        'INSERT INTO "bovine" (bovine_number, breed_bovine, date_birth, color, weight, stage_bovine, statu_bovine) VALUES ($1, $2, $3, $4, $5, $6, $7)RETURNING *'
    const values = [
        data.bovine_number,
        data.breed_bovine,
        data.date_birth,
        data.color,
        data.weight, 
        data.stage_bovine,
        data.status_bovine
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

//put
export const putBovineid = async (id, data) => {
    const query = 
        'UPDATE "bovine" SET bovine_number = $1, breed_bovine = $2,  date_birth = $3, color = $4, weight = $5, stage_bovine = $6 statu_bovine =$7 RETURNING *'
    const values = [
        data.bovine_number,
        data.breed_bovine,
        data.date_birth,
        data.color,
        data.weight, 
        data.stage_bovine,
        data.status_bovine
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteBovineid = async (id) =>{
    const {rowCount} = await pool.query ('DELETE "bovine" WHERE id_bovine=$1 ' , [id])
    return rowCount [0]
}  
