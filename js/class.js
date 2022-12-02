


//class constructora
class Producto {
  constructor(id, cat, talle, gen, precio) {
      (this.id = id),
      (this.cat = cat),
      (this.talle = talle),
      (this.gen = gen),
      (this.precio = precio);
  }
  mostrarDatos() {
    console.log(`Caracteristicas de éste/a ${this.cat}:
                Articulo #${this.id}
                Talle: ${this.talle}
                Género: ${this.gen}
                Precio: $${this.precio}`);
  }
  sumarIva() {
    this.precioIva = this.precio * 1.21;
  }
}

class Persona {
  constructor(nombre, apellido, email, mensaje) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.email = email),
      (this.mensaje = mensaje);
  }
  mostrarDatos() {
    console.log(`Persona:
                 Nombre #${this.nombre}
                 Talle: ${this.apellido}
                 email: ${this.email}
                 mensaje: $${this.mensaje}`);
  }
}


class Cuenta {
    constructor(nombre, email, password) {
      (this.nombre = nombre),
        (this.email = email),
        (this.password = password);
    }
    mostrarData() {
      console.log(`Persona:
                   Nombre #${this.nombre}
                   email: ${this.email}
                   mensaje: $${this.password}`);
    }
  }



// //catalogo

//array de stock
let deposito = []

const cargarDeposito = async()=>{
    const response = await fetch("productos.json")
    const data = await response.json()

    for(let producto of data){
        let productoNuevo = new Producto(producto.id, producto.cat, producto.talle, producto.gen, producto.precio)
        deposito.push(productoNuevo)
    }

    //seteo del storage
    localStorage.setItem("deposito", JSON.stringify(deposito))
} 

//inicializar deposito con operador OR 
if(localStorage.getItem("deposito")){
  deposito = JSON.parse(localStorage.getItem("deposito"))
}else{
    console.log("Seteando el array por primera vez")
    cargarDeposito()
    console.log(deposito)
  }
