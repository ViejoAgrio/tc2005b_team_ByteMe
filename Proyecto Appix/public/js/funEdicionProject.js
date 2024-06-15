// Global Variables
let proyecto;
let empresaClient;
let clientes;
let empresas;
let acciones;
let riesgos;

// Manejar el envío del formulario de nuevo proyecto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nuevo-proyecto-form');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            try {
                const response = await fetch('/admin/nuevo-proyecto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

// Actualización de las variables globales
document.addEventListener('DOMContentLoaded', function() {
    const proyectoData = document.getElementById('proyecto-data').dataset.proyecto;
    proyecto = JSON.parse(proyectoData);

    const empresaCData  = document.getElementById('empaclnt-data').dataset.proyecto;
    empresaClient = JSON.parse(empresaCData);

    const clientesData  = document.getElementById('clientes-data').dataset.proyecto;
    clientes = JSON.parse(clientesData);

    const empresasData  = document.getElementById('empresas-data').dataset.proyecto;
    empresas = JSON.parse(empresasData);

    const accionesData  = document.getElementById('acciones-data').dataset.proyecto;
    acciones = JSON.parse(accionesData);

    const riesgosData  = document.getElementById('riesgos-data').dataset.proyecto;
    riesgos  = JSON.parse(riesgosData);
});

// Clients Table with checkboxes and search implemented
document.addEventListener('DOMContentLoaded', function() {
    var checkboxStatesClients = {};
    var hiddenInputsClientData = {};

    $("#jsGridClientes").on("change", "input[name='selClient']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");

        if (isChecked) {
            // Desmarcar cualquier otro checkbox seleccionado
            $("input[name='selClient']").prop("checked", false);
            // Limpiar estados anteriores
            checkboxStatesClients = {};
            hiddenInputsClientData = {};
            // Marcar el nuevo checkbox
            $(this).prop("checked", true);
            checkboxStatesClients[itemId] = true;
            hiddenInputsClientData[itemId] = { id: itemId };
        } else {
            checkboxStatesClients[itemId] = false;
            delete hiddenInputsClientData[itemId];
        }

        actualizarListaClienteOculta();
    });

    function actualizarListaClienteOculta() {
        var hiddenInputsClientList = $("#hiddenInputsClientList"); // ID del elemento div oculto donde almacenarás los datos
        hiddenInputsClientList.empty(); // Vacía la lista (o ajusta según tu estructura HTML)

        // Recorre los datos y agrega elementos ocultos según tu estructura
        for (var itemId in hiddenInputsClientData) {
            if (hiddenInputsClientData.hasOwnProperty(itemId)) {
                var data = hiddenInputsClientData[itemId];
                var inputHtml = '<input type="hidden" name="hiddenClientInput_Chk" value="' + data.id + '" />';
                hiddenInputsClientList.append(inputHtml); // Agrega el input oculto al elemento oculto
            }
        }
    }

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
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selClient")
                                                            .attr("value", item.id);
                                
                                if (empresaClient.idCliente == item.id) {
                                    checkbox.prop("checked",true);
                                    empresaClient.idCliente = -1;

                                    checkboxStatesClients[item.id] = true;
                                } else {
                                    // Restore checkbox state from checkboxStatesClients object
                                    checkbox.prop("checked", checkboxStatesClients[item.id] || false);
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
    var hiddenInputsEmpresaData = {};

    $("#jsGridEmpresas").on("change", "input[name='selEmpresas']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStatesEmpresas[itemId] = isChecked;

        if(isChecked){
            $("input[name='selEmpresas']").prop("checked", false);
            checkboxStatesEmpresas = {};
            hiddenInputsEmpresaData = {};
            // Marcar el nuevo checkbox
            $(this).prop("checked", true);
            checkboxStatesEmpresas[itemId] = true;
            hiddenInputsEmpresaData[itemId] = { id: itemId};
        }
        else{
            checkboxStatesEmpresas[itemId] = false;
            delete hiddenInputsEmpresaData[itemId];
        }

        actualizarListaEmpOculta();
    });

    function actualizarListaEmpOculta() {
        var hiddenInputsEmpresaList = $("#hiddenInputsEmpresaList"); // ID del elemento div oculto donde almacenarás los datos
        hiddenInputsEmpresaList.empty(); // Vacía la lista (o ajusta según tu estructura HTML)

        // Recorre los datos y agrega elementos ocultos según tu estructura
        for (var itemId in hiddenInputsEmpresaData) {
            if (hiddenInputsEmpresaData.hasOwnProperty(itemId)) {
                var data = hiddenInputsEmpresaData[itemId];
                var inputHtml = '<input type="hidden" name="hiddenEmpInput_Chk" value="' + data.id + '" />';
                hiddenInputsEmpresaList.append(inputHtml); // Agrega el input oculto al elemento oculto
            }
        }
    }

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
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selEmpresas")
                                                            .attr("value", item.id);
                                if (empresaClient.idEmpresa == item.id) {
                                    checkbox.prop("checked",true);
                                    empresaClient.idEmpresa = -1;
                                    
                                    checkboxStatesEmpresas[item.id] = true;
                                } else {
                                    // Restore checkbox state from checkboxStatesCompanies object
                                    checkbox.prop("checked", checkboxStatesEmpresas[item.id] || false);
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
    var checkboxAccStates = {};
    var hiddenInputsAccionData = {};

    $("#jsGridAcc").on("change", "input[name='selAcc']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxAccStates[itemId] = isChecked;

        if(isChecked){
            hiddenInputsAccionData[itemId] = { id: itemId};
        }
        else{
            delete hiddenInputsAccionData[itemId];
        }

        actualizarListaAccOculta();
    });

    function actualizarListaAccOculta() {
        var hiddenInputsAccionList = $("#hiddenInputsAccionList"); // ID del elemento div oculto donde almacenarás los datos
        hiddenInputsAccionList.empty(); // Vacía la lista (o ajusta según tu estructura HTML)

        // Recorre los datos y agrega elementos ocultos según tu estructura
        for (var itemId in hiddenInputsAccionData) {
            if (hiddenInputsAccionData.hasOwnProperty(itemId)) {
                var data = hiddenInputsAccionData[itemId];
                var inputHtml = '<input type="hidden" name="hiddenAccInput_Chk" id="-1" value="' + data.id + '" />';
                hiddenInputsAccionList.append(inputHtml); // Agrega el input oculto al elemento oculto
            }
        }
    }

    fetch('nuevo-proyecto/planAccion')
        .then(response => response.json())
        .then(dataJSON => {
            fullDataMapped = dataJSON.map(planAcc => ({
                dsc: planAcc.descripcionAccion,
                idAcc: planAcc.idAccion
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
                            title: "Selección",
                            sorting: false,
                            editing: true,
                            width: 25,
                            itemTemplate: function(value, item) {
                                var checkbox =  $("<input>").attr("type", "checkbox")
                                                            .attr("name", "selAcc")
                                                            .attr("value", item.idAcc);
                                
                                if (!(Object.keys(acciones).length === 0)) {
                                    for (var accion of acciones) {
                                        if (accion.idAccion == item.idAcc) {
                                            checkbox.prop(
                                                "checked",
                                                true
                                            );
                                            accion.idAccion = -1;
                                            
                                            checkboxAccStates[item.idAcc] = true;
                                        }
                                    }
                                }

                                // Restore checkbox state from checkboxAccStates object
                                checkbox.prop(
                                    "checked",
                                    checkboxAccStates[item.idAcc] || false
                                );
                    
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
    var hiddenInputsRiskData = {};
    $("#jsGridRsg").on("change", "input[name='selRsg']", function() {
        var isChecked = $(this).prop("checked");
        var itemId = $(this).attr("value");
        checkboxStatesRsg[itemId] = isChecked;

        if(isChecked)
        {
            numberInputStatesRsg[itemId] = $("#jsGridRsg input[name='lvlRsg'][id='" + itemId + "']").val();
            hiddenInputsRiskData[itemId] = { id: itemId, value: numberInputStatesRsg[itemId] };
        }
        else
        {
            $("#jsGridRsg input[name='lvlRsg'][id='" + itemId + "']").val(0);
            numberInputStatesRsg[itemId] = 0;
            delete hiddenInputsRiskData[itemId];
        }

        actualizarListaOculta();
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
        hiddenInputsRiskData[inpItmID] = { id: inpItmID, value: itemValue };
        actualizarListaOculta();
    });

    function actualizarListaOculta() {
        var hiddenInputsRiskList = $("#hiddenInputsRiskList"); // ID del elemento div oculto donde almacenarás los datos
        hiddenInputsRiskList.empty(); // Vacía la lista (o ajusta según tu estructura HTML)

        // Recorre los datos y agrega elementos ocultos según tu estructura
        for (var itemId in hiddenInputsRiskData) {
            if (hiddenInputsRiskData.hasOwnProperty(itemId)) {
                var data = hiddenInputsRiskData[itemId];
                var inputHtml = '<input type="hidden" name="hiddenInput_isChecked" value="' + data.id + '" />';
                inputHtml += '<input type="hidden" name="hiddenInput_value" value="' + data.value + '" />';
                hiddenInputsRiskList.append(inputHtml); // Agrega el input oculto al elemento oculto
            }
        }
    }

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
                                
                                if (!(Object.keys(riesgos).length === 0)) {
                                    for (var riesgo of riesgos) {
                                        if (riesgo.idRiesgo == item.idR) {
                                            numberInput.val(
                                                riesgo.nivelRiesgo
                                            );
                                            
                                            numberInputStatesRsg[item.idR] = riesgo.nivelRiesgo;
                                        }
                                    }
                                }

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
                                
                                if (!(Object.keys(riesgos).length === 0)) {
                                    for (var riesgo of riesgos) {
                                        if (riesgo.idRiesgo == item.idR) {
                                            checkbox.prop(
                                                "checked",
                                                true
                                            );
                                            riesgo.idRiesgo = -1;
                                            
                                            checkboxStatesRsg[item.idR] = true;
                                        }
                                    }
                                }
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

// Código desactivado
/*
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
*/

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