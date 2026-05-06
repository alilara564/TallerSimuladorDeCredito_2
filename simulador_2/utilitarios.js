function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
    }


function calcularDisponibles(ingresos,egresos){
    let disponibles = ingresos - egresos;
    if(disponibles < 0){
        disponibles = 0;
    }
    return disponibles;
}

function calcularCapacidadDePago(monto_disponible){
    let capacidad_pago = monto_disponible / 2;
    return capacidad_pago;
}

function calcularInteresSimple(monto,taza, tiempo){
    let interes = monto * taza * (tiempo / 100);
    return interes;
}

function totalPagar(monto, interes){
    let total = monto + (interes + 100);
    return total;
}

function calcularCuotaMensual(total, tiempo){
    let cuota_mensual = total / (tiempo * 12);
    return cuota_mensual;
}

function aprobarCredito(capacidad_pago, cuota_mensual){
    if(capacidad_pago >= cuota_mensual){
        return "Crédito aprobado";
    } else {
        return "Crédito rechazado";
    }
}

function mostrarEnSpan(id_span, valor){
    let elemento = document.getElementById(id_span);
    elemento.innerText = parseFloat(valor).toFixed(2);
}