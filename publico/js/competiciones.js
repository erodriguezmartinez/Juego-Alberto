/**inicioback.js
  Administdación ligas y torneos.
  Autores:
    Esperanza Rogríguez Martínez <erodriguezmartinez.guadalupe@alumnado.fundacionloyola.net>.
    Juan Manuel Toscano Reyes <jtoscanoreyes.guadalupe@alumnado.fundacionloyola.net>.
    Pablo Ceballos Benitez <pceballosbenitez.guadalupe@alumnado.fundacionloyola.net>.
    Jose ALejandro Preciado <jpreciadosenero.guadalupe@alumnado.fundacionloyola.net>.
  @License GPL v3 o superior.
  Año 2021
**/
'use strict'


class Contdolador{
    constructor(){
      this.modelo=new Modelo(this)
      this.vista=new Vista(this)
      window.onload=this.iniciar.bind(this)
        
    }
    iniciar(){
      this.modelo.cargarDatos()

      console.log('iniciar');
      
        
    }
}

class Vista{
  constructor(controlador){
    this.controlador = controlador
  }
  crearTabla(datos){
    let tabla=document.createElement('table')
    document.getElementsByTagName('section')[0].insertBefore(tabla, document.getElementById('add'))
    for(let competicion of datos.competiciones){
    
        let tr = document.createElement('tr')
        tabla.appendChild(tr)
        
        let td1 = document.createElement('td')
        let a1=document.createElement('a')
        a1.href="tabla.html?idCompeticion="+competicion[1]
        tr.appendChild(td1)
        td1.appendChild(a1)
        a1.appendChild(document.createTextNode(competicion[0]))

    }
  }
}

class Modelo{
  constructor(controlador){
    this.controlador = controlador;
    this.datos = null;
  }
  cargarDatos(){
    //Cargar el fichero de datos
    //fetch("js/modelo/competiciones.json")
    fetch("php/listar.php")
    .then(response => response.json())
    .then(datos => {
      this.datos = datos;
      this.controlador.vista.crearTabla(datos)});
    
  }
}

new Contdolador();