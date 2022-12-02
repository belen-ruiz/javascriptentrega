
//capturas DOM
let productosCarrito = JSON.parse(localStorage.getItem("carrito"))  || [] ;
let cuentas = JSON.parse(localStorage.getItem("cuentas"))  || [] ;
let messages = JSON.parse(localStorage.getItem("messages")) || [];

let divProductos = document.getElementById("productos")
let buscador = document.getElementById("buscador")
let modalBody = document.getElementById("modal-body")
let btnVerCatalogo = document.getElementById("btnVer")
let btnOcultarCatalogo = document.getElementById("btnOcultar")
let btnCarrito = document.getElementById("botonCarrito")
let contactModal = document.getElementById("contactModal")
let btnLogin = document.getElementById("btnLogin")
let btnCloseLogin = document.getElementById("btnCloseLogin");
let divCompra = document.getElementById("precioTotal")
let btnFinalizarCompra = document.getElementById("botonFinalizarCompra")
let botonLupa = document.getElementById("botonLupa")
let desplegable = document.getElementById("desplegable")
let ordenMayor = document.getElementById("ordenMayor")
let ordenMenor = document.getElementById("ordenMenor")
let ordenAlf = document.getElementById("ordenAlf")
let botonAplicar = document.getElementById('botonAplicar')






//FUNCIONES
  
    
function mostrarCatalogo(array) {
      divProductos.innerHTML = "";
      for (let producto of array) {
        let nuevoProducto = document.createElement("DIV");
        nuevoProducto.innerHTML = 
        `<div id="${producto.id}" class="card productoCard" style="width: 18rem;">
                  
          <img class="card-img-top" style="height: 250px;"src="img/ropa${producto.id}.jpg " alt="${producto.cat}">
  
          <div class="card-body">
              <h4 class="card-title">${producto.cat}</h4>

              <p class="gen">Género: ${producto.gen}</p>

              <div class="talles">
                  <fieldset>
                      <legend>Selecciona tu talle</legend>
                          <div class="radios">
                              <div>
                                <input type="radio" id="s" name="drone" value="huey"
                                      checked>
                                <label for="huey">S</label>
                              </div>
                          
                              <div>
                                <input type="radio" id="m" name="drone" value="dewey">
                                <label for="dewey">M</label>
                              </div>
                          
                              <div>
                                <input type="radio" id="l" name="drone" value="louie">
                                <label for="louie">L</label>
                              </div>
                          </div>
                  </fieldset>
              </div>
              
              <p class="precio">$${producto.precio}</p>
    
              <i id="agregarBtn${producto.id}" class="bi bi-bag btnComprar"></i>
          </div>
        </div>`;
        divProductos.appendChild(nuevoProducto);
        
        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)
        btnAgregar.addEventListener("click", ()=>{
          agregarCarrito(producto)
        })
        mostrarCarrito(productosCarrito)
        
      }
}
  
function cargarProdEnCarrito(array){
    modalBody.innerHTML =""
    array.forEach((productoCarrito) => {
      modalBody.innerHTML += 
        `<div class="card border-success mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">  
          <div class="card-body">
                <img class="card-img-top" src="img/ropa${productoCarrito.id}.jpg" alt="${productoCarrito.cat}">

                <h4 class="card-title">${productoCarrito.cat}</h4>

                <p class="card-text">$${productoCarrito.precio}</p> 

                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
          </div>    
        </div>`
    });
  
  array.forEach((productoCarrito)=>{
      document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{

      Toastify({
        text: `${productoCarrito.cat} ha sido eliminado del carrito`,
        duration: 3000,
        style:{
          background: "red",
        }
        }).showToast();

      //Eliminar del DOM
      let cardProd = document.getElementById(`productoCarrito${productoCarrito.id}`)
      cardProd.remove()
  
      //elimina del array
      let productoEliminar = array.find(producto => producto.id == productoCarrito.id)

      let posicion = array.indexOf(productoEliminar)
      array.splice(posicion, 1)
  
      //elimina del storage
      localStorage.setItem("carrito", JSON.stringify(productosCarrito))
      
      //calculo total
      compraTotal(array)

      //eliminar del carrito
      mostrarCarrito(productosCarrito)

    })
    //calculo total
   compraTotal(array)
   }
  )
  
}

function agregarCarrito(producto){

  let productoAgregado = productosCarrito.find((elem) => {elem.cat == producto.cat})

  console.log(productoAgregado)

  if (productoAgregado == undefined){
    productosCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))

    cargarProdEnCarrito(productosCarrito)
    mostrarCarrito(productosCarrito)
      
    Toastify({
        text: `${producto.cat} ha sido agregado al carrito`,
        duration: 2000,
        style:{
          background: "green",
        }
      }).showToast();
  }else{
    console.log(productoAgregado + "ya esta")

    Swal.fire({
      title: "Producto ya agregado",
      text: `${producto.cat} ya se encuentra en el carrito`,
      icon: "info",
      timer: 2000,
      confirmButtonText: "Entendido",
      confirmButtonColor: "green"
    })
  }
}

function mostrarCarrito (array){
  let divCantidadProductos = document.getElementById("carritoNumber")
  divCantidadProductos.innerText = array.length
  divCantidadProductos.style.display = "block"

  array.length === 0 && (divCantidadProductos.style.display = "none")
}
  
