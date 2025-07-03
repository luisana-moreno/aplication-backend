import { pool } from "../db.js";

export const registerUser = async (data) => {
    const query = 
        'INSERT INTO "user" (password, username,  email, phone, rol) VALUES ($1, $2, $3, $4, $5)RETURNING *'
    const values = [
        data.password,
        data.username,
        data.email,
        data.rol
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}; 

export const getRoles = async () => {
    const query = 'SELECT id, name_rol FROM "roles_enum"';
    const { rows } = await pool.query(query);
    return rows; // Devuelve los roles como un array
};