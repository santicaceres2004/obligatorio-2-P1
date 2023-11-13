// Oblig 2do semestre 2023 - Clases

class Sistema {
    constructor() {
        this.listaExperiencias = new Array();
        this.listaCategorias = new Array();
    }

    agregarExperiencia(unaExperiencia) { 
        this.listaExperiencias.push(unaExperiencia)
    }

    agregarCategorias(unaCategoria) { 
        this.listaCategorias.push(unaCategoria)
    }

    devolverCategorias() {
        return this.listaCategorias
    }

    devolverExperiencias() {
        return this.listaExperiencias
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
    constructor(unTitulo, unaDescripcion,unPrecio,unaCantidad,unaCategotia) { 
        this.titulo = unTitulo;
        this.descripcion = unaDescripcion;
        this.precio = unPrecio;
        this.cantidad = unaCantidad;
        this.categoria = unaCategotia;
    }


}

class Comprador {
    constructor(unNombre,unMail) { 
        this.nombre = unNombre;
        this.mail = unMail

    }
}

//'gastronomia', 'cena para 2'