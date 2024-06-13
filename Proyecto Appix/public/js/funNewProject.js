// Manejar el envío del formulario de nuevo proyecto
document.addEventListener('DOMContentLoaded', function() {
    form = document.getElementById('nuevo-proyecto-form');
    
    if(form){
        document.getElementById('nuevo-proyecto-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            let riskLvl = [];
            if (Object.keys(checkboxStatesRsg).length != 0){
                // Iterar sobre todos los checkboxes encontrados
                Object.keys(checkboxStatesRsg).forEach(function(key) {
                    if(checkboxStatesRsg[key]){
                        riskLvl[key] = numberInputStatesRsg[key];
                    }
                });
            }

            const formData = {
                nombreProyecto: form.elements['nombreProyecto'].value,
                fechaInicio: form.elements['fechaInicio'].value,
                fechaFinal: form.elements['fechaFinal'].value,
                estatus: form.elements['estatus'].value,
                departamento: form.elements['departamento'].value,
                descripcionProyecto: form.elements['descripcionProyecto'].value,
                porcentajeRiesgo: form.elements['porcentajeRiesgo'].value,
                //clienteSeleccionado: form.elements['clients-lst'].value,
                selectedRisks: riskLvl // Añadir riesgos seleccionados
            };

            try {
                const response = await fetch('/admin/nuevo-proyecto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
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

/* Fill clients dropdown with database info
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
*/

// Clients Table with checkboxes and search implemented
document.addEventListener('DOMContentLoaded', function() {
    var checkboxStatesClients = {};

    $("#jsGridClientes").on("change", "input[name='selClient']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStatesClients[itemId] = isChecked;
    });

    fetch('nuevo-proyecto/clientes')
        .then(response => response.json())
        .then(dataJSON => {
            fullDataMappedClients = dataJSON.map(client => ({
                id: client.idCliente,
                encargado: client.nombreEncargado
            }));
            
            $(function() {
                // Define an object to store checkbox states
            
                $("#jsGridClientes").jsGrid({
                    height: "400px",
                    width: "100%",
                    sorting: true,
                    filtering: true,
                    editing: false,
                    paging: false,
                    
                    data: fullDataMappedClients,
                    controller: {
                        loadData: function(filter) {
                            function normalizeText(text) {
                                return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                            }

                            return $.grep(fullDataMappedClients, function(eachData) {
                                return (!filter.encargado || normalizeText(eachData.encargado).indexOf(normalizeText(filter.encargado)) > -1);
                            });
                        }
                    },

                    fields: [
                        { name: "encargado", type: "text", title: "Cliente encargado", width: 150},
                        {
                            type: "checkbox",
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selClient")
                                                            .attr("value", item.id);
                                
                                // Restore checkbox state from checkboxStatesClients object
                                if (checkboxStatesClients[item.id]) {
                                    checkbox.prop("checked", true);
                                } else {
                                    checkbox.prop("checked", false);
                                }
                    
                                return checkbox;
                            }
                        }
                    ]
                });

                // Add keyup event handler to filter inputs
                $(".jsgrid-filter-row input").on("keyup", function() {
                    $("#jsGridClientes").jsGrid("loadData");
                });
            });
        })
        .catch(error => console.error('Error al cargar los clientes:', error));
});


// Companies Table with checkboxes and search implemented
document.addEventListener('DOMContentLoaded', function() {
    var checkboxStatesEmpresas = {};

    $("#jsGridEmpresas").on("change", "input[name='selEmpresas']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStatesEmpresas[itemId] = isChecked;
    });

    fetch('nuevo-proyecto/empresas')
        .then(response => response.json())
        .then(dataJSON => {
            fullDataMappedEmpresas = dataJSON.map(empresa => ({
                id: empresa.idEmpresa,
                name: empresa.nombreEmpresa
            }));
            
            $(function() {
                // Define an object to store checkbox states
            
                $("#jsGridEmpresas").jsGrid({
                    height: "400px",
                    width: "100%",
                    sorting: true,
                    filtering: true,
                    editing: false,
                    paging: false,

                    data: fullDataMappedEmpresas,
                    controller: {
                        loadData: function(filter) {
                            function normalizeText(text) {
                                return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                            }

                            return $.grep(fullDataMappedEmpresas, function(eachData) {
                                return (!filter.name || normalizeText(eachData.name).indexOf(normalizeText(filter.name)) > -1);
                            });
                        }
                    },

                    fields: [
                        { name: "name", type: "text", title: "Empresa", width: 200},
                        {
                            type: "checkbox",
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selEmpresas")
                                                            .attr("value", item.id);
                                
                                // Restore checkbox state from checkboxStatesCompanies object
                                if (checkboxStatesEmpresas[item.id]) {
                                    checkbox.prop("checked", true);
                                } else {
                                    checkbox.prop("checked", false);
                                }
                    
                                return checkbox;
                            }
                        }
                    ]
                });

                // Add keyup event handler to filter inputs
                $(".jsgrid-filter-row input").on("keyup", function() {
                    $("#jsGridEmpresas").jsGrid("loadData");
                });
            });
        })
        .catch(error => console.error('Error al cargar las empresas:', error));
});



// Action Plan Table with checkboxes and search implemented
document.addEventListener('DOMContentLoaded', function() {
    var checkboxStates = {};

    $("#jsGridAcc").on("change", "input[name='selAcc']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStates[itemId] = isChecked;
    });

    fetch('nuevo-proyecto/planAccion')
        .then(response => response.json())
        .then(dataJSON => {
            fullDataMapped = dataJSON.map(planAcc => ({
                dsc: planAcc.descripcionAccion,
                idR: planAcc.idAccion
            }));
            
            $(function() {
                // Define an object to store checkbox states
            
                $("#jsGridAcc").jsGrid({
                    height: "400px",
                    width: "100%",
                    sorting: true,
                    filtering: true,
                    editing: false,
                    paging: false,

                    data: fullDataMapped,
                    controller: {
                        loadData: function(filter) {
                            return $.grep(fullDataMapped, function(eachData) {
                                return (!filter.dsc || eachData.dsc.indexOf(filter.dsc) > -1);
                            });
                        }
                    },

                    fields: [
                        { name: "dsc", type: "text", title: "Descripción", width: 150},
                        {
                            type: "checkbox",
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selAcc")
                                                            .attr("value", item.idR);
                                
                                // Restore checkbox state from checkboxStates object
                                if (checkboxStates[item.idR]) {
                                    checkbox.prop("checked", true);
                                } else {
                                    checkbox.prop("checked", false);
                                }
                    
                                return checkbox;
                            }
                        }
                    ]
                });

                // Add keyup event handler to filter inputs
                $(".jsgrid-filter-row input").on("keyup", function() {
                    $("#jsGridAcc").jsGrid("loadData");
                });
            });
        })
        .catch(error => console.error('Error al cargar los planes de acción:', error));
});

