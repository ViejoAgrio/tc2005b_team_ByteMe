// Manejar el envío del formulario de nuevo proyecto
document.addEventListener('DOMContentLoaded', function() {
    form = document.getElementById('nuevo-proyecto-form');

    if(form){
        document.getElementById('nuevo-proyecto-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const nombreProyecto = document.getElementById('nombre-proyecto').value;
            const fechaInicio = document.getElementById('fecha-inicio').value;
            const fechaFin = document.getElementById('fecha-fin').value;
            const nombreEmpresa = document.getElementById('empresa').value;
            const nombreEncargado = document.getElementById('encargado').value;
            const descripcionProyecto = document.getElementById('descripcion-proyecto').value;
            const descripcionAccion = document.getElementById('descripcion-accion').value;

            try {
                const response = await fetch('/admin/nuevo-proyecto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        nombreProyecto, 
                        fechaInicio, 
                        fechaFin, 
                        nombreEmpresa, 
                        nombreEncargado, 
                        descripcionProyecto, 
                        descripcionAccion 
                    })
                });

                if (response.ok) {
                    alert('Proyecto guardado exitosamente');
                    // Redirigir o realizar alguna acción después de guardar el proyecto
                } else {
                    alert('Error al guardar el proyecto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar el proyecto');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    $(document).ready(function() {
        $('#add-client-btn').click(function() {
            // Remove button and dropdown
            var buttonDiv = $(this).parent();
            var dropdownDiv = $('#clients-lst').parent();
            buttonDiv.hide();
            dropdownDiv.hide();

            // Create textboxes and new button
            var textboxEnc = $('<input type="text" id="encargado-txt" name="encargado-txt" required>');
            var textboxEmp = $('<input type="text" id="empresa-txt" name="empresa-txt" required>');
            var labelEnc = $('<label for="encargado-txt">Encargado:</label>');
            var labelEmp = $('<label for="empresa-txt">Empresa:</label>');
            var newButton = $('<button id="list-btn" class="waves-effect waves-light btn" type="button">Ver Lista</button>');

            // Append new elements
            var textboxDivEnc = $('<div style="width: 35%;"></div>').append(labelEnc, textboxEnc);
            var textboxDivEmp = $('<div style="width: 35%;"></div>').append(labelEmp, textboxEmp);
            var newButtonDiv = $('<div style="width: 20%;"></div>').append(newButton);

            $('#clients-div').append(textboxDivEnc, textboxDivEmp, newButtonDiv);

            // Add event listener for the new button
            newButton.click(function() {
                // Remove textboxes and new button
                textboxDivEnc.remove();
                textboxDivEmp.remove();
                newButtonDiv.remove();

                // Show original button and dropdown
                buttonDiv.show();
                dropdownDiv.show();
            });
        });
    });
});

// Fill clients dropdown with database info
document.addEventListener('DOMContentLoaded', function() {
    fetch('nuevo-proyecto/clients')
        .then(response => response.json())
        .then(message => {
            const dropdown = document.getElementById("clients-lst");
            dropdown.innerHTML = '';

            const dfltOption = document.createElement('option');
            dfltOption.value = "";
            dfltOption.textContent = `Seleccione un cliente`;
            dfltOption.disabled = true;
            dfltOption.selected = true;
            dropdown.appendChild(dfltOption)

            for (let key in message){
                const option = document.createElement('option');
                
                // Set the value and text of the option element
                option.value = message[key]['idCliente'];
                option.textContent = `${message[key]['nombreEncargado']} - ${message[key]['nombreEmpresa']}`;
                
                // Append the option to the dropdown menu
                dropdown.appendChild(option);
            }
        })
        .catch(error => console.log('Error fetching clients:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    // Función para buscar riesgos
    document.getElementById('search-risk').addEventListener('input', function() {
        var searchValue = this.value.trim().toLowerCase();
        var rows = document.querySelectorAll('.invisible-table tbody tr');
        
        rows.forEach(function(row) {
            var cells = row.querySelectorAll('td');
            var found = false;
            cells.forEach(function(cell) {
                if (cell.textContent.trim().toLowerCase().includes(searchValue)) {
                    found = true;
                }
            });
            if (found) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

function agregarPlanAccion() {
    // Obtener el texto del plan de acción ingresado por el usuario
    var nuevoPlan = document.getElementById('plan-accion').value;
    
    // Verificar si el campo de texto no está vacío
    if (nuevoPlan.trim() !== '') {
        // Crear un nuevo elemento de lista
        var nuevoElementoLista = document.createElement('li');
        nuevoElementoLista.textContent = nuevoPlan;
        
        // Agregar un botón para eliminar el plan de acción
        var botonEliminar = document.createElement('button');
        botonEliminar.className = 'eliminar-plan-btn';
        botonEliminar.addEventListener('click', function() {
            // Eliminar el plan de acción al hacer clic en el botón
            nuevoElementoLista.remove();
        });
        nuevoElementoLista.appendChild(botonEliminar);
        
        // Agregar el nuevo plan de acción a la lista de planes existentes
        document.getElementById('lista-planes-accion').appendChild(nuevoElementoLista);
        
        // Limpiar el campo de texto después de agregar el plan de acción
        document.getElementById('plan-accion').value = '';
    } else {
        alert("Escribe un plan de accion válido")
    }
}

// Agregar un listener al botón "Agregar Plan de Acción"
document.getElementById('agregar-plan-btn').addEventListener('click', agregarPlanAccion);

function toggleRowHighlight(checkbox) {
    var row = checkbox.closest('tr'); // Obtenemos la fila más cercana que contiene la casilla de verificación
    row.classList.toggle('selected-risk', checkbox.checked); // Agregamos o quitamos la clase 'selected-risk' dependiendo del estado de la casilla
}

function agregarNuevoRiesgo() {
    // Obtener los valores del nuevo riesgo
    var nombre = document.getElementById('nuevo-nombre').value;
    var nivel = document.getElementById('nuevo-nivel').options[document.getElementById('nuevo-nivel').selectedIndex].text;
    var departamento = document.getElementById('nuevo-departamento').options[document.getElementById('nuevo-departamento').selectedIndex].text;

    // Crear una nueva fila en la tabla de riesgos existentes
    var tableBody = document.getElementById('table-body');
    var newRow = tableBody.insertRow();

    // Insertar celdas con los datos del nuevo riesgo
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Agregar los datos a las celdas
    cell1.innerHTML = '<label><input type="checkbox" class="risk-checkbox"><span></span></label>';
    cell2.textContent = nombre;
    cell3.textContent = nivel;
    cell4.textContent = departamento;
    cell5.innerHTML = '<button class="delete-risk-btn waves-effect waves-light btn red">Eliminar</button>';
}

function guardarProyecto() {
    // Obtener el texto del plan de acción ingresado por el usuario
    document.getElementById('nuevo-proyecto-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const nombreProyecto = document.getElementById('nombre-proyecto').value;
        const fechaInicio = document.getElementById('fecha-inicio').value;
        const fechaFin = document.getElementById('fecha-fin').value;
        const nombreEmpresa = document.getElementById('empresa').value;
        const nombreEncargado = document.getElementById('encargado').value;
        const descripcionProyecto = document.getElementById('descripcion-proyecto').value;
        const descripcionAccion = document.getElementById('descripcion-accion').value;
    });
}