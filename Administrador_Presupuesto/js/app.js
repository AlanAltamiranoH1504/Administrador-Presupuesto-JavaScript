/**
 * VIDEO NO. 181 PRIMERSOS PASOS CON EL PROYECTO
 */

// Variables
const formulario = document.querySelector("#agregar-gasto");
const listaGastos = document.querySelector("#gastos ul");
const divAlertas = document.querySelector("#alertas");

//Eventos
//Funcion que carga todos los eventListener
eventListeners();
function eventListeners(){
    //Cuando el documento este listo llamamos a la funcion que pregunta el presupuesto
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
    //Evento que llama la funcion agregarGasto cuando se hace submit en el formulario 
    formulario.addEventListener("submit", agregarGasto);
}

//Clases
class Presupuesto{
    //Costructor que recibe el presupuesto y el restante
    constructor(presupuesto){
        this.presupuesto = parseFloat(presupuesto);
        //El restante inicia siendo el presupuesto 
        this.restante = parseFloat(presupuesto);
        //Atributo de todos los gastos que hay
        this.gastos = [];
    }

    //Funcion que recibe un objeto de tipo gasto y lo agrega al arreglo de gastos
    agregarAGastos(gasto){
        //Agregamos el gasto que recibimos al arreglo de gastos
        this.gastos.push(gasto);
    }

    //Funcion que actualiza el presupuesto 
    actualizarRestante(gastos){
        let totalGastos = 0;

        //Recorremos el arreglo de objetos de tipo gasto
        gastos.forEach((gasto) =>{
            //Destructuring para obtener la cantidad de gasto de cada objeto
            const {cantidadGasto} = gasto;
            //Actualizamos el total d ee los gastos
            totalGastos += cantidadGasto
        });
        //Actuaizamos el restante restandole al presupuesto el total de gastos
        this.restante = this.presupuesto - totalGastos;

        //Insertamos el nuevo restante
        document.querySelector("#restante").textContent = this.restante;
    }

    //Funcion que elimina un gasto del array gastos
    eleminiarGastoFinal(idGasto){
        this.gastos = this.gastos.filter((gasto) =>{
            return idGasto !== gasto.idGasto;
        })
        
        //Llamamos al metodo que listaGastos  para eliminar los gastos del html
        ui.listarGastos(this.gastos);
        //Llamamos al metodo actualizar restante 
        presupuesto.actualizarRestante(this.gastos);
        console.log(presupuesto);
        //Llamamos a la funcion comprobarPresupuesto
        ui.comprobarPresupuesto(presupuesto);
    }
}

class UI{
    //Funcion que inserta el presupuesto en el html
    insertarPresupuesto(cantidadDinero){
        //Destructuring del objeto que recibimos
        const {presupuesto, restante} = cantidadDinero;

        //Agregamos la cantidad de presupuesto y la cantidad de restante al html
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    //Funcion que muestra un mensaje de alerta
    imprimirAlerta(mensaje, tipo){
        //Creamos y agregamos estilos al div de alerta 
        const divAlerta = document.createElement("div");
        divAlerta.classList.add("text-center", "alert");

        //Verificamos que tipo de alerta es
        if(tipo === "error"){
            //Agregamos la clase de "alert-danger" al divAlerta
            divAlerta.classList.add("alert-danger");
            //Le pasamos el mensaje al divAlerta
            divAlerta.textContent = mensaje;
        }else{
            //Agregamos clase de "alert-succes" al divAlerta
            divAlerta.classList.add("alert-success");
            //Agregamos mensaje al div 
            divAlerta.textContent = mensaje;
            
        }
        //Reiniciamos el formulario
        formulario.reset();
        //Agregamos el divAlerta como hijo del div de alertas
        divAlertas.appendChild(divAlerta);
        
        //Removemos la alerta despues de 3 segundos
        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }

    //Funcion que lista los gastos en el html. Recibe el array de gastos
    listarGastos(gastos){
        //Limpiamos el div de listaGastos
        listaGastos.textContent = "";

        //Iteramos sobre el arreglo de gastos
        gastos.forEach((gasto) => {
            //Hacemos destructuring del objeto dentro de gastos
            const {nombreGasto, cantidadGasto, idGasto} = gasto;
            //Por cada gasto que haya en el arreglo gastos creamos un div
            const liGasto = document.createElement("li");
            liGasto.classList.add("list-group-item", "d-flex", "justify-content-between", "aling-items-center");
            //Agregamos atributo al liGasto
            liGasto.setAttribute("data-id", idGasto);
            //Agregamos valores al liGasto
            liGasto.innerHTML = `${nombreGasto}<span class="badge badge-primary badge-pill">${cantidadGasto}</span>`;

            //Agregamos boton al liGasto
            const btnBorrar = document.createElement("button");
            btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
            btnBorrar.textContent = "Borrar";
            liGasto.appendChild(btnBorrar);

            //Agregamos funcion al boton borrar
            btnBorrar.onclick = ()=>{
                //Llamamos a la funcion eliminar gasto y le pasamos idGasto
                eliminarGasto(idGasto);
            }

            //Agregamos el nodo como hijo de la variable listaGastos
            listaGastos.appendChild(liGasto);
        });
    }

    //Funcion que cambia el color del presupuesto 
    comprobarPresupuesto(presupesuto2){

        //Desctruring del objeto presupuesto para  obtener restante
        const {presupuesto,restante} = presupesuto2;

        let veitiCinco = presupuesto * 0.25;
        let cincuenta = presupuesto * 0.5;

        const restanteDiv = document.querySelector(".restante");

        //Verificamos el gasto que se hizo
        if(restante < veitiCinco){
            //Modificamos estilos 
            restanteDiv.classList.add("alert-danger");
        }else if(restante <= cincuenta && restante >= veitiCinco){
            //Modificamos estilos 
            restanteDiv.classList.add("alert-warning");
        }else{
            //Modificamos estilos 
            restanteDiv.classList.add("alert-success");
        }

        if(restante <= 0){
            //Deshabilitamos el boton
            formulario.querySelector("button[type='submit']").disabled = true; 
        }
        
    }   
}
//Instancias de las clases
let presupuesto;
let ui = new UI();


//Funciones
//Funcion que pregunta el presupuesto al usuario 
function preguntarPresupuesto(){
    //Leemos el presupuesto del usuario. Lo convertimos a numero
    const presupuestoUsuario = Number(prompt("¿Cual es tu presupuesto?"));  

    //Validamos que el presupuesto que se ingrese no sea cadena vacia, null, menor o igual a cero y que no sea un numero
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        //Volvemos a pedir el presupuesto
        window.location.reload();
        return;
    }
    //Si pasamos la validacion instanciamos el objeto "presupuesto" con la clase "Presupuesto", pasandole "presupuestoUsuario"
    presupuesto = new Presupuesto(presupuestoUsuario); 

