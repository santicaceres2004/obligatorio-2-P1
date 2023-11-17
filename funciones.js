window.addEventListener('load', inicio);

let sistema = new Sistema();

function inicio() {
    document.getElementById('idBotonAgregarCategoria').addEventListener('click', agregarCategoria);
    document.getElementById('idBotonBajaCategoria').addEventListener('click', eliminarCategoria);
    document.getElementById('idBotonAltaExperiencia').addEventListener('click', agregarExperiencia);
    document.getElementById('idBotonBajaExperiencia').addEventListener('click', eliminarExperiencia);
    document.getElementById("idBotonComprar").addEventListener("click", agregarComprador);
    document.getElementById('idCantidadPersonasCategoria').addEventListener("change", filtrarExperienciasPorCantPersonas);
    document.getElementById('idOrdenPrecio').addEventListener("change", ComboFiltroPrecio);
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
            alert( 'compra registrada' )
            experienciaSeleccionada = null
            eliminarClaseFondo();
            mostrarEnInformes();
        } else {
            alert ('Tienes que elegir una experiencia para comprar')
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
        if(sistema.existeExperienciaIgual(titulo)) {
            alert ("No se puede agregar otro titulo igual")
        } else {
        sistema.agregarExperiencia(new Experiencia(titulo, descripcion, precio, cantidad, categoria));
        formularioExperiencia.reset();
        actualizarTablaExperiencias(sistema.devolverExperiencias());
        actualizarCombosTotales ();
        informes ();
        
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
    mostrarDetalles();
  }

function filtrarExperienciasPorCantPersonas() {
    let cantPersonasSeleccionada = document.getElementById("idCantidadPersonasCategoria").value;
      
    let filtrada = sistema.devolverExpPorCantPersonas(cantPersonasSeleccionada);
    actualizarTablaExperiencias(filtrada);
}



                                                            // ELIMINAR CATEGORIAS Y EXPERIENCIAS

function eliminarCategoria() {
    let posEligido = document.getElementById(
      "idComboCategoriasAbajo").selectedIndex;
  
    if (posEligido != -1) {
      let categoriaAEliminar = sistema.devolverCategorias()[posEligido].nombre;
      if (sistema.existeCategoriaEnExperiencias(categoriaAEliminar)) {
        alert("No puedes eliminar esta categoria porque ha sido utilizada.");
      } else {
        sistema.eliminarCategoria(posEligido);
        actualizarCombosTotales();
        alert("La categoría ha sido eliminada.");
      }
    } else {
      alert("Accion no valida");
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

    if (sistema.listaExperiencias === 0) {  
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

            // Agregar id único al <td>
            celdaLista1.id = 'td_' + contadorTd;
            contadorTd++;

            // Agregar onclick al <td>
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
                liTitulo2.id = "experienciaTitulo";  // Cambiado de idName a id
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

                // Agregar id único al <td>
                celdaLista2.id = 'td_' + contadorTd;
                contadorTd++;

                // Agregar onclick al <td>
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
// obtener valor del id de la ul seleccionada
function valorExperiencia(idLista) {
    experienciaSeleccionada = idLista;
    alert(experienciaSeleccionada);
    
}


                                // PINTAR - DESPINTAR EXP SELECCIONADA
function eliminarClaseFondo() {
    let total = document.querySelectorAll('.opcionSeleccionada');
    total.forEach(td => {
        td.classList.remove('opcionSeleccionada');
    });
}

function agregarClaseFondo(idLista) {
    document.getElementById(idLista).classList.add('opcionSeleccionada');
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


function precioExpMasCara(){
    let experienciasListaTotal = sistema.devolverExperiencias();
    let precioMaximo = 0;
    for( let experiencias of experienciasListaTotal) {
        let precioExperiencias = experiencias.precio;
        if (precioExperiencias > precioMaximo) {
            precioMaximo = precioExperiencias
        }
    }
    return precioMaximo;
}

function informes () {
    let informe = document.getElementById('idExperienciaMasCara');
    let precioMaximo = precioExpMasCara();
    if(sistema.listaExperiencias.length > 0){
    informe.innerHTML = precioMaximo;
    }
}


// FUNCIONALIDAD DE EXPERIENCIA MAS COMPRADA
function contarCompras() {
    let listaCompradores = sistema.devolverCompradores();
    
    // Objeto para realizar un seguimiento de la cantidad de compras por título
    let contadorTitulos = {};

    // Iterar sobre la lista de compradores y contar las compras por título
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

    // Encontrar el título más frecuente
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

function mostrarEnInformes() { // PREGUNTAR PORQUE NO SE ACTUALIZA LA TABLA EN EL HTML.
        let masFrecuente = experienciaMasFrecuente();
        let listaComprasUl = document.getElementById('idExperienciasMasCompradas');
    
        listaComprasUl.innerHTML = '';
    
        if (masFrecuente) {
            let nuevoLi = document.createElement('li');
            nuevoLi.textContent = '• Experiencia más comprada: ' + masFrecuente;
            listaComprasUl.appendChild(nuevoLi);
        }
    }
    
    

// ORDENAR POR PRECIO ASCENDETE Y DESCENDENTE
function ComboFiltroPrecio () {
    let combo = document.getElementById('idOrdenPrecio');
    let arrayOrdenado = sistema.devolverPorPrecioAscendente();
    let arrayOrdenadoDesc = sistema.devolverPorPrecioDescendente();
    if(combo.value == '1') {
        actualizarTablaExperiencias(arrayOrdenado)
    } else {
        actualizarTablaExperiencias(arrayOrdenadoDesc)

    }
}


function mostrarDetalles() {
    const date = new Date
    let listaCompras = document.getElementById('idListaCompras');
    let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
    let filtrada = sistema.devolverExpPorCat(categoriaSeleccionada);
    let listaCompradores = sistema.devolverCompradores();

    listaCompras.innerHTML = '';

    for (comprador of listaCompradores) {
        let tituloCompra = comprador.compra;

        // Bucle for para buscar la experiencia correspondiente en la lista filtrada
        let experienciaCorrespondiente = null;
        for (let i = 0; i < filtrada.length; i++) {
            if (filtrada[i].titulo === tituloCompra) {
                experienciaCorrespondiente = filtrada[i];
                break; // Si se encuentra la experiencia, salir del bucle
            }
        }

        if (experienciaCorrespondiente) {
            let nuevoLi = document.createElement('li');
            nuevoLi.textContent = '• Nombre: ' + comprador.nombre + ' Mail: ' + comprador.mail + ' Fecha: ' + fecha() + ' Hora: ' + hora();
            
            // Agregar el nuevo elemento li a la listaCompras
            listaCompras.appendChild(nuevoLi);
        }
    }
}

function fecha() {
    const date = new Date;
    let fecha = date.toLocaleDateString();
    return fecha;
}

function hora() {
    const date = new Date;
    let hora = date.toLocaleTimeString();
    return hora;
}


