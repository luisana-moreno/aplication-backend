import { loginUser } from "../models/login.models.js";
import { generateToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import handleDatabaseError from "../utils/errors.js";   


export const getLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son requeridos" });
        }

        // Buscar usuario por email
        const user = await loginUser(email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar el token
        const token = await generateToken({
            email: user.email,
            rol: user.rol,
        });

        // Excluir la contraseña de la respuesta
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            token,
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};
