import { pool } from '../db.js';

export async function getDashboardData() {
    // Total empleados
    const { rows: employeesRows } = await pool.query('SELECT COUNT(*)::int AS count FROM "employee"');
    // Total clientes
    const { rows: clientsRows } = await pool.query('SELECT COUNT(*)::int AS count FROM "client"');
    // Total ganado
    const { rows: cattleRows } = await pool.query('SELECT COUNT(*)::int AS count FROM "bovine"');
    // Razas de bovino
    const { rows: breedsRows } = await pool.query(
        `SELECT breed_bovine AS breed, COUNT(*)::int AS count FROM "bovine" GROUP BY breed_bovine`
    );
    // Ganado en servicio o no en servicio (enum: status_bovine)
    const { rows: serviceRows } = await pool.query(
        `SELECT status_bovine AS service_status, COUNT(*)::int AS count
        FROM "bovine"
        GROUP BY status_bovine`
    );

    return {
        employeesCount: employeesRows[0]?.count || 0,
        clientsCount: clientsRows[0]?.count || 0,
        cattleCount: cattleRows[0]?.count || 0,
        cattleBreeds: breedsRows,
        cattleByService: serviceRows,
    };
}