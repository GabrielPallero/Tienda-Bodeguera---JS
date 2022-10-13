class Producto{
    constructor(tipo, color, talle, anio){
        this.tipo=tipo;
        this.color=color;
        this.talle=talle;
        this.anio=anio;
    }
}
let lista_productos = [];
for(let i=0;i<5;i++){
let tipo=prompt("Ingrese tipo de ropa");
let color=prompt("Ingrese el color");
let talle=prompt("Ingrese el talle");
let anio=prompt("ingrese el año");

let nuevo_producto= new Producto(tipo, color, talle, anio);
lista_productos.push(nuevo_producto);
}
console.log(lista_productos);


for( let elemento  of lista_productos){

    console.log( elemento);
    console.log("<------------DATOS PRODUCTO----------->")
    console.log("Producto: " , elemento.tipo);
    console.log("Producto: " , elemento.color);
    console.log("Producto: " , elemento.talle);
    console.log("Producto: " , elemento.anio);
}