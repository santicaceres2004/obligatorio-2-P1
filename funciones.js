window.addEventListener('load', inicio);

let sistema = new Sistema();

function inicio() {
    document.getElementById('idBotonAgregarCategoria').addEventListener('click', agregarCategoria);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', eliminarCategoria);
    document.getElementById('idBotonAltaExperiencia').addEventListener('click', agregarExperiencia);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', eliminarExperiencia);
    document.getElementById("idBotonComprar").addEventListener("click", agregarComprador);
}

                                                            // AGREGAR CATEGORIAS, EXPERIENCIAS Y COMPRADORES

function agregarCategoria() {
    let formularioCategoria = document.getElementById('idFormCategoria');
    if (formularioCategoria.reportValidity()) {
        let nombre = document.getElementById('idNombreCategoria').value.toUpperCase();
        let detalle = document.getElementById('idDetallesCategoria').value.toUpperCase();
        if (sistema.existeCategoria(nombre)) {
            alert ('Esta categoria ya existe')
        } else {
        sistema.agregarCategoria(new Categoria(nombre, detalle));
        formularioCategoria.reset();
        actualizarCombosTotales ();
        }
    }
}
function agregarComprador() {
    let formularioComprador = document.getElementById("idFormCompra");
    if (formularioComprador.reportValidity()) {
        let nombreComprador = document.getElementById("idNombreComprador").value.toUpperCase();
        let mailComprador = document.getElementById("idMail").value.toUpperCase();
        if (experienciaSeleccionada){
            sistema.agregarCompradores(new Comprador(nombreComprador,mailComprador,experienciaSeleccionada));
            experienciaSeleccionada = null
        } else {
            alert ('Tienes que elejir una experiencia para comprar')
        }
        formularioComprador.reset();
    }

}

function agregarExperiencia() {
    let formularioExperiencia = document.getElementById('idFormExperiencia');
    if (formularioExperiencia.reportValidity()) {
        let titulo = document.getElementById('idTituloExperiencia').value;
        let descripcion = document.getElementById('idDescripcionExperiencia').value;
        let precio = document.getElementById('idPrecioExperiencia').value;
        let cantidad = document.getElementById('idCantidadPersonasExperiencia').value;
        let categoria = document.getElementById('idCategoriaExperiencia').value;
        if(sistema.existeExperienciaIgual(titulo,descripcion,precio)) {
            alert ("Ya hay una experiencia identica")
        } else {
        sistema.agregarExperiencia(new Experiencia(titulo, descripcion, precio, cantidad, categoria));
        formularioExperiencia.reset();
        actualizarTablaExperiencias(sistema.devolverExperiencias());
        actualizarCombosTotales ();
        }
    }
}



                                                                             // COMBOS



function cargarCombosCategoria() {
    let combo = document.getElementById('idComboCategoriasAbajo');
    combo.innerHTML = '';
    let categorias = sistema.devolverCategorias();
    for (let unaCategoria of categorias) {
        let nodoTexto = document.createTextNode(unaCategoria.nombre);
        let nodoOption = document.createElement('option');
        nodoOption.value = unaCategoria.nombre;
        nodoOption.appendChild(nodoTexto);
        combo.appendChild(nodoOption);
    }
}

function cargarCombosExperiencia() {
    let comboExperiencia = document.getElementById('idCategoriaExperiencia');
    comboExperiencia.innerHTML = '';
    let categorias = sistema.devolverCategorias();
    for (let unaCategoria of categorias) {
        let nodoTexto = document.createTextNode(unaCategoria.nombre);
        let nodoOption = document.createElement('option');
        nodoOption.value = unaCategoria.nombre;
        nodoOption.appendChild(nodoTexto);
        comboExperiencia.appendChild(nodoOption); 
    }
}

