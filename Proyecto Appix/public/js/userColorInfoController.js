function asignarColorAElemento(elemento, variableCSS) {
    // Remover todas las clases de color existentes
    elemento.classList.remove('color-azul', 'color-rojo', 'color-verde', 'color-amarillo');
    
    // Obtener el valor de la variable CSS
    const color = getComputedStyle(document.documentElement).getPropertyValue(variableCSS);

    // Aplicar el color como fondo al elemento
    elemento.style.backgroundColor = color;
}

// Uso de la función para asignar color basado en una variable
document.addEventListener('DOMContentLoaded', () => {
    const postIt = document.querySelector('.post-it-info');
    const risk = globalData.myGlobalNumber;
    if (risk > 66) {
        asignarColorAElemento(postIt, '--color-info-rojo');
    }
    else if (risk > 33){
        asignarColorAElemento(postIt, '--color-info-amarillo');
    }
    else if (risk > 0){
        asignarColorAElemento(postIt, '--color-info-azul');
    }
});
