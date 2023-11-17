// Oblig 2do semestre 2023 - Clases

class Sistema {
    constructor() {
        this.listaExperiencias = new Array();
        this.listaCategorias = new Array();
        this.listaCompradores = new Array();
        this.listaExperienciasCompradas = new Array();
    }


    agregarExperiencia(unaExperiencia) { 
        this.listaExperiencias.push(unaExperiencia)
    }

    agregarCategoria(unaCategoria) { 
        this.listaCategorias.push(unaCategoria)
    }

    devolverCategorias() {
        return this.listaCategorias
    }

    devolverExperiencias() {
        return this.listaExperiencias
    }

    devolverCompradores() {
        return this.listaCompradores
    }

    eliminarExperiencia(index) {
        if (index >= 0 && index < this.listaExperiencias.length) {
            this.listaExperiencias.splice(index, 1);
        }
    }

    eliminarCategoria(index) {
        if (index >= 0 && index < this.listaCategorias.length) {
            this.listaCategorias.splice(index, 1);
        }
    }

    existeCategoria(unNombre) {
        let existe = false;
        for (let pos = 0; pos<this.listaCategorias.length&&!existe; pos++) {
            let unaCategoria = this.listaCategorias[pos];
            if (unaCategoria.nombre==unNombre){
                existe = true;
            }
        }
        return existe;

    } 

    existeCategoriaEnExperiencias(unaCategoria) {
        let existe = false;
        for (let pos = 0; pos<this.listaExperiencias.length&&!existe;pos++) {
            let catEnExp = this.listaExperiencias[pos];
            if(catEnExp.categoria == unaCategoria) {
                existe = true;
            }
        }
        return existe;
    }

    agregarCompradores(unComprador) {
        this.listaCompradores.push(unComprador)
    }

    existeExperienciaIgual(unTitulo) {
        let existe = false;
        for(let pos = 0; pos<this.listaExperiencias.length&&!existe; pos++){
            let titEnExp = this.listaExperiencias[pos];
            if (titEnExp.titulo == unTitulo){
                existe=true;
            }
        }
        return existe;
    } 

    existeExperienciaComprada(unaExperiencia) {
        let existe = false;
        for (let pos = 0; pos<this.listaCompradores.length&&!existe;pos++){
            let experienciaComprada = this.listaCompradores[pos];
            if(experienciaComprada.compra == unaExperiencia) {
                existe = true;
            }
        }
        return existe;
    }
    

    ordenarCopiaExpPorPrecio () {
        let copia = new Array() ;
        for (let unaExperiencia of this.listaExperiencias){
            copia.push(unaExperiencia)
        }
        return copia.sort(function (a, b) {
            if (a.compararPrecio && b.compararPrecio) {
                return a.compararPrecio(b);
            }
            return 0;
        });
    }
    

    devolverExpPorCantPersonas(cantPersonas) {
        let copia = new Array();
        if (cantPersonas === "todos") {
          return this.listaExperiencias;
        }
        for (let unaExperiencia of this.listaExperiencias) {
          if (unaExperiencia.cantidad == cantPersonas) copia.push(unaExperiencia);
        }
        return copia;
        }

        devolverExpPorCat(NombreunaCategoria) {
            let copia = new Array();
            for (let unaExperiencia of this.listaExperiencias) {
              if (unaExperiencia.categoria == NombreunaCategoria)
                copia.push(unaExperiencia);
            }
            return copia;
            }

            devolverPorPrecioDescendente(precioCategoria) {
                let copia = new Array();
                for (let unaExperiencia of this.listaExperiencias) {
                    copia.push(unaExperiencia);
                }
            
                return copia.sort(function (a, b) {
                    return b.precio - a.precio;
                });
            }
            
            devolverPorPrecioAscendente() {
                let copia = new Array();
                for (let unaExperiencia of this.listaExperiencias) {
                    copia.push(unaExperiencia);
                }
                return copia.sort(function(a, b) {
                    return a.precio - b.precio;
                });
            }
            
            

}

class Categoria {
    constructor(unNombre, unDetalle){
        this.nombre = unNombre;
        this.detalle = unDetalle;
    }

    toString() {
        let texto = this.nombre + 'Detalle: ' + this.detalle;
        return texto
    }
}

class Experiencia {
    constructor(unTitulo, unaDescripcion,unPrecio,unaCantidad,unaCategoria) { 
        this.titulo = unTitulo;
        this.descripcion = unaDescripcion;
        this.precio = unPrecio;
        this.cantidad = unaCantidad;
        this.categoria = unaCategoria;
    }

    compararPrecio (otraExperiencia) {
        return this.precio - otraExperiencia.precio;

    }

    // no usado todavia
    compararPersonas(otraExperiencia) {
        return this.cantidad - otraExperiencia.cantidad; //(los valores son string)
    }

}

class Comprador {
    constructor(unNombre,unMail,unaCompra) { 
        this.nombre = unNombre;
        this.mail = unMail
        this.compra = unaCompra
    }
}

//'gastronomia', 'cena para 2'
