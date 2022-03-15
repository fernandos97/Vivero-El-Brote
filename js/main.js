//ARRAY PRODUCTOS//
const productos = [
    {id:1, nombre: "FERTILIZANTES", precio: 2000, stock:2, img: "imagenes/comboFertilizantes.jpg",},
    {id:2, nombre: "COMBO PLANTAS", precio: 1500, stock:10, img: "imagenes/comboPlantas.jpg",},
    {id:3, nombre: "COMBO SUSTRATOS", precio: 1800, stock:10, img: "imagenes/comboSustratos.jpg",},
	{id:4, nombre: "KIT HERRAMIENTAS JARDIN", precio: 2500, stock:0, img: "imagenes/herramientasKit.jpg",},
	{id:5, nombre: "COMBO MACETAS", precio: 500, stock:10, img: "imagenes/macetasKit.jpg",},
    {id:6, nombre: "COMBO SEMILLAS", precio: 1250, stock:10, img: "imagenes/kitSemillas.jpg",},
    {id:7, nombre: "PULVERIZADOR", precio: 450, stock:10, img: "imagenes/pulverizador.jpg",},
    {id:8, nombre: "JABON POTASICO", precio: 900, stock:10, img: "imagenes/jabonPotasico.jpg",},

    ]



    $(document).ready(function () {
        $("#btnMain").click(function (e) {
            let hijos = $(e.target).parent().children();
            console.log(hijos[0].value);
        });
    });


	//MOSTRAR PRODUCTOS EN EL INDEX//

let contenedorProductos = $("#contenedor_productos");

muestraProductos(productos)

function muestraProductos(productos) {

    contenedorProductos.html('');

        for(const producto of productos) {
            contenedorProductos.append(`
    <div id="btnMain">
    <img src="${producto.img}" alt=" "class="gallery__img">
    <p class="nombres">${producto.nombre}</p>
    <p class="nombres">${producto.precio}</p>
    <button onclick=agregarAlCarrito(${producto.id}) id="btnMain">Agregar al Carrito</button>
    </div>`
    )}
}

//FUNCIONA CARRITO, FUNCIONA//
const abrirCarrito = $('#boton-carrito')

const cosoContenedor = $('.coso-contenedor')

const cerrarCarrito = $('#cerrar-carrito')

const cosoCarrito = $('.coso-carrito')


abrirCarrito.on('click', () => {
    cosoContenedor
    .fadeIn(500)
    .css({
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100%",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
        transition: "all .5s",
    })

})

cerrarCarrito.on('click', () => {
    cosoContenedor.fadeOut(800)
})


cosoContenedor.on('click', () => {
    cosoContenedor.slideUp(1000)
})

cosoCarrito.on('click', (event) => {
    event.stopPropagation()

})


//LE CARRITO//

let carrito = []

let carritoLS = JSON.parse(localStorage.getItem('carrito'))

if (carritoLS) {
    carrito = carritoLS
    actualizarCarrito()
}

function agregarAlCarrito(idProducto) {

    const productoElegido = carrito.find(el => el.id === idProducto)
    const {stock} = productos.find(el => el.id === idProducto)

    if (productoElegido) {
        if((productoElegido.cantidad + 1) <= stock) {
            productoElegido.cantidad +=1
        } else {
            Swal.fire('No hay suficiente Stock')
        }
    } else if (stock > 0) {
        const {id, precio, nombre} = productos.find(el => el.id === idProducto)
        carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1})
    } else {
        Swal.fire('No hay suficiente Stock')
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))

    actualizarCarrito()
}


//CARRITO ACTUALIZADO CON LOS PRODUCTOS//

function actualizarCarrito() {

    const contenedorCarrito = document.getElementById('contenedor-carrito')
    const precioTotal = document.getElementById('precio-total')
    const contadorCarrito = document.getElementById('contador-carrito')


    contenedorCarrito.innerHTML = ''

    carrito.forEach((producto) => {
        contenedorCarrito.innerHTML += `
        <div class="producto-carrito">
        <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio * producto.cantidad}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></button>
        </div>
        `
    })

    let ingresarPrecioTotal = carrito.reduce( (acc, el) => acc + (el.precio * el.cantidad), 0 )
        precioTotal.innerText = ingresarPrecioTotal

    contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0 )
    localStorage.setItem('contadorCarrito', JSON.stringify(carrito.length))
}

//ELIMINAR PRODUCTO DEL CARRITO//

function eliminarProducto(id) {
    const quitarProducto = carrito.find(el => el.id === id)

    quitarProducto.cantidad--

    if(quitarProducto.cantidad === 0) {
        const indice = carrito.indexOf(quitarProducto)
        carrito.splice(indice, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
}

//ELIMINAR TODO//

function eliminarTodo() {
    localStorage.clear(carrito)
    carrito = []
    actualizarCarrito()
    cosoContenedor.fadeOut(800)
}


function irPagar() {
    Swal.fire('Gracias por su compra!')
}







