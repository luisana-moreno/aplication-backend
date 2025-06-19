import { pool } from "../db.js";

export const registerUser = async (data) => {
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

export const loginUser = async (email) => {
    const query = 'SELECT * FROM "user" WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export const getUserById = async (id) => {
    const query = 'SELECT * FROM "user" WHERE id_user = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

