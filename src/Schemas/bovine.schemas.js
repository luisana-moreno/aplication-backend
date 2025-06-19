import {z} from "zod";

const bovineSchemas = z.object({
    bovine_number : z
    .string()
    .max(3, "El numero de bovino debe contener 3 caracteres")
    .regex(/[0-9]/, "El número de bovino solo debe contener números"),

    breed_bovine : z.enum (["holstein", "jersey", "gyrolandas", "carora", "gyrhol"]),

    date_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),

    color : z.enum(["black and white", "red and white", "dark brown and white"]),

    weight : z
    .string()
    .min(0, "El peso debe ser mayor a 0 kg")
    .max(1000.0, "El peso no puede ser mayor a 1000.0 kg"),

    stage_bovine : z.enum(["suckling calf", "weaned calf", "calves", "heifers", "cows"]),

    status_bovine : z.enum(["in service", "not in service"]),
});

export default bovineSchemas;