function cargarCombosFiltro() {
    let comboFiltro = document.getElementById('idComboCategoriasIzquierda');
    comboFiltro.innerHTML = '';
    let categorias = sistema.devolverCategorias();
    for (let unaCategoria of categorias) {
        let nodoTexto = document.createTextNode(unaCategoria.nombre);
        let nodoOption = document.createElement('option');
        nodoOption.value = unaCategoria.nombre;
        nodoOption.appendChild(nodoTexto);
        comboFiltro.appendChild(nodoOption); 
    }


       comboFiltro.addEventListener('change', cargarExperiencias);
        


}

function cargarExperiencias(){
    let comboFiltro = document.getElementById('idComboCategoriasIzquierda');
    let seleccion = comboFiltro.value;
    let experienciasPorCategoria = sistema.devolverExpPorCat(seleccion);
    actualizarTablaExperiencias(experienciasPorCategoria);    
}





function comboEliminarExperiencia(){
    let comboEliminarExperiencia = document.getElementById('idComboBajaExperiencia');
    comboEliminarExperiencia.innerHTML = '';
    let experiencias = sistema.devolverExperiencias();
    for (let unaExperiencia of experiencias) {
        let nodoTexto = document.createTextNode(unaExperiencia.titulo);
        let nodoOption = document.createElement('option');
        nodoOption.value= unaExperiencia.titulo;
        nodoOption.appendChild(nodoTexto);
        comboEliminarExperiencia.appendChild(nodoOption);
    }
}


function actualizarCombosTotales () {
    cargarCombosCategoria();
    cargarCombosExperiencia(); 
    cargarCombosFiltro() ;
    comboEliminarExperiencia();
}

                                                            // ELIMINAR CATEGORIAS Y EXPERIENCIAS

function eliminarCategoria() {
    let posEligido = document.getElementById('idComboCategoriasAbajo').selectedIndex;
    if (posEligido != -1) {
        let categoriaAEliminar = sistema.devolverCategorias()[posEligido].nombre;
        if (sistema.existeCategoriaEnExperiencias(categoriaAEliminar)){
            alert('No puedes eliminar esta categoria porque hay al menos una experiencia con ella');
        } else {
            sistema.eliminarCategoria(posEligido);
            actualizarCombosTotales();
        }
    } else {
        alert ('Accion no valida')
    }
}


function eliminarExperiencia() {
    let posEligido = document.getElementById('idComboBajaExperiencia').selectedIndex;
    
    if (posEligido !== -1) {
        let experienciaAEliminar = sistema.devolverExperiencias()[posEligido];
        let categoriaExperiencia = experienciaAEliminar.categoria;

        if (sistema.existeExperienciaComprada(categoriaExperiencia)) {
            alert('No puedes eliminar esta experiencia porque la categoría está en uso.');
        } else {
            sistema.eliminarExperiencia(posEligido);
            actualizarTablaExperiencias();
        }
    } else {
        alert('Accion no valida');
    }
}


                                                            // TABLA EXPERIENCIAS

