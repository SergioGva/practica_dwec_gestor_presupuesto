import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
} from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){

    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        
        let divGasto = document.createElement("div");
            divGasto.className = "gasto";
            elemento.appendChild(divGasto);

        if(gasto.descripcion){
            let divGastoDescripcion = document.createElement("div");
                divGastoDescripcion.className = "gasto-descripcion";
                divGastoDescripcion.innerHTML += gasto.descripcion;
                divGasto.appendChild(divGastoDescripcion);
        }
        if(gasto.valor){
            let divGastoFecha = document.createElement("div");
                divGastoFecha.className = "gasto-fecha";
                divGastoFecha.innerHTML += gasto.fecha;
                divGasto.appendChild(divGastoFecha);
        }
        if(gasto.fecha){
            let divGastoValor = document.createElement("div");
                divGastoValor.className = "gasto-valor";
                divGastoValor.innerHTML += gasto.valor;
                divGasto.appendChild(divGastoValor);
        }
        let divGastoEtiquetas = document.createElement("div");
            divGastoEtiquetas.className = "gasto-etiquetas";
            
            gasto.etiquetas.forEach(etiqueta => {
                var spanEtiqueta = document.createElement('span');
                spanEtiqueta.className="gasto-etiquetas-etiqueta";
                spanEtiqueta.innerHTML = etiqueta;
                divGastoEtiquetas.appendChild(spanEtiqueta);
            });
            divGasto.appendChild(divGastoEtiquetas);
/*
        let btnEditar = document.createElement('button');
            btnEditar.type = 'button';
            btnEditar.className = 'gasto-editar';
            btnEditar.textContent = 'Editar';
            
        let gastoEditar = new EditarHandle(gasto);
            gastoEditar.gasto = gasto;
            btnEditar.addEventListener('click', gastoEditar);
            divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement('button');
            btnBorrar.type = 'button';
            btnBorrar.className = 'gasto-borrar';
            btnBorrar.textContent = 'Borrrar';

        let gastoBorrar = new BorrarHandle(gasto);
            gastoBorrar.gasto = gasto;
            btnBorrar.addEventListener('click', gastoBorrar);
            divGasto.appendChild(btnBorrar);*/
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
    
        let divAgrupacion = document.createElement("div");
            divAgrupacion.className = "agrupacion";

        if(periodo){
            let titPeriodo = document.createElement("h1");
                titPeriodo.innerHTML += "Gastos agrupados por " + periodo;
                divAgrupacion.appendChild(titPeriodo);
        }

        if(agrup){
            for(let property in agrup){
                var divAgrup = document.createElement('div');
                divAgrup.className = "agrupacion-dato";
                
                var spanAgrupClave = document.createElement('span');
                spanAgrupClave.className = "agrupacion-dato-clave";
                spanAgrupClave.innerHTML += property;
                divAgrup.appendChild(spanAgrupClave);
    
                var spanAgrupValor = document.createElement('span');
                spanAgrupValor.className = "agrupacion-dato-valor";
                spanAgrupValor.innerHTML += agrup[property];
                divAgrup.appendChild(spanAgrupValor);

                divAgrupacion.appendChild(divAgrup);
            }
        }
        elemento.appendChild(divAgrupacion);
    }

}
function repintar(){
    mostrarDatoEnId(mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(calcularBalance(),"balance-total");
    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "valor";

    listarGastos().forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo",gasto); 
    });
}

 let actualizarPresupuestoWeb = function(){
    let presupuesto = Number(prompt("Introduzca un nuevo presupuesto", 100));
    actualizarPresupuesto(presupuesto);
    repintar()
}

let btnPresupuesto = document.getElementById("actualizarpresupuesto");
btnPresupuesto.onclick = actualizarPresupuestoWeb

let nuevoGastoWeb = function() {
    let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
    let nuevoValor = parseFloat(prompt('Introduce el valor del nuevo gasto'));
    let nuevaFecha = prompt('Introduce la fecha del nuevo gasto');
    let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',');

    anyadirGasto(new CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas))

    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.onclick = nuevoGastoWeb

function EditarHandle(gasto){/*
    this.gasto = gasto;
    this.handleEvent = function(){
        let descripcion = prompt("Introduzca una descripcion", this.gasto.descripcion);
        if(descripcion){
            this.gasto.actualizarDescripcion(descripcion);
        }
        let valor = Number(prompt("Introduzca un valor", this.gasto.valor));
        if(valor){
            this.gasto.actualizarValor(valor);
        }
        let fecha = new Date(prompt("Introduzca una fecha", this.gasto.fecha));
        if(fecha){
            this.gasto.actualizarFecha(fecha);
        }
        let etiquetas = prompt("Introduzca las etiquetas", this.gasto.etiquetas);
        let arrEtiquetas = [];
        if(etiquetas){
            arrEtiquetas = etiquetas.split(',');
            this.gasto.anyadirEtiquetas(arrEtiquetas);
        }
        repintar();
    }*/
}

function BorrarHandle(gasto){
    /*this.gasto = gasto;
    this.handleEvent = function(){

    }
    repintar();*/
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}