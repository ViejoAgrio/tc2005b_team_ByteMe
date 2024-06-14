const porcentajeRiesgoModel = require('../../models/porcentajeRiesgo.model.js');

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    return `${diaFormateado} / ${mesFormateado} / ${anio}`;
}

function formatearFechaReverse(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    return `${anio}-${mesFormateado}-${diaFormateado}`;
}

async function calcularPorcentajeRiesgo(idProyecto) {
    const calculo = new porcentajeRiesgoModel(idProyecto);
    const fechas = await calculo.saveDates(idProyecto);
    const fechaInicio = new Date(fechas.fechaInicio);
    const fechaFinal = new Date(fechas.fechaFinal);
    const fechaActual = new Date();
    const numeroRiesgosN = await calculo.saveNumberRisks(idProyecto);
    const numeroRiesgos = Number(numeroRiesgosN.numeroRiesgos);
    const nivelesRiesgos = await calculo.saveRisksLevel(idProyecto);
    const estatus = await calculo.saveEstatus(idProyecto);
    if (estatus.estatus == 'Finalizado'){
        return 0;
    } else if (fechaInicio >= fechaFinal){
        return 100;
    } else {
        var sumNiveles = 0;
        for (let i = 0; i < numeroRiesgos; i++){
            sumNiveles = sumNiveles + nivelesRiesgos[i].nivelRiesgo
        }
        const R = sumNiveles * (1 + (numeroRiesgos / 10));
        const diferenciaMilisegundosFI = fechaFinal - fechaInicio;
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const d = diferenciaMilisegundosFI / milisegundosPorDia;
        const diferenciaMilisegundosHI = fechaActual - fechaInicio;
        const t = Math.round(diferenciaMilisegundosHI / milisegundosPorDia);
        const porcentajeRiesgo = ((-5000) / (R + 50)) + (((5000 * t) / (R + 50)) / d) + 100;
        return porcentajeRiesgo;
    }
}

module.exports = { formatearFecha , formatearFechaReverse, calcularPorcentajeRiesgo };
