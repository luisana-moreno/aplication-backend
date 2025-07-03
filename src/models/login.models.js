import { pool } from "../db.js";


export const loginUser = async (email) => {
    const query = 'SELECT * FROM "user" WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

