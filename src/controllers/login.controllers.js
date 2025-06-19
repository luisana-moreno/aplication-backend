import { registerUser, loginUser } from "../models/login.models.js";
import { generateToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import handleDatabaseError from "../utils/errors.js";   

export const register = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        // Validar si el correo ya existe
        const registerValidation = await loginUser(data.email);
        if (registerValidation) {
            return res.status(400).json({ error: "El correo ya existe" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Registrar el usuario
        const newUser = await registerUser({
            ...data,
            password: hashedPassword,
        });

        // Generar el token
        const token = await generateToken({
            email: newUser.email,
            rol: newUser.rol,
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            token,
            user: newUser,
        });
    } catch (error) {
    handleDatabaseError(error, res);

    }
};


export const login = async (req, res) => {
    try {
        console.log("Login request received:", req.body);
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
        handleDatabaseError(error, res);
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    res.status(200).json({ message: "Sesión cerrada correctamente" });
    
};

