import { pool } from "../db.js";
//get
export const getEmployee = async (req, res) => {
    const result = await pool.query('SELECT * FROM "employee"');
    return result.rows;
};

//get id
export const getEmployeeid = async (id) =>{
    const {rows} = await pool.query ('SELECT * FROM "employee" WHERE  id_employee=$1', [id])
    return rows [0]
}
//post

export const postEmployee = async (data) => {
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
export const putEmployeeid = async (id, data) => {
    const query = 
        'UPDATE "employee" SET name = $1, last_name = $2, document_number = $3, phone = $4, address = $5, contract_date = $6, position = $7  WHERE id_employee =$8  RETURNING *'
    const values = [
        data.name,
        data.last_name,
        data.document_number,
        data.phone,
        data.address,
        data.contract_date,
        data.position,
        id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


//delete
export const deleteEmployeeid = async (id) => {

    const { rowCount } = await pool.query('DELETE FROM "employee" WHERE id_employee = $1', [id]);

    return rowCount;
};


