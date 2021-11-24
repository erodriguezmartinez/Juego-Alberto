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

/*
  Pasar clave junto a JSON por el boton "Guardar", PHP comprobara la clave para grabar.

*/



class Administrar{
  constructor(){
    this.modelo = new Modelo(this)
    this.vista = new Vista(this)
    window.onload = this.iniciar.bind(this);
  }
  iniciar(){
    this.modelo.cargarDatos();

    if(document.getElementById('guardar') != null)
      document.getElementById('guardar').onclick= this.modelo.guardarDatos.bind(this.modelo);
  }
  cambiar(){
    console.log('CAMBIARRRR');
  }
}
class Vista{
  constructor(controlador){
   this.controlador = controlador;
  }

  crearTabla(datos){
    //Crear tabla
    let tabla = document.createElement('table');
    document.getElementById('tabla').insertBefore(tabla, document.getElementById("guardar"));
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
          let clave = undefined;
          let marcador = document.createElement('input');
          marcador.setAttribute('class', 'marcadores');
          marcador.setAttribute('type','text');
          marcador.setAttribute('data-fila', i)
          marcador.setAttribute('data-col', j)
          if(clave == undefined){
            marcador.setAttribute('readonly','readonly');
          }
          marcador.onblur=this.comprobar;
          marcador.onchange=this.controlador.cambiar.bind(this.controlador)
          //console.log(datos.resultados[i][j])
          marcador.value = datos.resultados[i][j][0]+ " - "+datos.resultados[i][j][1];
          celdaMarcador.appendChild(marcador);

        }
        fila.appendChild(celdaMarcador);

        j++;
      }
      //Creamos las celdas de los puntos
      let  celdaPuntos= document.createElement('th');
      fila.appendChild(celdaPuntos);
      let inputs = fila.querySelectorAll('input[type="text"]')
      let puntos=0;
      for (let input of inputs){
        let valor=input.value.split(" - ")
       if(parseInt(valor[0])>parseInt(valor[1])){
          puntos+=3
       }
       if(parseInt(valor[0])==parseInt(valor[1])){
        puntos+=1
     }
      }
      celdaPuntos.appendChild(document.createTextNode(puntos));
      //FALTA INTRODUCIR LOS PUNTOS OBTENIDOS DE LA BBDD
      puntos=0;

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

  comprobar(){
    console.log("Comprobar...");
    /*
    let exp1= new RegExp(/^(\d{1,3}\.){3}\d{1,3}$/);
    //if(!document.getElementById('iTP').ariaValueMax.match(exp1)){
    if(!exp1.test(document.getElementById('iTP').value)){
        console.log('IP erronea');
        */
  }


}


class Modelo{
  constructor(controlador){
    this.controlador = controlador;
    this.datos = null;
  }
  cargarDatos(){
    //Cargar el fichero de datos
    fetch("js/modelo/datos.json")
    .then(response => response.json())
    .then(datos => {
      this.datos = datos;
      this.controlador.vista.crearTabla(datos)});

  }
  guardarDatos(){
    let inputs = document.querySelectorAll('input[type="text"]')

    for (let input of inputs){
      let fila = input.getAttribute('data-fila')
      let col = input.getAttribute('data-col')

      //parsear

      //split
      let valor=input.value.split(" - ")

      if (this.datos.resultados[fila][col] != null){
        this.datos.resultados[fila][col][0] = parseInt(valor[0])
        this.datos.resultados[fila][col][1] = parseInt(valor[1])
      }

    }

    console.log(JSON.stringify(this.datos))


    //pasarlo a JSON



    //guardar en PHP

  }
}

var app = new Administrar();
