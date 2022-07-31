
const productContainer = document.querySelector('#product-container')
const carritoContenedor =document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')
const btnVaciar = document.getElementById('vaciarCarrito')
 
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

stockProductos.forEach((producto)=>{
    const div = document.createElement('div')
    div.classList.add('producto')

    div.innerHTML = `
                    <img src=${producto.img} alt="" class="product-image">
                    <h3>${producto.nombre}</h3>
                    <p class="product-description">${producto.desc}</p>
                    <p class="productPrice">$${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                `

    productContainer.append(div)
})



const agregarAlCarrito = (productId) =>{
    //const item = stockProductos.find((producto)=> producto.id === id)
    //carrito.push(item)
    const itemInCart = carrito.find((producto) => producto.id === productId)

    if (itemInCart){
        itemInCart.cantidad += 1
        showMensaje(itemInCart.nombre)
    }else{
        const {id, nombre, precio} = stockProductos.find( (producto) => producto.id === productId)

        const itemToCart = {
            id,
            nombre,
            precio,
            cantidad: 1 
        }
        carrito.push(itemToCart)
        showMensaje(nombre)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito()
    renderCantidad()
    renderTotal()
}


const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)

    item.cantidad -=1

    if (item.cantidad === 0){
        const indice = carrito.indexOF(item)
        carrito.splice(indice, 1)
    }
    
    Toastify({
        text: `${item.nombre} ha sido eliminado del carrito`,
        position: 'right',
        gravity: 'bottom',
        duration: 5000,
        style:{
            background: "linear-gradient(to right, #f17b5d, #f02f2f)",
        }
    }).showToast()

    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

const vaciarCarrito = () =>{
    carrito.lenght = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

btnVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas Seguro?',
        text: 'Esta a punto de vaciar el carrito',
        icon:'warning',
        showCancelButton: true,
        confirmButtomColor:'#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar',
        cancelButtonText: 'No, Cancelar'
    }).then( (result) => {
        if (result.isConfirmed){
            vaciarCarrito()
            botonCerrar.click()
            Toastify({
                text: 'Se vacio el carrito',
                position: 'right',
                gravity: 'bottom',
                duration: 5000,
                style:{
                    background: "linear-gradient(to right, #f17b5d, #f02f2f)",
                }
            }).showToast()
        }
    })
})


const renderCarrito = () => {
    carritoContenedor.innerHTML = ''

    carrito.forEach((item)=>{
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                <p>${item.nombre}</p>
                <p>$${item.precio}</p>
                <button onclick="removerDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
        carritoContenedor.append(div) 
    })
}


const renderCantidad = () =>{
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0 )
}

const renderTotal = () =>{
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio* producto.cantidad
    })

    precioTotal.innerText = total
}

const showMensaje = (nombre) => {
    Toastify({
        text: `${nombre} ha sido agregado correctamente`,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        onClick: () => {
            botonAbrir.click()
        },
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}


renderCarrito()
renderCantidad()
renderTotal()

