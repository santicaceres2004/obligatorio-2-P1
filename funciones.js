// Trabajo realizado por Cáceres, Santiago (267231) y Rodríguez, Enzo (230883)

window.addEventListener('load', inicio);

let sistema = new Sistema();

// AGREGAR CATEGORÍAS, EXPERIENCIAS Y COMPRADORES
function inicio() {
    document.getElementById('idBotonAgregarCategoria').addEventListener('click', agregarCategoria);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', eliminarCategoria);
    document.getElementById('idBotonAltaExperiencia').addEventListener('click', agregarExperiencia);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', eliminarExperiencia);
    document.getElementById("idBotonComprar").addEventListener("click", agregarComprador, actualizarInformes);
    document.getElementById('idCantidadPersonasCategoria').addEventListener("change", filtrarExperienciasPorCantPersonas);
    document.getElementById('idOrdenPrecio').addEventListener("change", ComboFiltroPrecio);
}

function agregarCategoria() {
    let formularioCategoria = document.getElementById('idFormCategoria');
    if (formularioCategoria.reportValidity()) {
        let nombre = document.getElementById('idNombreCategoria').value.toUpperCase();
        let detalle = document.getElementById('idDetallesCategoria').value.toUpperCase();
        if (sistema.existeCategoria(nombre)) {
            alert('Esta categoría ya existe');
        } else {
            sistema.agregarCategoria(new Categoria(nombre, detalle));
            formularioCategoria.reset();
            actualizarCombosTotales();
        }
    }
}

function agregarComprador() {
    let mostrarTextoExp = document.getElementById('idCualExperiencia');
    let formularioComprador = document.getElementById("idFormCompra");
    if (formularioComprador.reportValidity()) {
        let nombreComprador = document.getElementById("idNombreComprador").value.toUpperCase();
        let mailComprador = document.getElementById("idMail").value.toUpperCase();
        if (experienciaSeleccionada) {
            sistema.agregarCompradores(new Comprador(nombreComprador, mailComprador, experienciaSeleccionada, new Date()));
            alert('Compra registrada');
            experienciaSeleccionada = null;
            mostrarTextoExp.innerHTML = ' Experiencia: ';
            eliminarClaseFondo();
            mostrarEnInformes();
        } else {
            alert('Debes elegir una experiencia para comprar');
        }
        formularioComprador.reset();
    }
    actualizarInformes();
}

function actualizarInformes() {
    mostrarDetalles();
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
    let tituloDeSeccion = document.getElementById('idDetallesCualCategoria');
    tituloDeSeccion.innerHTML = 'Información detallada de la categoría ' + categoriaSeleccionada;
}




