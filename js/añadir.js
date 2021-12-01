'use strict'

var id = "0"
var atributoSeleccionado = "0"


function anadir(){
  let div = document.getElementById('equipomas')

  let saltolinea = document.createElement('br')
  div.appendChild(saltolinea)

  let input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('name', `${id}`)
  input.setAttribute('data-jugador',1)
  input.className += "inputs2"
  div.appendChild(input)
  id = parseInt(id)+1;

  let botonmenos = document.createElement('input')
  botonmenos.setAttribute('type', 'button')
  botonmenos.setAttribute('value', '-')
  botonmenos.onclick = destruir
  botonmenos.className += "botonmenos"
  div.appendChild(botonmenos)
}

function destruir(evento){
  evento.target.previousElementSibling.remove()
  evento.target.previousElementSibling.remove()
  evento.target.remove()

}



function enviar(){
  let comp=new Competicion(document.getElementById('nombre').value,document.getElementById('descripcion').value)
  let inputs=document.querySelectorAll('input[data-jugador]')
  for(let input of inputs){
    comp.anadirjugador(input.value)
  }
  
  let opciones={
    method: 'POST',
    body: JSON.stringify(comp),
    headers:{ 'Content-Type': 'application/json'}
  }
  fetch('php/alta.php', opciones)//Haemos la petición
    .then(respuesta=>respuesta.text())//Recibimos un objetos de tipo Response. respuesta.text devuelve una Promise
    .then(texto=>console.log(texto))
}
class Competicion{
  constructor(nombre,descripcion){
    this.nombre=nombre
    this.descripcion=descripcion
    this.jugadores=[]
  }
  anadirjugador(nombre){
    this.jugadores.push(nombre)
  }
}