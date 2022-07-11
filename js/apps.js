const productContainer = document.querySelector('#product-container')
const carritoContenedor =document.querySelector('#carrito-contenedor')
 
const carrito = []

stockProductos.forEach((producto)=>{
    const div = document.createElement('div')
div.classList.add('producto')

div.innerHTML = `
        <img src=${producto.img} alt="" class="product-image">
        <h3>${producto.nombre}</h3>
        <p class="product-description">${producto.desc}</p>
        <p class="productPrice">$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fa-light fa-cart-shopping"></i></button>
    `

productContainer.append(div)
})

const agregarAlCarrito = (id) =>{
    const item = stockProductos.find((producto)=> producto.id === id)
    carrito.push(item)

    renderCarrito()
}

const renderCarrito = () =>{

    carrito.forEach((item)=>{
        const div = document.querySelector('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                <p>${item.nombre}</p>
                <p>$${item.precio}</p>
                <button class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
        carritoContenedor.append(div) 
    })
}

