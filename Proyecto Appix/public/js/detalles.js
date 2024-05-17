// Obtener el valor de riesgo desde un elemento en el DOM
var dataValue = parseInt(document.getElementById('percentage-label').getAttribute('data-value'));

// Función para determinar el color basado en el valor
function getColor(value) {
    if (value > 0 && value <= 35) {
        return '#008000'; // Verde
    } else if (value > 35 && value <= 70) {
        return '#FFFF00'; // Amarillo
    } else {
        return '#FF0000'; // Rojo
    }
}

// Función para determinar el color de fondo basado en el valor
function getBackgroundColor(value) {
    if (value > 0 && value <= 35) {
        return '#008000'; // Verde
    } else if (value > 35 && value <= 70) {
        return '#FFFF00'; // Amarillo
    } else {
        return '#FF0000'; // Rojo
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

    // Mostrar el porcentaje de riesgo en el div con id 'percentage-label'
    var percentageLabel = document.getElementById('percentage-label');
    percentageLabel.textContent = dataValue + '%';
    percentageLabel.style.color = getColor(dataValue); // Cambiar el color del texto basado en el valor
});

// Crear la gráfica de pastel
var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'pie', // Tipo de gráfica: 'pie' para pastel
    data: {
        labels: ['Nivel de Riesgo', 'Restante'], // Etiqueta del gráfico
        datasets: [{
            label: 'Porcentaje',
            data: [dataValue, 100 - dataValue], // Datos del gráfico
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
