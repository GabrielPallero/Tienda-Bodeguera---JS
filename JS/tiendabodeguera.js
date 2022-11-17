const cards = document.getElementById ('cards')
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateDatos = document.getElementById('template-datos').content
const fragment = document.createDocumentFragment()

let carrito =[]
document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData= async()=>{
    const res = await fetch('tiendabodegueraapi.json');
    const data= await res.json()
    crearCards(data)
}
const construirCards = data => {
    data.forEach(camiseta => {
        templateCard.querySelector('h5').textContent = camiseta.title
        templateCard.querySelector('p').textContent = camiseta.precio
        templateCard.querySelector('img').setAttribute("src", camiseta.src)
        templateCard.querySelector('.btn-success').dataset.id = camiseta.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const setTrolley = camiseta => {
    const producto = {
        title: camiseta.querySelector('h5').textContent,
        precio: camiseta.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(camiseta.id)) {
        camiseta.cantidad = carrito[camiseta.id].cantidad + 1
    }

    carrito[camiseta.id] = { ...camiseta }
    
    construirCarrito()
}
const construirCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        items.innerHTML = ''
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        
        const clone = templateTrolley.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
creardatoscarrito ()
}
const creardatoscarrito = () =>{
    templateDatos.innerHTML = ''
    return
}
if(Object.keys(carrito).length === 0){
    templateDatos.innerHTML = '<th scope="row" colspan="5">Carrito vacío con innerHTML</th>'
    
}
const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

templateDatos.querySelectorAll('td')[0].textContent = nCantidad
templateDatos.querySelector('span').textContent = nPrecio

const clone = templateDatos.cloneNode(true)
fragment.appendChild(clone)

templateDatos.appendChild (fragment)



const btnmasmenos =e => {
    if (e.target.classList.contains('btn-info')) {
        const camiseta = carrito[e.target.dataset.id]
        camiseta.cantidad++
        carrito[e.target.dataset.id] = { ...camiseta }
        crearCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const camiseta = carrito[e.target.dataset.id]
        camiseta.cantidad--
        if (camiseta.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...camiseta}
        }
        crearCarrito()
    }
    e.stopPropagation()
}