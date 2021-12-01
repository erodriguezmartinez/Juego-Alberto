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
  console.log('asdsad');
  new Competicion()
}
class Competicion{
  constructor(){
    
  }
}