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
    let tabla = document.createElement('table');
    document.forms[0].insertBefore(tabla, document.getElementById("guardar"));
    let fila = document.createElement('tr');
    tabla.appendChild(fila);
    for(let jugador of datos.jugadores){
      let columna = document.createElement('th');
      fila.appendChild(columna);
    }
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
