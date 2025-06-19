
function getPostgresErrorMessage(errorCode) {
    const errorMessages = {
        // Errores de integridad de datos
        '23505': 'Registro duplicado.',
        '23503': 'Referencia inválida.',
        '23502': 'Campo obligatorio faltante.',
        '23514': 'Valor inválido.',
        '22P02': 'Formato incorrecto.',
        '22001': 'Valor demasiado largo.',
        '42601': 'Error de sintaxis.',
        '42501': 'Permiso denegado.',
        '42P01': 'Tabla no encontrada.',
        '42703': 'Columna no encontrada.',
        '42P07': 'Tabla duplicada.',
        '28000': 'Acceso no autorizado.',
        '28P01': 'Contraseña incorrecta.',
        '3D000': 'Base de datos no encontrada.',
        '3F000': 'Esquema no encontrado.',
        '40P01': 'Deadlock detectado.',
        '53300': 'Conexiones simultáneas excedidas.',
        '57P03': 'Base de datos en pausa.',
        '25P02': 'Transacción fallida.',
        '40001': 'Error de serialización.',
        'F0000': 'Error de configuración.',
        'F0001': 'Archivo de configuración faltante.'
    };

    return errorMessages[errorCode] || `Error desconocido (código: ${errorCode})`;
}

const handleDatabaseError = (error, res) => {
    console.error('Error de base de datos:', error);

    if (error.code) {
        const message = getPostgresErrorMessage(error.code);
        return res.status(400).json({ error: message });
    }
};

export default handleDatabaseError;