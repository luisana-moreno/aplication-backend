import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded; // Almacenar los datos del usuario en la solicitud
        next(); // Continuar con la siguiente función middleware o controlador
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};