// Risk Table with checkboxes and search implemented
document.addEventListener('DOMContentLoaded', function() {
    $("#jsGridRsg").on("change", "input[name='selRsg']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStatesRsg[itemId] = isChecked;

        if(isChecked)
        {
            numberInputStatesRsg[itemId] = $("#jsGridRsg input[name='lvlRsg'][id='" + itemId + "']").val();
        }
        else
        {
            $("#jsGridRsg input[name='lvlRsg'][id='" + itemId + "']").val(0);
            numberInputStatesRsg[itemId] = 0;
        }
    });

    $("#jsGridRsg").on("change", "input[name='lvlRsg']", function() {
        var itemValue = $(this).val();
        var inpItmID  = $(this).attr("id");
        numberInputStatesRsg[inpItmID] = itemValue;
        chkBoxVal = $("#jsGridRsg input[name='selRsg'][value='" + inpItmID + "']").prop('checked');
        
        if(!chkBoxVal)
        {
            $("#jsGridRsg input[name='selRsg'][value='" + inpItmID +"']").prop('checked', true);
            checkboxStatesRsg[inpItmID] = true;
        }
    });

    fetch('nuevo-proyecto/riesgos')
        .then(responseRsg => responseRsg.json())
        .then(dataJSONRsg => {
            fullDataMappedRsg = dataJSONRsg.map(riesgo => ({
                dsc: riesgo.descripcionRiesgo,
                idR:  riesgo.idRiesgo
            }));
            
            $(function() {
                // Define an object to store checkbox states
            
                $("#jsGridRsg").jsGrid({
                    height: "400px",
                    width: "100%",
                    sorting: true,
                    filtering: true,
                    editing: false,
                    paging: false,

                    data: fullDataMappedRsg,
                    controller: {
                        loadData: function(filter) {
                            function normalizeText(text) {
                                return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                            }

                            return $.grep(fullDataMappedRsg, function(eachData) {
                                return (!filter.dsc || normalizeText(eachData.dsc).indexOf(normalizeText(filter.dsc)) > -1);
                            });
                        }
                    },

                    fields: [
                        { name: "dsc", type: "text", title: "Descripción", width: 150},
                        {
                            name: "rsg", title: "Nivel", width: 25,
                            itemTemplate: function(value, item) {
                                //<input type="number" id="quantity" name="quantity" min="1" max="5">
                                var numberInput = $("<input>").attr("type","number")
                                                              .attr("min" ,0)
                                                              .attr("max" ,9)
                                                              .attr("name","lvlRsg")
                                                              .attr("value",0)
                                                              .attr("id",item.idR)
                                                              .attr("onKeyDown","return false");
                                
                                // Restore checkbox state from checkboxStatesRsg object
                                if (numberInputStatesRsg[item.idR]) {
                                    numberInput.prop("value", numberInputStatesRsg[item.idR]);
                                } else {
                                    numberInput.prop("value", 0);
                                }

                                return numberInput;
                            }
                        },
                        {
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selRsg")
                                                            .attr("value", item.idR);
                                
                                // Restore checkbox state from checkboxStatesRsg object
                                if (checkboxStatesRsg[item.idR]) {
                                    checkbox.prop("checked", true);
                                } else {
                                    checkbox.prop("checked", false);
                                }
                    
                                return checkbox;
                            }
                        }
                    ]
                });

                // Add keyup event handler to filter inputs
                $(".jsgrid-filter-row input").on("keyup", function() {
                    $("#jsGridRsg").jsGrid("loadData");
                });
            });
        })
        .catch(error => console.error('Error al cargar los riesgos:', error));
});

/*document.addEventListener('DOMContentLoaded', function() {
    $("#btnCancelar").on("click", function() {
        if (Object.keys(checkboxStatesRsg).length != 0){
            // Iterar sobre todos los checkboxes encontrados
            Object.keys(checkboxStatesRsg).forEach(function(key) {
                if(checkboxStatesRsg[key]){
                    riskLvl[key] = numberInputStatesRsg[key];
                }
            });
        }
    });
});*/