const cron = require('node-cron');
const { calcularPorcentajeRiesgo } = require('./controllerFuncionts.js');
const porcentajeRiesgoModel = require('../../models/porcentajeRiesgo.model.js');

const model = new porcentajeRiesgoModel(0);

cron.schedule('0 0 * * *', async () => {
  try {
    const idProyectos = await model.saveIdProyectos();
    var porcentajeRiesgo;
    console.log('asdad', idProyectos, idProyectos.length);
    for (let i = 0; i < idProyectos.length; i++){
        porcentajeRiesgo = await calcularPorcentajeRiesgo(idProyectos[i].idProyecto);
        await model.updatePorcentajeRiesgo(idProyectos[i].idProyecto, porcentajeRiesgo);
        console.log(`Porcentaje de riesgo calculado: ${porcentajeRiesgo}`);
    }
  } catch (error) {
    console.error(`Error al calcular el porcentaje de riesgo: ${error.message}`);
  }
});

console.log('Tarea cron configurada para ejecutarse todos los días a las 00:00.');