    //Al objeto ui le pasamos el presupuesto y ejecutamos el metodo insertarPresupuesto
    ui.insertarPresupuesto(presupuesto);
}

//Funcion que agrega el gasto que se ingreso al arreglo de gastos 
function agregarGasto(e){
    e.preventDefault();

    //Leemos los dos input que hay en el formulario 
    const inputNombreGasto = document.querySelector("#gasto").value;
    const inputCantidadGasto = document.querySelector("#cantidad").value;

    //Validamos los datos del formulario que se leyeron
    if(inputNombreGasto === "" || inputNombreGasto === null  || inputCantidadGasto === "" || inputCantidadGasto === null){
        //Llamamos al objeto ui y a la funcion que manda una alerta. Le pasamos el mensaje de alerta y el tipo de error
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;
    } if(inputCantidadGasto <= 0){
        //Madamos alerta
        ui.imprimirAlerta("La cantidad no puede ser negativa o igual a 0", "error");
        return;
    } if(isNaN(inputCantidadGasto)){
        //Mandamos alerta
        ui.imprimirAlerta("La cantidad debe ser un valor numerico", "error");
        return
    }else{
        //Si no hay error en la validacion mandamos una alerta de datos correctos
        ui.imprimirAlerta("Valores Correctos");
    }

    //Si lo que se ingreso en el formulario es correcto, se crea un objeto de tipo gasto con cada input
    const gasto = {
        nombreGasto: inputNombreGasto,
        cantidadGasto: Number(inputCantidadGasto)   ,
        idGasto: Date.now()
    }
    //Llamamos al objeto presupuesto con el metodo agregarAGastos y le pasamos el nuevo gasto
    presupuesto.agregarAGastos(gasto);
    //Imprimimos alerta de que el gasto fuer agregado
    ui.imprimirAlerta("Gasto agregado correctamente!");

    //Llamamos al objeto presupuesto con el metodo listarGastos, del objeto presupesuto solo le pasamos el arrayList de gastos
    const {gastos} = presupuesto;
    ui.listarGastos(gastos);

    //Llamamos al objeto presupuesto con el metodo actualizarRestante, del objeto presupuesto le pasamos gastos
    presupuesto.actualizarRestante(gastos);

    //Llamamos al objeto ui con el metodo comprobarPresupuesto y le pasamos todo el objeto presupuesto
    ui.comprobarPresupuesto(presupuesto);
}

//Funcion que elimina un gasto del arreglo de gastos 
function eliminarGasto(idGasto){
    //Llamamos al obeto presupuesto y el evento eleminiarGastoFinal
    presupuesto.eleminiarGastoFinal(idGasto);
}