// Oblig 2do semestre 2023 - Clases

class Sistema {
    constructor() {
        this.listaExperiencias = new Array();
        this.listaCategorias = new Array();
        this.listaCompradores = new Array();
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

    agregarCompradores() {
        this.listaCompradores.push(unComprador)
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

}

class Comprador {
    constructor(unNombre,unMail) { 
        this.nombre = unNombre;
        this.mail = unMail

    }
}

//'gastronomia', 'cena para 2'
