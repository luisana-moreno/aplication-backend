import { pool } from "../db.js";
//get
export const getClient = async (req, res) => {
    const result = await pool.query('SELECT * FROM "client"');
    return result.rows;
};

//get id
export const getClientid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "client" WHERE  id_client=$1', [id])
    return rows [0]
}
//post

export const postClient = async (data) => {
    const query = 
        'INSERT INTO "client" (client_type, company_name, first_name, first_lastname, document_number, rif, phone, address, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )RETURNING *'
    const values = [
        data.client_type,
        data.company_name,
        data.first_name,
        data.first_lastname,
        data.document_number,
        data.rif,
        data.phone,
        data.address,
        data.email,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

//put
export const putClientid = async (id, data) => {
    const query = 
        'UPDATE "client" SET client_type = $1, company_name = $2, first_name = $3, first_lastname = $4, document_number = $5, rif = $6, phone = $7, address = $8, email = $9  WHERE id_client =$10  RETURNING *'
    const values = [
        data.client_type,
        data.company_name,
        data.first_name,
        data.first_lastname,
        data.document_number,
        data.rif,
        data.phone,
        data.address,
        data.email,
        id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteClientid = async (id) => {

    const { rowCount } = await pool.query('DELETE FROM "client" WHERE id_client = $1', [id]);

    return rowCount;
};