function agregarExperiencia() {
    let formularioExperiencia = document.getElementById('idFormExperiencia');
    if (formularioExperiencia.reportValidity()) {
        let titulo = document.getElementById('idTituloExperiencia').value;
        let descripcion = document.getElementById('idDescripcionExperiencia').value;
        let precio = document.getElementById('idPrecioExperiencia').value;
        let cantidad = document.getElementById('idCantidadPersonasExperiencia').value;
        let categoria = document.getElementById('idCategoriaExperiencia').value;
        if (sistema.existeExperienciaIgual(titulo)) {
            alert("No se puede agregar otro título igual");
        } else if (!categoria) {
            alert("No agregaste una categoría");
        } else {
            sistema.agregarExperiencia(new Experiencia(titulo, descripcion, precio, cantidad, categoria));
            formularioExperiencia.reset();
            actualizarTablaExperiencias(sistema.devolverExperiencias());
            actualizarCombosTotales();
            informes();
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

function comboEliminarExperiencia() {
    let comboEliminarExperiencia = document.getElementById('idComboBajaExperiencia');
    comboEliminarExperiencia.innerHTML = '';
    let experiencias = sistema.devolverExperiencias();
    for (let unaExperiencia of experiencias) {
        let nodoTexto = document.createTextNode(unaExperiencia.titulo);
        let nodoOption = document.createElement('option');
        nodoOption.value = unaExperiencia.titulo;
        nodoOption.appendChild(nodoTexto);
        comboEliminarExperiencia.appendChild(nodoOption);
    }
}

function actualizarCombosTotales() {
    cargarCombosCategoria();
    cargarCombosExperiencia();
    cargarCombosFiltro();
    comboEliminarExperiencia();
}

// FILTROS
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

    comboFiltro.addEventListener("change", filtrarExperienciasPorCategoria);
}

function filtrarExperienciasPorCategoria() {
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;

    let filtrada = sistema.devolverExpPorCat(categoriaSeleccionada);
    actualizarTablaExperiencias(filtrada);

    actualizarInformes();
}

function filtrarExperienciasPorCantPersonas() {
    let cantPersonasSeleccionada = document.getElementById("idCantidadPersonasCategoria").value;

    let filtrada = sistema.devolverExpPorCantPersonas(cantPersonasSeleccionada);
    actualizarTablaExperiencias(filtrada);
}

// ELIMINAR CATEGORIAS Y EXPERIENCIAS
function eliminarCategoria() {
    let posEligido = document.getElementById("idComboCategoriasAbajo").selectedIndex;

    if (posEligido != -1) {
        let categoriaAEliminar = sistema.devolverCategorias()[posEligido].nombre;
        if (sistema.existeCategoriaEnExperiencias(categoriaAEliminar)) {
            alert("No puedes eliminar esta categoría porque ha sido utilizada.");
        } else {
            sistema.eliminarCategoria(posEligido);
            actualizarCombosTotales();
            alert("La categoría ha sido eliminada.");
        }
    } else {
        alert("Acción no válida");
    }
}

function eliminarExperiencia() {
    let posEligido = document.getElementById('idComboBajaExperiencia').selectedIndex;

    if (posEligido !== -1) {
        let experienciaAEliminar = sistema.devolverExperiencias()[posEligido];
        let tituloExperienciaAEliminar = experienciaAEliminar.titulo;

        if (sistema.existeExperienciaComprada(tituloExperienciaAEliminar)) {
            alert('No puedes eliminar esta experiencia porque la categoría está en uso.');
        } else {
            sistema.eliminarExperiencia(posEligido);
            actualizarTablaExperiencias(sistema.devolverExperiencias());
            actualizarCombosTotales();
        }
    } else {
        alert('Acción no válida');
    }
}

// TABLA EXPERIENCIAS
function actualizarTablaExperiencias(experiencias) {
    let tablaExperiencia = document.getElementById('idTabla');
    tablaExperiencia.innerHTML = '';

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
            liTitulo1.id = "experienciaTitulo";
            lista1.appendChild(liTitulo1);

            let liDescripcion1 = document.createElement('li');
            liDescripcion1.textContent = unaExperiencia1.descripcion;
            liDescripcion1.className = 'experienciasDescripcion';
            lista1.appendChild(liDescripcion1);

            let liPrecio1 = document.createElement('li');
            liPrecio1.textContent = "$" + unaExperiencia1.precio;

            if (unaExperiencia1.cantidad === 'uno') {
                let tdImg1 = document.createElement('img');
                tdImg1.src = 'img/uno.png';
                tdImg1.alt = 'uno';
                celdaLista1.appendChild(tdImg1);
            }
            if (unaExperiencia1.cantidad === 'dos') {
                let tdImg2 = document.createElement('img');
                tdImg2.src = 'img/dos.png';
                tdImg2.alt = 'dos';
                celdaLista1.appendChild(tdImg2);
            }
            if (unaExperiencia1.cantidad === 'varias') {
                let tdImg3 = document.createElement('img');
                tdImg3.src = 'img/muchos.png';
                tdImg3.alt = 'varias';
                celdaLista1.appendChild(tdImg3);
            }

            lista1.appendChild(liPrecio1);

            celdaLista1.appendChild(lista1);

            celdaLista1.id = 'td_' + contadorTd;
            contadorTd++;

            celdaLista1.addEventListener("click", function () {
                valorExperiencia(liTitulo1.textContent);
                eliminarClaseFondo();
                agregarClaseFondo(celdaLista1.id);
            });

            // Segunda celda
            if (i + 1 < experiencias.length) {
                let celdaLista2 = fila.insertCell();
                let lista2 = document.createElement('ul');
                let unaExperiencia2 = experiencias[i + 1];

                let liTitulo2 = document.createElement('li');
                liTitulo2.textContent = unaExperiencia2.titulo;
                liTitulo2.id = "experienciaTitulo";
                lista2.appendChild(liTitulo2);

                let liDescripcion2 = document.createElement('li');
                liDescripcion2.textContent = unaExperiencia2.descripcion;
                liDescripcion2.className = 'experienciasDescripcion';
                lista2.appendChild(liDescripcion2);

                let liPrecio2 = document.createElement('li');
                liPrecio2.textContent = "$" + unaExperiencia2.precio;
                lista2.appendChild(liPrecio2);

                if (unaExperiencia2.cantidad === 'uno') {
                    let tdImg1 = document.createElement('img');
                    tdImg1.src = 'img/uno.png';
                    tdImg1.alt = 'uno';
                    celdaLista2.appendChild(tdImg1);
                }
                if (unaExperiencia2.cantidad === 'dos') {
                    let tdImg2 = document.createElement('img');
                    tdImg2.src = 'img/dos.png';
                    tdImg2.alt = 'dos';
                    celdaLista2.appendChild(tdImg2);
                }
                if (unaExperiencia2.cantidad === 'varias') {
                    let tdImg3 = document.createElement('img');
                    tdImg3.src = 'img/muchos.png';
                    tdImg3.alt = 'varias';
                    celdaLista2.appendChild(tdImg3);
                }

                celdaLista2.appendChild(lista2);

                celdaLista2.id = 'td_' + contadorTd;
                contadorTd++;

                celdaLista2.addEventListener("click", function () {
                    valorExperiencia(liTitulo2.textContent);
                    eliminarClaseFondo();
                    agregarClaseFondo(celdaLista2.id);
                });
            }
        }
    }
}

