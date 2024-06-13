// Obtener el valor de riesgo desde un elemento en el DOM
var dataValue = parseInt(document.getElementById('percentage-label').getAttribute('riesgoProyecto'));
var riesgoTotal = parseInt(document.getElementById('percentage-label').getAttribute('riesgoTotal'));
// Función para determinar el color basado en el valor
function getColor(value) {
    if (value > 49) {
        return 'rgb(176, 14, 14)';
    } else if (value > 33) {
        return 'rgb(226, 173, 14)';
    } else if (value > 0) {
        return '#00508F'; 
    } else {
        return 'rgba(0, 0, 0, 0.836)'
    }
}

// Función para determinar el color de fondo basado en el valor
function getBackgroundColor(value) {
    if (value > 49) {
        return 'rgb(176, 14, 14)';
    } else if (value > 33) {
        return 'rgb(226, 173, 14)';
    } else if (value > 0) {
        return '#00508F'; 
    } else {
        return 'rgba(0, 0, 0, 0.836)'
    }
}

// Cambiar el color de fondo de los elementos según el nivel de riesgo
document.addEventListener('DOMContentLoaded', function() {
    var titleElement = document.querySelector('.title');
    var statusElement = document.querySelector('.status');

    var backgroundColor = getBackgroundColor(dataValue);
    titleElement.style.backgroundColor = backgroundColor;
    if (statusElement) {
        statusElement.style.backgroundColor = backgroundColor;
    }
});

// Crear la gráfica de pastel
var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'pie', // Tipo de gráfica: 'pie' para pastel
    data: {
        labels: ['Riesgo contra total', 'Riesgo de otros proyectos'], // Etiqueta del gráfico
        datasets: [{
            label: 'Porcentaje',
            data: [riesgoTotal, 100 - riesgoTotal], // Datos del gráfico
            backgroundColor: [getColor(dataValue), 'rgba(200, 200, 200, 0.2)'], // Colores dinámicos según el valor
            borderColor: 'rgba(255, 255, 255, 1)', // Color del borde (blanco)
            borderWidth: 2 // Ancho del borde
        }]
    },
    options: {
        responsive: true, // Hace que el gráfico sea responsivo
        plugins: {
            legend: {
                position: 'top', // Posición de la leyenda
            },
            tooltip: {
                enabled: true, // Habilita los tooltips
            }
        }
    }
});
