'use strict'

var id = "0"
var atributoSeleccionado = "0"


function anadir(){
  let div = document.getElementById('equipomas')

  let saltolinea = document.createElement('br')
  div.appendChild(saltolinea)
  div.style.display = 'flex'

  let input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('name', `${id}`)
  input.className += "inputs2"
  div.appendChild(input)
  id = parseInt(id)+1;

  let botonmenos = document.createElement('button')
  let imagenboton = document.createElement('img')
  imagenboton.src = "img/less.png"
  imagenboton.classList.add('addImg')
  botonmenos.classList.add('botonmasmenos')
  botonmenos.appendChild(imagenboton)
  botonmenos.onclick = destruir
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
