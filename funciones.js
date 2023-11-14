window.addEventListener('load', inicio);

let sistema = new Sistema();

function inicio() {
    document.getElementById('idBotonAgregarCategoria').addEventListener('click', agregarCategoria);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', eliminarCategoria);
    document.getElementById('idBotonAltaExperiencia').addEventListener('click', agregarExperiencia);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', eliminarExperiencia);


}

                                                            // AGREGAR CATEGORIAS Y EXPERIENCIAS

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


function agregarExperiencia() {
    let formularioExperiencia = document.getElementById('idFormExperiencia');
    if (formularioExperiencia.reportValidity()) {
        let titulo = document.getElementById('idTituloExperiencia').value;
        let descripcion = document.getElementById('idDescripcionExperiencia').value;
        let precio = document.getElementById('idPrecioExperiencia').value;
        let cantidad = document.getElementById('idCantidadPersonasExperiencia').value;
        let categoria = document.getElementById('idCategoriaExperiencia').value;
        
        sistema.agregarExperiencia(new Experiencia(titulo, descripcion, precio, cantidad, categoria));
        formularioExperiencia.reset();
        actualizarTablaExperiencias();
        actualizarCombosTotales ();

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

        if (sistema.existeCategoriaEnExperiencias(categoriaExperiencia)) {
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

function actualizarTablaExperiencias() {
    let tablaExperiencia = document.getElementById('idTabla');
    tablaExperiencia.innerHTML = '';
    let experiencias = sistema.devolverExperiencias();

    if (experiencias.length === 0) {
        tablaExperiencia.innerHTML = "No hay experiencias";
    } else {
        for (let i=0; ; i+2) { //cambiar for normal de a 2 - let unaExperiencia of experiencias
            let fila = tablaExperiencia.insertRow();

            let celdaLista = fila.insertCell(i);

            let lista = document.createElement('ul');

            let liTitulo = document.createElement('li');
            liTitulo.textContent = unaExperiencia.titulo;
            lista.appendChild(liTitulo);

            let liDescripcion = document.createElement('li');
            liDescripcion.textContent = unaExperiencia.descripcion;
            liDescripcion.class = 'experienciasDescripcion';
            lista.appendChild(liDescripcion);

            let liPrecio = document.createElement('li');
            liPrecio.textContent = "$" + unaExperiencia.precio;
            lista.appendChild(liPrecio);

            celdaLista.appendChild(lista);

            let cantidadPersonasSeleccionado = document.getElementById('idCantidadPersonasExperiencia').value;

            let imagen = document.createElement('img');

            // ... ?
        }
    }
}


