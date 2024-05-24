// controllerFuncionts.js
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    return `${diaFormateado} / ${mesFormateado} / ${anio}`;
}

// Exportar la función
module.exports = { formatearFecha };