let experienciaSeleccionada = null;

// Obtener valor del id de la exp seleccionada
function valorExperiencia(idLista) {
    let tituloSeleccionado = idLista;
    let mostrarTextoExp = document.getElementById('idCualExperiencia');

    if (experienciaSeleccionada === tituloSeleccionado) {
        experienciaSeleccionada = null;
        mostrarTextoExp.innerHTML = ' Experiencia: ';
        eliminarClaseFondo(); // No está siendo llamada (?)
    } else {
        experienciaSeleccionada = tituloSeleccionado;
        mostrarTextoExp.innerHTML = ' Experiencia: ' + experienciaSeleccionada;
    }
}

// Pintar - Despintar exp seleccionada
function eliminarClaseFondo() {
    let total = document.querySelectorAll('.opcionSeleccionada');
    total.forEach(td => {
        td.classList.remove('opcionSeleccionada');
    });
}

function agregarClaseFondo(idLista) {
    document.getElementById(idLista).classList.add('opcionSeleccionada');
}

// Experiencia más cara

function precioExpMasCara() {
    let experienciasListaTotal = sistema.devolverExperiencias();
    let precioMaximo = 0;

    for (let experiencia of experienciasListaTotal) {
        let precioExperiencia = experiencia.precio;

        if (precioExperiencia > precioMaximo) {
            precioMaximo = precioExperiencia;
        }
    }

    return precioMaximo;
}

function informes() {
    let informe = document.getElementById('idExperienciaMasCara');
    let precioMaximo = precioExpMasCara();

    if (sistema.listaExperiencias.length > 0) {
        informe.innerHTML = precioMaximo;
    }
}

// Funcionalidad de experiencia más comprada
function contarCompras() {
    let listaCompradores = sistema.devolverCompradores();
    let contadorTitulos = {};

    for (let comprador of listaCompradores) {
        let titulo = comprador.compra;

        if (contadorTitulos[titulo]) {
            contadorTitulos[titulo]++;
        } else {
            contadorTitulos[titulo] = 1;
        }
    }

    return contadorTitulos;
}

function experienciaMasFrecuente() {
    let contadorTitulos = contarCompras();
    let tituloMasFrecuente = null;
    let maxApariciones = 0;

    for (let titulo in contadorTitulos) {
        if (contadorTitulos[titulo] > maxApariciones) {
            maxApariciones = contadorTitulos[titulo];
            tituloMasFrecuente = titulo;
        }
    }

    return tituloMasFrecuente;
}

function mostrarEnInformes() {
    let masFrecuente = experienciaMasFrecuente();
    let listaComprasUl = document.getElementById('idExperienciasMasCompradas');

    listaComprasUl.innerHTML = '';

    if (masFrecuente) {
        let nuevoLi = document.createElement('li');
        nuevoLi.textContent = '• Experiencia más comprada: ' + masFrecuente;
        listaComprasUl.appendChild(nuevoLi);
    }
}

// Ordenar por precio ascendente y descendente
function ComboFiltroPrecio() {
    let combo = document.getElementById('idOrdenPrecio');
    let arrayOrdenado = sistema.devolverPorPrecioAscendente();
    let arrayOrdenadoDesc = sistema.devolverPorPrecioDescendente();

    if (combo.value == '1') {
        actualizarTablaExperiencias(arrayOrdenado);
    } else {
        actualizarTablaExperiencias(arrayOrdenadoDesc);
    }
}

function mostrarDetalles() {
    let listaCompras = document.getElementById('idListaCompras');
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
    let filtrada = sistema.devolverExpPorCat(categoriaSeleccionada);
    let listaCompradores = sistema.devolverCompradores();

    listaCompras.innerHTML = '';

    for (let comprador of listaCompradores) {
        let tituloCompra = comprador.compra;
        let experienciaCorrespondiente = null;

        for (let i = 0; i < filtrada.length; i++) {
            if (filtrada[i].titulo === tituloCompra) {
                experienciaCorrespondiente = filtrada[i];
                break;
            }
        }

        if (experienciaCorrespondiente) {
            let nuevoLi = document.createElement('li');
            nuevoLi.textContent = '• Nombre: ' + comprador.nombre + ' Mail: ' + comprador.mail + ' Fecha: ' + comprador.fecha.toLocaleDateString() + ' Hora: ' + comprador.fecha.toLocaleTimeString();
            listaCompras.appendChild(nuevoLi);
        }
    }
}


