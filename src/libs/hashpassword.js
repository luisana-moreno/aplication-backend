import bcrypt from "bcryptjs";
import { pool } from "../db.js"; // Asegúrate de que la ruta sea correcta

async function hashAllPasswords() {
    // Obtén todos los usuarios
    const { rows: users } = await pool.query('SELECT id_user, password FROM "user"');

    for (const user of users) {
        // Si la contraseña ya está hasheada, puedes saltarla (opcional)
        if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) continue;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(user.password, salt);

        await pool.query(
            'UPDATE "user" SET password = $1 WHERE id_user = $2',
            [hashed, user.id_user]
        );
        console.log(`Contraseña actualizada para usuario ${user.id_user}`);
    }
    console.log("¡Todas las contraseñas han sido hasheadas!");
}

hashAllPasswords().then(() => process.exit());