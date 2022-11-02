let nombre_usuario;
let pasword;

nombre_usuario = "Gabriel";
pasword= 1921;

let usuario = prompt("Ingrese su usuario");
let contraseña = prompt("Ingrese su contraseña");

if(usuario == "Gabriel" & contraseña==1921){
    
    alert("Bienvenido a la tienda bodeguera");
   
}
else if(usuario != "Gabriel" || contraseña != 1921){
    alert("No puede ingresar, usuario o contraseña incorrectos")
}
    
class Producto{
    constructor(tipo, precio, color, talle, anio){
        this.tipo=tipo;
        this.precio=precio;
        this.color=color;
        this.talle=talle;
        this.anio=anio;
    }
    get_datos(){
        console.log("<------------------>");
        console.log("Tipo de producto:", this.tipo);
        console.log("Precio:", this.precio);
        console.log("Talle:", this.talle);
        console.log("Color:", this.color);
    }
    get_stock(){

    }
}
function buscar_producto( producto ){

    return producto.tipo == compra
}
let lista_productos = [];
for(let i=0;i<3;i++){
let tipo=prompt("Ingrese tipo de ropa");
let precio=prompt("Ingrese el precio");
let color=prompt("Ingrese el color");
let talle=prompt("Ingrese el talle");
let anio=prompt("ingrese el año");
let producto = new Producto( tipo, precio, color, talle, anio );
lista_productos.push(producto);
}
console.log(lista_productos);


for( let producto  of lista_productos){

    producto.get_datos();
}

let compra = prompt("Ingrese el nombre del producto que desea comprar");

let resultado_find = lista_productos.find(buscar_producto)

console.log( resultado_find);
