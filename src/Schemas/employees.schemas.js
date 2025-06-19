import { z } from "zod";

const employeeSchemas = z.object({
    name: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede tener más de 100 caracteres"),

    last_name: z
        .string()
        .min(3, "El apellido debe tener al menos 3 caracteres")
        .max(100, "El apellido no puede tener más de 100 caracteres"),

    document_number: z
        .string()
        .regex(/^[VE]-[0-9]/, "El número de documento debe comenzar con V o E seguido de un guion (-) y números")
        .min(8, "El número de documento debe tener al menos 8 caracteres")
        .max(10, "El número de documento no puede tener más de 10 caracteres"),

    date_birth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),

    address: z
        .string()
        .min(3, "La dirección debe tener al menos 3 caracteres")
        .max(100, "La dirección no puede tener más de 100 caracteres")
        .regex(/[A-Z]/, "La dirección debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "La dirección debe contener al menos una letra minúscula"),

    phone: z
        .string()
        .max(11, "El número no puede tener más de 11 caracteres")
        .regex(/[0-9]/, "El teléfono solo debe contener números"),

    position: z.enum(["manager", "dairy_manager", "veterinarian", "transportation_manager", "worker", "pasture_manager"]),
});

export default employeeSchemas;