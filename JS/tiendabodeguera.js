const cards = document.getElementById ('cards')
const items = document.getElementById('items')
const datos = document.getElementById('datos')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateDatos = document.getElementById('template-datos').content
const fragment = document.createDocumentFragment()

let carrito ={}
document.addEventListener('DOMContentLoaded', () => { fetchData() });
cards.addEventListener('click', e =>{
    agregarCarrito(e)
})


async function fetchData() {
    try {
        const res = await fetch(' api.json ')
        const data = await res.json()
        construirCards(data)
    } catch (error) { }
}

const construirCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.src)
        templateCard.querySelector('.btn-success').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
const agregarCarrito = e =>{
    if(e.target.classList.contains('btn-success')){
        addTrolley(e.target.parentElement)
    }
    e.stopPropagation()
    
}
const addTrolley = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-success').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1,
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    
    construirCarrito()
}
const construirCarrito = (e) => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent=producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
creardatoscarrito ()
}
const creardatoscarrito = (e) =>{
    datos.innerHTML = ''
if(Object.keys(carrito).length === 0){
    templateDatos.innerHTML = '<th scope="row" colspan="5">Carrito vacío</th>'
    return
}
const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
templateDatos.querySelectorAll('td')[0].textContent = nCantidad
templateDatos.querySelector('span').textContent = nPrecio
const clone = templateDatos.cloneNode(true)
fragment.appendChild(clone)
datos.appendChild(fragment)
const botonVaciar = document.getElementById('vaciarcarrito')
botonVaciar.addEventListener('click',()=>{
    carrito = {}
    construirCarrito()
})
}

const btnagregarcarrito =e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        construirCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
     
            carrito[e.target.dataset.id] = {...producto}
        }
        construirCarrito()
    }
    e.stopPropagation()
}