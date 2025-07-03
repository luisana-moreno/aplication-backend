import { pool } from "./db.js";
import bcrypt from "bcryptjs";

// Función para generar una contraseña aleatoria
const generateRandomPassword = (length = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

// Función para actualizar las contraseñas de los usuarios
const updatePasswords = async () => {
    try {
        // Obtener todos los usuarios de la base de datos
        const result = await pool.query('SELECT id_user, email FROM "user"');
        const users = result.rows;

        // Crear un array para almacenar las contraseñas generadas
        const updatedUsers = [];

        for (const user of users) {
            // Generar una contraseña aleatoria
            const randomPassword = generateRandomPassword();

            // Hashear la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            // Actualizar la contraseña en la base de datos
            await pool.query('UPDATE "user" SET password = $1 WHERE id_user = $2', [
                hashedPassword,
                user.id_user,
            ]);

            // Guardar el usuario con su nueva contraseña (sin hashear) para referencia
            updatedUsers.push({
                email: user.email,
                newPassword: randomPassword,
            });
        }

        // Imprimir las contraseñas generadas
        console.log("Contraseñas actualizadas:");
        console.table(updatedUsers);
    } catch (error) {
        console.error("Error al actualizar las contraseñas:", error);
    }
};

// Ejecutar la función
updatePasswords();