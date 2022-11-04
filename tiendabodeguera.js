let trolley = [];

let btn_agregar = document.querySelectorAll (".botonAgregarcarrito");

for(let boton of btn_agregar){
    boton.addEventListener("click", add_a_trolley)
};
function add_a_trolley(e){
    let child = e.target;
    let father = child.parentNode;
    let grandfather = father.parentNode;

    let nombre_producto = father.querySelector("h5").textContent;
    let precio_producto = father.querySelector("div").textContent;
    let talle_producto = grandfather.querySelector("p").textContent;
    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        talle: talle_producto,
        cantidad: 1,
    }
    trolley.push(producto);
    ocultar_carrito(producto);

    let trolley_arreglo_JSON = JSON.stringify(trolley);
    localStorage.setItem("trolley", trolley_arreglo_JSON);
    let recuperando_arreglo = localStorage.getItem("trolley");
    recuperando_arreglo = JSON.parse(recuperando_arreglo);
};
function ocultar_carrito (producto){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td>${producto.precio}</td>
                      <td>${producto.talle}</td>
                      <td><button class="btn btn-danger quitar_elemento"><i class="fa-solid fa-trash"></i></td>`;
                     
let tabla = document.getElementById("tbody");
tabla.append( fila );

let btn_borrar = document.querySelectorAll(".quitar_elemento");


for( let boton of btn_borrar){

    boton.addEventListener("click" , remove_elemento);
}
};
function remove_elemento(e){

    
    let grandfather = e.target.parentNode.parentNode;

    grandfather.remove();

};

/*let btn_trolley = document.getElementById ("ocultar_carrito");
btn_trolley.addEventListener("click", function(){
let btn_trolley = document.getElementById("trolley");
    if(btn_trolley.style.display != "none"){
        btn_trolley.style.display = "none";
    }
    else{
        btn_trolley.style.display = "flex";
    }
})*/
