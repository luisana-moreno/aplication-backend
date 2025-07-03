import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function generateToken(payload, expiresIn = "24h") {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
}

export function verifyToken(token) {
    return jwt.verify(token, TOKEN_SECRET);
}