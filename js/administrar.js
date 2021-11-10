/**administrar.js
Administración ligas y torneos.
Autores:
  Esperanza Rogríguez Martínez <erodriguezmartinez.guadalupe@alumnado.fundacionloyola.net>.
  Juan Manuel Toscano Reyes <jtoscanoreyes.guadalupe@alumnado.fundacionloyola.net>.
  Pablo Ceballos Benitez <pceballosbenitez.guadalupe@alumnado.fundacionloyola.net>.
  Jose ALejandro Preciado <jpreciadosenero.guadalupe@alumnado.fundacionloyola.net>.
@License GPL v3 o superior.
Año 2021
**/
'use strict'
/**
  Clase Controlador Principal
**/
class Administrar{
  constructor(){
    this.modelo = new Modelo(this)
    this.vista = new Vista(this)
    window.onload = this.iniciar.bind(this);
  }
  iniciar(){
    this.modelo.cargarDatos();
  }
  cambiar(){
    console.log('CAMBIARRRR');
  }
}
class Vista{
  constructor(controlador){
    this.controlador = controlador
  }
  crearTabla(datos){
    //Crear tabla
    let tabla = document.createElement('table');
    document.forms[0].insertBefore(tabla, document.getElementById("guardar"));
    //Primera fila encabezado
    let PrimeraFila = document.createElement('tr');
    tabla.appendChild(PrimeraFila);
    //Primera columna vacia
    let PrimeraColumna = document.createElement('th');
    PrimeraFila.appendChild(PrimeraColumna);
    let i=0;
    for(let jugador of datos.jugadores){
     
      //Creamos tantas columnas necesarias de la primera fila
      let columna = document.createElement('th');
      PrimeraFila.appendChild(columna);
      
      this.ponerNombres(datos.jugadores, jugador, columna, i);

      
      //Creamos tantas filas necesarias como jugadores tengamos
      let fila = document.createElement('tr');
      tabla.appendChild(fila);
      let columnaFilas = document.createElement('th');
      fila.appendChild(columnaFilas);

      this.ponerNombres(datos.jugadores, jugador, columnaFilas, i);

      //Creamos las celdas de los marcadores con sus respectivos marcadores
      let j=0;
      for(let jugador of datos.jugadores){
        let celdaMarcador = document.createElement('td');
        
        if(i==j){
          celdaMarcador.classList.add('vacio');
        }else{
          let marcador = document.createElement('input');
          marcador.setAttribute('type','text');
          marcador.setAttribute('data-fila','i')
          marcador.setAttribute('data-col','j')
          marcador.onchange=this.controlador.cambiar.bind(this.controlador)
          //console.log(datos.resultados[i][j])
          marcador.value = datos.resultados[i][j][0]+ " - "+datos.resultados[i][j][1];
          celdaMarcador.appendChild(marcador);
        }
        fila.appendChild(celdaMarcador);

        j++;
      }
      //Creamos las celdas de los puntos
      let celdaPuntos = document.createElement('th');
      fila.appendChild(celdaPuntos);

      //FALTA INTRODUCIR LOS PUNTOS OBTENIDOS DE LA BBDD

      i++;
    }
  
    //Última columna (puntos) 
    let UltimaColumna = document.createElement('th');
    PrimeraFila.appendChild(UltimaColumna);
    UltimaColumna.appendChild(document.createTextNode('Puntos'));

  }

  ponerNombres(datosJugadores, jugador, columna, i) {

    //Comprobamos si json devuelve un string(tabla individual) o arrray (tabla grupal);
    if(typeof datosJugadores[0]==='string'){
      columna.appendChild(document.createTextNode(jugador));
    }else{ 
      for(let jugadorEquipo of datosJugadores[i]){
        columna.appendChild(document.createTextNode(jugadorEquipo));
        columna.appendChild(document.createElement('br'));
      }
    }
  }

}

class Modelo{
  constructor(controlador){
    this.controlador = controlador;
  }
  cargarDatos(){
    //Cargar el fichero de datos
    fetch("js/datos.json")
    .then(response => response.json())
    .then(datos => {
      this.controlador.vista.crearTabla(datos)});
    
  }
}

var app = new Administrar();