function compraTotal(array){
  let acumulador = 0
  acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
  acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es de:  <span>$${acumulador}</span>`
}

function finalizarCompra(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Desea confirmar su compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, seguro.',
    cancelButtonText: 'No, no quiero',
    reverseButtons: true
  })
  
  .then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Su compra ha sido realizada',
        'Recibirá los datos por mail.',
        'success',

        productosCarrito = [],
        localStorage.removeItem("carrito")
      )
    } 
    else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Sus productos permanecen en el carrito',
        'error',
      )
    }
  })
}

function cargarMessages(array) {
    let nombreInput = document.getElementById("nombreInput");
    let apellidoInput = document.getElementById("apellidoInput");
    let mailInput = document.getElementById("mailInput");
    let mensajeInput = document.getElementById("mensajeInput");
    
    let message = new Persona(
      nombreInput.value,
      apellidoInput.value,
      mailInput.value,
      mensajeInput.value,
    );
    
    array.push(message);
  
    localStorage.setItem("messages", JSON.stringify(array));
  
    nombreInput.value = "";
    apellidoInput.value = "";
    mailInput.value = "";
    mensajeInput.value = "";
  }

function cargarCuenta(array) {
    let nombreInputCuenta = document.getElementById("nombreInputCuenta");
    let emailInputCuenta = document.getElementById("emailInputCuenta");
    let passwordInputCuenta = document.getElementById("passwordInputCuenta");
    
    let cuenta = new Cuenta(
        nombreInputCuenta.value,
        emailInputCuenta.value,
        passwordInputCuenta.value,
    );

    nombreInputCuenta.value == "" ||
    emailInputCuenta.value == "" ||
    passwordInputCuenta.value == "" ?  
          Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Ingrese los datos solicitados`,
          showConfirmButton: false,
          timer: 1500,
          })   
        
          : array.push(cuenta);

    localStorage.setItem("cuentas", JSON.stringify(array));
  
    nombreInputCuenta.value = "Ingrese su nombre";
    emailInputCuenta.value = "Ingrese su E-mail";
    passwordInputCuenta.value = "";

}
   
function buscarInfo(buscado, array){

  let coincidencia = document.createElement("DIV")
  coincidencia.innerHTML = ""
  coincidencia.classList.add("coincidencia")

  let busqueda = array.filter(
                      (producto) => producto.cat.toLowerCase().includes(buscado.toLowerCase()) 
                      || 
                      producto.gen.toLowerCase().includes(buscado.toLowerCase()))

      busqueda.length == 0 ? 
                  (coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`, mostrarCatalogo(array)) 
                  : (coincidencia.innerHTML = " ", mostrarCatalogo(busqueda))
}
              
function ordenarAz(array) {
  let alfabeticamente = array.slice()
    alfabeticamente.sort((a,b) => {
    if(a.cat < b.cat)return -1
    if(a.cat > b.cat)return 1
    return 0
   })
   mostrarCatalogo(alfabeticamente)
  }

function ordenarPrecioMayorMenor(array) {
  let mayorMenor = [].concat(array)  
  array.sort((a, b) => a.precio - b.precio)
     mostrarCatalogo(mayorMenor)
}
   
function ordenarPrecioMenorMayor(array) {
    let menorMayor = [].concat(array)  
    array.sort((a, b) => b.precio - a.precio)
      mostrarCatalogo(menorMayor)
  }

function filtrar(){
  btnBorrarFiltros = document.getElementById(`btnBorrarFiltros`)
  categoriaChecked = document.querySelector('input[name="identificador"]:checked');
  coincidencia = document.createElement("DIV")
  coincidencia.innerHTML = ""
  coincidencia.classList.add("coincidencia")
  
  categoriaChecked = categoriaChecked.value

  categoriaChecked = deposito.filter(
                    (elem) => elem.cat.toLowerCase().includes(categoriaChecked.toLowerCase()) 
                    ||
                    elem.gen.toLowerCase().includes(categoriaChecked.toLowerCase())
                    )

                    mostrarCatalogo(categoriaChecked)
                    btnBorrarFiltros.style.display = "block"

                    btnBorrarFiltros.addEventListener("click", ()=>{
                      coincidencia.innerHTML =  mostrarCatalogo(deposito)
                      btnBorrarFiltros.style.display = "none"
                    })    
}


  
//EVENTOS 
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, deposito)})

btnLogin.onclick = (()=>{contactModal.style.display = "block"})

btnCloseLogin.onclick = (()=>{contactModal.style.display = "none"})

sendBtn.addEventListener("click", ()=>{cargarMessages(messages)})
  
btnEnviarDatos.addEventListener("click", ()=>{cargarCuenta(cuentas)})

btnVer.onclick = () =>{mostrarCatalogo(deposito)}
  
btnOcultar.onclick = ()=>{divProductos.innerHTML =""}
  
btnCarrito.addEventListener("click", ()=>{cargarProdEnCarrito(productosCarrito)})

btnFinalizarCompra.onclick = (()=>{finalizarCompra()})

botonAplicar.addEventListener('click', filtrar)

ordenMayor.onclick = () =>{ordenarPrecioMayorMenor(deposito)}

ordenMenor.onclick = () =>{ordenarPrecioMenorMayor(deposito)}

ordenAlf.onclick = () =>{ordenarAz(deposito)}

botonLupa.onclick = (()=>{
  (desplegable.style.display == "block") ? desplegable.style.display = "none" : desplegable.style.display = "block"
})


//codigo

setTimeout(()=>{
    loaderTexto.innerHTML = ""
    loader.remove()
    mostrarCatalogo(deposito)
    
}, 1500)
  







