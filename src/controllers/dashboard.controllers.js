import { getDashboardData } from "../models/dashboard.models.js";

export const getDashboard = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener datos del dashboard",
            error: error.message,
        });
    }
};
