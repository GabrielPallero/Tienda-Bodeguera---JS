//Capturando el DOM
const cards = document.getElementById ('cards')
const items = document.getElementById('items')
const datos = document.getElementById('datos')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateDatos = document.getElementById('template-datos').content
const fragment = document.createDocumentFragment()
let carrito ={}
//Evento para pushear objetos al carrito + Json + local storage+ fetch + Toastify
document.addEventListener('DOMContentLoaded', () => {fetchData()
if (localStorage.getItem('carrito')){carrito = JSON.parse(localStorage.getItem('carrito'));construirCarrito()}});
cards.addEventListener('click', e =>{  
Toastify({text:"PRODUCTO AGREGADO AL CARRITO.",duration:2000,destination:"https://apvarun.github.io/toastify-js/#",gravity:"top",position:"rigth",
style:{fontSize:"20px",fontFamily: "Arial",background: "linear-gradient(148deg, rgba(1,19,149,0.9360119047619048) 79%, rgba(244,244,244,1) 100%)",color:"white",}}).showToast(e);agregarCarrito(e)})
//evento boton mas y menos    
items.addEventListener('click', e =>{btnmasmenos(e)})
//Funcion para generar cards + fetch + asincronia
async function fetchData() {
    try {const res = await fetch(' api.json ')
    const data = await res.json()
        construirCards(data)}catch (error){}}
const construirCards = data => {data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.src)
        templateCard.querySelector('.btn-success').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)})
    cards.appendChild(fragment)}
//Funcion para agregar al carrito
const agregarCarrito = e =>{if(e.target.classList.contains('btn-success')){addTrolley(e.target.parentElement)}e.stopPropagation()}
const addTrolley = objeto => {const producto = {id: objeto.querySelector('.btn-success').dataset.id,title:objeto.querySelector('h5').textContent,precio: objeto.querySelector('p').textContent,cantidad: 1,}
    if (carrito.hasOwnProperty(producto.id)){producto.cantidad = carrito[producto.id].cantidad + 1}
    carrito[producto.id] = {...producto};construirCarrito()}
//Construccion de carrito + Json + Local Storage
const construirCarrito = (e) => {items.innerHTML = '';
Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent=producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-primary').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)})
    items.appendChild(fragment)
creardatoscarrito ()
localStorage.setItem('carrito', JSON.stringify(carrito))}
//Pie del carrito con datos
const creardatoscarrito = (e) =>{datos.innerHTML = ''
if(Object.keys(carrito).length === 0){templateDatos.innerHTML = '<th scope="row" colspan="5">Carrito vacío</th>'
;return}
const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
templateDatos.querySelectorAll('td')[0].textContent = nCantidad
templateDatos.querySelector('span').textContent = nPrecio
const clone = templateDatos.cloneNode(true)
fragment.appendChild(clone)
datos.appendChild(fragment)
const botonVaciar = document.getElementById('vaciarcarrito')
//Boton para vaciar papelera + Sweet Alert
botonVaciar.addEventListener('click',function(){Swal.fire({title: '¡Productos eliminados!',text: "Su carrito esta vacío",icon: 'success',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'OK!',});carrito = {};construirCarrito()})}
//Botones mas y menos + Toastify
const btnmasmenos =e => {Toastify({text:"Producto agregado/quitado",duration:2000,destination:"https://apvarun.github.io/toastify-js/#",gravity:"top",position:"left",
style:{fontSize:"20px",fontFamily: "Titillium web",background: "linear-gradient(148deg, rgba(1,19,149,0.9360119047619048) 79%, rgba(244,244,244,1) 100%)",color:"white",}}).showToast(e);
if (e.target.classList.contains('btn-primary')) {const producto = carrito[e.target.dataset.id];producto.cantidad++,carrito[e.target.dataset.id] = {...producto},construirCarrito()};
if (e.target.classList.contains('btn-danger')){const producto = carrito[e.target.dataset.id];producto.cantidad--;
if (producto.cantidad === 0) {delete carrito[e.target.dataset.id]}construirCarrito()}e.stopPropagation()};