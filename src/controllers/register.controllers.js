import { loginUser } from "../models/login.models.js";
import bcrypt from "bcryptjs";
import handleDatabaseError from "../utils/errors.js";
import registerSchema from "../schemas/register.schemas.js";
import { postUsers } from "../models/users.model.js";
import { getRoles as fetchRoles } from "../models/register.models.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        console.log("Datos recibidos para registro:", data);

        const { password } = data;

        // Validar los datos con Zod
        const parseRegister = registerSchema.safeParse(data);
        if (!parseRegister.success) {
            return res.status(400).json({ error: parseRegister.error.errors });
        }

        // Verificar si el email ya está registrado
        const emailExists = await loginUser(data.email);
        if (emailExists) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Verificar si el nombre de usuario ya está registrado
        const usernameExists = await loginUser(data.username);
        if (usernameExists) {
            return res.status(400).json({ error: "El nombre de usuario ya está registrado" });
        }

        // Encriptar la contraseña
        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        // Registrar el nuevo usuario
        const newUser = await postUsers({
            ...data,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        handleDatabaseError(error, res);
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await fetchRoles(); // Llama al modelo para obtener los roles
        if (!roles || roles.length === 0) {
            return res.status(404).json({ error: "No se encontraron roles" });
        }
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los roles" });
    }
};