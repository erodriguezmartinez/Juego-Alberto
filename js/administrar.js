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
    this.vista = new Vista()
    window.onload = this.iniciar.bind(this);
  }
  iniciar(){
    //Cargar el fichero de datos
    fetch("js/datos.json")
      .then(response => response.json())
      .then(datos => this.vista.crearTabla(datos));
  }

}
class Vista{
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
    var i=0;
    for(let jugador of datos.jugadores){
     
      //Creamos tantas columnas necesarias de la primera fila
      let columna = document.createElement('th');
      PrimeraFila.appendChild(columna);
      
      /*if(datos.jugadores.isArray()){
        for(let jugadorEquipo of datos.jugadores){
          columna.appendChild(document.createTextNode(jugador));
          columna.appendChild(document.createElement('br'));
        }
      }else{
        columna.appendChild(document.createTextNode(jugador));
      } */
      
      columna.appendChild(document.createTextNode(jugador));
      columna.appendChild(document.createElement('br'));
      
      //Creamos tantas filas necesarias como jugadores tengamos
      let fila = document.createElement('tr');
      tabla.appendChild(fila);
      let columnaFilas = document.createElement('th');
      fila.appendChild(columnaFilas);
      columnaFilas.appendChild(document.createTextNode(jugador));
      columnaFilas.appendChild(document.createElement('br'));

      //Creamos las celdas de los marcadores con sus respectivos marcadores
      
      let j=0;
      for(let jugador of datos.jugadores){
        let celdaMarcador = document.createElement('td');
        
        if(i==j){
          celdaMarcador.classList.add('vacio');
        }else{
          let marcador = document.createElement('input');
          marcador.setAttribute('type','text');
          marcador.setAttribute('placeholder','0 - 0');
          celdaMarcador.appendChild(marcador);
        }
        fila.appendChild(celdaMarcador);

        j++;
      }
      //Creamos las celdas de los puntos
      let celdaPuntos = document.createElement('th');
      fila.appendChild(celdaPuntos);
      i++;
    }
  
    //Última columna (puntos) 
    let UltimaColumna = document.createElement('th');
    PrimeraFila.appendChild(UltimaColumna);
    UltimaColumna.appendChild(document.createTextNode('Puntos'));

    /*for(jugador of datos.jugadores){
      let fila = document.createElement('tr');
      tabla.appendChild(fila);
      for(jugador of datos.jugadores){
        let columna = document.createElement('td');
        tabla.appendChild(fila);
      }
    }*/
  }
}

class Modelo{
  cargarDatos(){

  }
}
var app = new Administrar();
