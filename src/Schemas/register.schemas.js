import { z } from "zod";

const registerSchema = z.object({
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),

    username: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede tener más de 50 caracteres"),

    email: z
        .string()
        .email("El correo electrónico debe ser válido")
        .min(5, "El correo electrónico debe tener al menos 5 caracteres")
        .max(100, "El correo electrónico no puede tener más de 100 caracteres"),

});

export default registerSchema;