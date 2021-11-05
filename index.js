const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;
//CONSIGNA Nº 1
//Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

let data = fs.readFileSync('./productos.txt');

let productos = JSON.parse(data);
let cantidad = productos.length;

//CONSIGNA Nº 2
//Ruta get '/productoRandom' que devuelva un producto elegido al 
//azar desde un array de productos que se encuentran en el archivo 'productos.txt'.
const aleatorio = Math.floor(Math.random() * (cantidad - 1) + 1);
console.log(aleatorio);

const prod = productos[aleatorio];

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.get('/', (req,res)=>{
    res.send('<h1> Bienvenidos al Servidor Express </h1>');
});

app.get('/productos', (req,res)=>{
    //CONSIGNA Nº 1
    //Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
    // res.send({ productos }),para este ejercicio utilizaré la clase Constructor de la clase anterior
    class Constructor {
        constructor(archivo) {
            this.archivo = archivo;
            this.productos = [];
        }
        async save(productosParaAgregar) {
            // El ID del objeto se incrementa en uno dependiendo la cantidad de elementos que 
            //tenga el array
            productosParaAgregar = {
                title: productosParaAgregar.title,
                price: productosParaAgregar.price,
                thumbnail: productosParaAgregar.thumbnail,
                id: this.productos.length + 1
            }
            //Agrega el objeto "productosParaAgregar" al array de productos
            this.productos.push(productosParaAgregar);
            //Escribe el array productos en formato texto dentro del archivo que 
            //pasamos como parámetro
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, '\t'))
                .then(()=>console.log('Archivo guardado con éxito!'))//Mensaje de éxito
                .catch(error=>{ //Mensaje de error
                    console.log('Error!', error);
                });
        }
        getById(numero) {   
            const data = fs.readFileSync(this.archivo, 'utf-8');
            const dataParseada = JSON.parse(data);
            //Comprueba si el ID existe o no
            const existe = dataParseada.some(producto => producto.id === numero);
            //Filtra el objeto de acuerdo a su ID
            let dataParseadaFiltrada = dataParseada.filter( e => {
                return (e.id === numero)
            });
            //Condicional: Si el objeto con ID existe, devuelve el objeto, si no, devuelve null
            if(existe) {
                console.log(dataParseadaFiltrada);
            } else {
                console.log(`No existe el producto con el id solicitado ${null}`);
            }
        }
    
        getAll() { const data = fs.readFileSync(this.archivo, 'utf-8');
            const dataParseada = JSON.parse(data);
            console.log(dataParseada);
            return dataParseada;
        }
    
        deleteById(numero) {
            const data = fs.readFileSync(this.archivo, 'utf-8');
            const dataParseada = JSON.parse(data);
            //Elimina del array el producto que tenga el id que se pasa como parámetro
            const EliminaProductoArray = dataParseada.filter(producto => producto.id !== numero);
            console.log(EliminaProductoArray);
            //Sobreescribir el archivo en formato texto
            fs.writeFileSync(this.archivo, JSON.stringify(EliminaProductoArray, null, '\t'));
    
        }
        deleteAll() {
            //Vacia el array de productos
            this.productos = [];
            //Escribe el array vacio en el objeto
            fs.writeFileSync(this.archivo, JSON.stringify(this.productos));
            //Mensaje de éxtio
            console.log('Se borraron todos los productos exitosamente');
        }
    }
    
    const archivo = new Constructor ('./productos.txt');

    res.send(archivo.getAll());

    
});

app.get('/productoRandom', (req,res)=>{
    //Ruta get '/productoRandom' que devuelva un producto elegido al 
    //azar desde un array de productos que se encuentran en el archivo 'productos.txt'.
    res.send({ producto: {prod} });
});