function actualizarTablaExperiencias(experiencias) {
    let tablaExperiencia = document.getElementById('idTabla');
    tablaExperiencia.innerHTML = '';
    // experiencias = sistema.devolverExperiencias();

    let contadorTd = 1;

    if (experiencias.length === 0) {
        tablaExperiencia.innerHTML = "No hay experiencias";
    } else {
        for (let i = 0; i < experiencias.length; i += 2) { 
            let fila = tablaExperiencia.insertRow();

            // Primer celda
            let celdaLista1 = fila.insertCell();
            let lista1 = document.createElement('ul');
            let unaExperiencia1 = experiencias[i];

            let liTitulo1 = document.createElement('li');
            liTitulo1.textContent = unaExperiencia1.titulo;
            liTitulo1.id = "experienciaTitulo";  // Cambiado de idName a id
            lista1.appendChild(liTitulo1);

            let liDescripcion1 = document.createElement('li');
            liDescripcion1.textContent = unaExperiencia1.descripcion;
            liDescripcion1.className = 'experienciasDescripcion'; 
            lista1.appendChild(liDescripcion1);

            let liPrecio1 = document.createElement('li');
            liPrecio1.textContent = "$" + unaExperiencia1.precio;

            let comboCantidad1 = document.getElementById('idCantidadPersonasExperiencia');
            if (comboCantidad1.value === 'uno') {
                let tdImg1 = document.createElement('img');
                tdImg1.src = 'img/uno.png';
                tdImg1.alt = 'uno'
                celdaLista1.appendChild(tdImg1);
            }
            if (comboCantidad1.value === 'dos') {
                let tdImg2 = document.createElement('img');
                tdImg2.src = 'img/dos.png';
                tdImg2.alt = 'dos'
                celdaLista1.appendChild(tdImg2);
            }
            if (comboCantidad1.value === 'muchos') {
                let tdImg3 = document.createElement('img');
                tdImg3.src = 'img/muchos.png';
                tdImg3.alt = 'muchos'
                celdaLista1.appendChild(tdImg3);
            }

            lista1.appendChild(liPrecio1);

            celdaLista1.appendChild(lista1);

            // Agregar id único al <td>
            celdaLista1.id = 'td_' + contadorTd; 
            contadorTd++;

            // Agregar onclick al <td>
            celdaLista1.addEventListener("click", function() {
                valorExperiencia(celdaLista1.id);
            });

            // Segunda celda
            if (i + 1 < experiencias.length) {
                let celdaLista2 = fila.insertCell();
                let lista2 = document.createElement('ul');
                let unaExperiencia2 = experiencias[i + 1];

                let liTitulo2 = document.createElement('li');
                liTitulo2.textContent = unaExperiencia2.titulo;
                liTitulo2.id = "experienciaTitulo";  // Cambiado de idName a id
                lista2.appendChild(liTitulo2);

                let liDescripcion2 = document.createElement('li');
                liDescripcion2.textContent = unaExperiencia2.descripcion;
                liDescripcion2.className = 'experienciasDescripcion'; 
                lista2.appendChild(liDescripcion2);

                let liPrecio2 = document.createElement('li');
                liPrecio2.textContent = "$" + unaExperiencia2.precio;
                lista2.appendChild(liPrecio2);

                let comboCantidad1 = document.getElementById('idCantidadPersonasExperiencia');
            if (comboCantidad1.value === 'uno') {
                let tdImg1 = document.createElement('img');
                tdImg1.src = 'img/uno.png';
                tdImg1.alt = 'uno'
                celdaLista1.appendChild(tdImg1);
            }
            if (comboCantidad1.value === 'dos') {
                let tdImg2 = document.createElement('img');
                tdImg2.src = 'img/dos.png';
                tdImg2.alt = 'dos'
                celdaLista1.appendChild(tdImg2);
            }
            if (comboCantidad1.value === 'muchos') {
                let tdImg3 = document.createElement('img');
                tdImg3.src = 'img/muchos.png';
                tdImg3.alt = 'muchos'
                celdaLista1.appendChild(tdImg3);
            }

                celdaLista2.appendChild(lista2);

                // Agregar id único al <td>
                celdaLista2.id = 'td_' + contadorTd; 
                contadorTd++;

                // Agregar onclick al <td>
                celdaLista2.addEventListener("click", function() {
                    valorExperiencia(celdaLista2.id);
                });
            }
        }
    }
}


// obtener valor del id de la ul seleccionada
function valorExperiencia(idLista) {
    experienciaSeleccionada = idLista
    alert(experienciaSeleccionada)
}


// mostrar mas exp mas cara

function expMasCara () {
    let opcionPersonas = document.getElementById('idCantidadPersonasCategoria').value;
    if (opcionPersonas == 'uno') {
        let copiaOrdenada = sistema.ordenarCopiaExpPorPrecio();
        alert(JSON.stringify(copiaOrdenada, null, 2));
    }

    // if(opcionPersonas == 'uno') {
    //     //...
    // }
    // if(opcionPersonas == 'dos') {
    //     //...
    // }
    // if(opcionPersonas == 'varias') {
    //     //...
    // }
    
}




