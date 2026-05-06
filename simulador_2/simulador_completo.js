
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;
 
function ocultarSecciones(){
  let componente= document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");  // oculta
 
  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");
 
  let componente3 = document.getElementById("credito");
  let listaClass3 = componente3.classList;
  listaClass3.remove("activa");
}
 
 
function mostrarSeccion(id){
  ocultarSecciones();
 
  let componente= document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");  //activa
}
 
// funcion guradar tasa
// Conectar el botón Guardar tasa con la función
//
function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  if(tasa>=10 && tasa<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+tasa+" %"); //mostrar texto: util.
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10 y 20");  //funcion utilitarios
  }
}
 
//----- ADMINISTRACION DE CLIENTES --------
 
// AGREGAR ID Y PLACEHOLDER A LOS INPUTS
//CREAR ARREGLO     let clientes=[]
 
// FUNCION GUARDAR CLIENTES
/*
  1. Obtener datos del formulario
  2. Convertir valores numéricos
  3. Crear objeto cliente
  4. Agregarlo al arreglo   */
 
function guardarCliente(){
 
  let valorCedula =   recuperaraTexto("idCedula");
  let valorNombre =   recuperaraTexto("idNombre");
  let valorApellido = recuperaraTexto("idApellido");
  let valorIngresos = recuperarFloat("idIngresos");
  let valorEgresos =  recuperarFloat("idEgresos");
 
  let cliente ={};
 
  cliente.cedula = valorCedula;
  cliente.nombre = valorNombre;
  cliente.apellido = valorApellido;
  cliente.ingresos = valorIngresos;
  cliente.egresos = valorEgresos;
 
  let busqueda = buscarCliente(valorCedula);
 
  if(busqueda == null){
    clientes.push(cliente);    // guarda el cliente dentro de clientes[]
    pintarClientes();                 //llama a la funcion pintar para mostrar datos en la tabla  
  } else{
    busqueda.nombre = valorNombre;
    busqueda.apellido = valorApellido;
    busqueda.ingresos = valorIngresos;
    busqueda.egresos = valorEgresos;
    //clientesArreglo.push(busqueda);
    pintarClientes();    
  }
 
  limpiar();
   
}
 
 
// FUNCION PINTAR CLIENTES
/*
  1. Recorrer el arreglo
  2. Generar filas <tr> dinámicamente
  3. Insertarlas en: <tbody id="tablaClientes">
  4. Cada fila debe tener: Datos del cliente Y  Botón Actualizar  */
 
  /* Estructura de una tabla:
 
<table>
    <tr>
        <th>cabecera1</th>
        <th>cabecera2</th>
    </tr>
 
    <tr>
        <td>fila1</td>
        <td>fila2</td>
    </tr>
</table>   */
 
  function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";
 
    let elementosTabla;
    let filaTabla = "";
 
    for(let i=0;  i<clientes.length; i++){
      elementosTabla = clientes[i];
 
      filaTabla += "<tr>"+
                      "<td>"+ elementosTabla.cedula     +"</td>"+
                      "<td>"+ elementosTabla.nombre     +"</td>"+
                      "<td>"+ elementosTabla.apellido   +"</td>"+
                      "<td>"+ elementosTabla.ingresos   +"</td>"+
                      "<td>"+ elementosTabla.egresos    +"</td>"+
                      "<td><button onclick='seleccionarCliente("+ elementosTabla.cedula +")'>Actualizar</button>"+"<button>"+'Eliminar'+"</button></td>"+      
                  "</tr>";      
    }
    tabla.innerHTML = filaTabla;  
  }
 
 
 
  //----- BUSCAR Y ACTUALIZAR --------
 
/*   Función buscarCliente(cedula)
● Retorna:
  ○ Cliente si existe
  ○ null si no        */
function buscarCliente(cedula){
  let elementoTabla;
  let clienteEncontrado = null;
 
  for(let i=0; i<clientes.length; i++){
    elementoTabla = clientes[i];
      if(elementoTabla.cedula == cedula){
        clienteEncontrado = elementoTabla;
        break;                    
      }
  }
 
  return clienteEncontrado;
}
 
/*Función seleccionarCliente(cedula)
  Debe:
      1. Buscar el cliente
      2. Guardarlo en clienteSeleccionado
      3. Mostrar datos en inputs              */
 
function seleccionarCliente(cedula){     // falta entender esta parte
  let resultado = buscarCliente(cedula);
 
  if(resultado != null){
      clienteSeleccionado = resultado;
      mostrarTextoEnCaja("idCedula",clienteSeleccionado.cedula);
      mostrarTextoEnCaja("idNombre",clienteSeleccionado.nombre);
      mostrarTextoEnCaja("idApellido",clienteSeleccionado.apellido);
      mostrarTextoEnCaja("idIngresos",clienteSeleccionado.ingresos);
      mostrarTextoEnCaja("idEgresos",clienteSeleccionado.egresos);
  }
 
}
 
 
 
// Función limpiar()
//   Debe vaciar todos los inputs.
function limpiar(){
  document.getElementById("idCedula").value = "";
  document.getElementById("idNombre").value = "";
  document.getElementById("idApellido").value = "";
  document.getElementById("idIngresos").value = "";
  document.getElementById("idEgresos").value = "";
}
 
 
// SIMULADOR PARTE 2 *****************************
 
function buscarClienteCredito(){
    // Paso 1: leer la cédula del input "buscarCedulaCredito"
    let cedula = recuperaraTexto("buscarCedulaCredito");
   
    // Paso 2: buscar el cliente con buscarCliente(...)
    let cliente = buscarCliente(cedula);
   
    // Paso 3: el if/else que decide qué hacer
    if(cliente === null){
        document.getElementById("datosClienteCredito").innerHTML = "CLIENTE NO ENCONTRADO";
    } else {
       
        let datos = "<h3>Datos del Cliente</h3>" +
                    "<p><strong>Cédula:</strong>" + cliente.cedula + "</p>" +
                    "<p><strong>Nombre:</strong>" + cliente.nombre + "</p>" +
                    "<p><strong>Apellido:</strong>" + cliente.apellido + "</p>" +
                    "<p><strong>Ingresos:</strong>" + cliente.ingresos + "</p>" +
                    "<p><strong>Egresos:</strong>" + cliente.egresos + "</p>";
       
        // Insertar datos en el DOM
        document.getElementById("datosClienteCredito").innerHTML = datos;
    }
}

function calcularCredito(){
    let fila = document.getElementById("resultadoCredito");
    fila.innerHTML = "";
    
}