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
        'INSERT INTO "bovine" (bovine_number, breed_bovine, date_birth, color, weight, stage_bovine, status_bovine) VALUES ($1, $2, $3, $4, $5, $6, $7)RETURNING *'
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
        'UPDATE "bovine" SET bovine_number = $1, breed_bovine = $2,  date_birth = $3, color = $4, weight = $5, stage_bovine = $6, status_bovine =$7 WHERE id_user=$8   RETURNING *'
    const values = [
        data.bovine_number,
        data.breed_bovine,
        data.date_birth,
        data.color,
        data.weight, 
        data.stage_bovine,
        data.status_bovine,
        id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteBovineid = async (id) =>{
    const {rowCount} = await pool.query ('DELETE  from "bovine" WHERE id_bovine=$1 ' , [id])
    return rowCount [0]
}  

//obtener por filtros
export const getFilteredBovine = async (filters) => {
    const query = `
        SELECT * FROM "bovine"
        WHERE ($1::text IS NULL OR bovine_number::text LIKE $1)
        AND ($2::text IS NULL OR breed_bovine = $2)
        AND ($3::date IS NULL OR date_birth = $3)
        AND ($4::text IS NULL OR color = $4)
        AND ($5::float IS NULL OR weight = $5)
        AND ($6::text IS NULL OR stage_bovine = $6)
        AND ($7::text IS NULL OR status_bovine = $7)
    `;
    const values = [
        filters.cattle_number ? `%${filters.cattle_number}%` : null,
        filters.breed_bovine || null,
        filters.date_birth || null,
        filters.color_cattle || null,
        filters.weight || null,
        filters.stage || null,
        filters.statu_cattle || null,
    ];

    const { rows } = await pool.query(query, values);
    return rows;
};
