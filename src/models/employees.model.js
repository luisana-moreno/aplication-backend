import { pool } from "../db.js";
//get
export const getE = async () => {
    const result = await pool.query('SELECT * FROM "employee"');
    return result.rows;
};
//get id
export const getEid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "employee" WHERE  id_employee=$1', [id])
    return rows []
}
//post

export const postE = async (data) => {
    const query = 
        'INSERT INTO "employee" (name, last_name, document_number, phone, address, contract_date, position) VALUES ($1, $2, $3, $4, $5, $6, $7)RETURNING *'
    const values = [
        data.name,
        data.last_name,
        data.document_number,
        data.phone,
        data.address,
        data.contract_date,
        data.position
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

//put
export const putEid = async (id, data) => {
    const query = 
        'UPDATE "employee" SET name = $1, last_name = $2, document_number = $3, phone = $4, address = $5, contract_date = $6, position = $7  RETURNING *'
    const values = [
        data.name,
        data.last_name,
        data.document_number,
        data.phone,
        data.address,
        data.contract_date,
        data.position
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteEid = async (id) => {



    const { rowCount } = await pool.qudry('DELETE FROM "employee" WHERE id_employee = $1', [id]);

    return rowCount;
};


