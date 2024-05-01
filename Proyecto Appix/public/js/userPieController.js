document.addEventListener('DOMContentLoaded', () => {

    const risk = globalData.myGlobalNumber;
    if (risk > 66) {
        miRGB = 'rgba(181, 28, 28, 0.934)'; 
    }
    else if (risk > 33){
        miRGB = 'rgb(255, 193, 7)'; 
    }
    else if (risk > 0){
        miRGB = 'rgb(49, 131, 214)';
    }
    const values = [risk, 100-risk]

    const data = {
        labels: ['Riesgo'],
        datasets: [{
            data: values, // Valores para cada sector del gráfico
            backgroundColor: [miRGB,'white'], // Colores para cada sector
            borderColor: ['grey'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right', // Posición de la leyenda (arriba)
                    labels: {
                        // Agregar el valor numérico al lado de la leyenda
                        generateLabels: function(chart) {
                            const labels = chart.data.labels;
                            const datasets = chart.data.datasets[0].data;
                            return labels.map((label, index) => {
                                const value = datasets[index];
                                return {
                                    text: `${label} (${value}) %`, // Texto de la leyenda con valor numérico
                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                };
                            });
                        }
                    }
                }
            },
            tooltips: {
                callbacks: {
                    // Personalizar el tooltip para mostrar el valor numérico
                    label: function(tooltipItem) {
                        const label = tooltipItem.label;
                        const value = tooltipItem.raw.toFixed(2); // Obtener el valor numérico
                        return `${label}: ${value}`; // Mostrar etiqueta y valor numérico en el tooltip
                    }
                }
            }
        }
    };

    const myPieChart = new Chart(document.getElementById('myPieChart'), config);

});