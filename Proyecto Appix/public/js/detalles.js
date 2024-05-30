// Obtener el valor de riesgo desde un elemento en el DOM
var dataValue = parseInt(document.getElementById('percentage-label').getAttribute('data-value'));

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
