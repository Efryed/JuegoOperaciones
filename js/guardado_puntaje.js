var tipoJuego = 0;
var puntajetmp = 0;
var displayPuntos =  document.querySelector('#puntos');


var displayP = {
  1:document.querySelector('#puntaje-suma'),
  2:document.querySelector('#puntaje-resta'),
  3:document.querySelector('#puntaje-multiplicacion'),
  4:document.querySelector('#puntaje-division'),
  5:document.querySelector('#puntaje-aleatorio')
}


var puntaje = {
  1:0,
  2:0,
  3:0,
  4:0,
  5:0
}

function guardarDatosLocalStorage(){
  localStorage.setItem('puntos',JSON.stringify(puntaje));
}

function optenerDatosLocalStorage(){
  if(localStorage.getItem("puntos")){
    let data = JSON.parse(localStorage.getItem("puntos"));
    puntaje = data;
    displayP[1].innerText = formatoNumero(data[1]);
    displayP[2].innerText = formatoNumero(data[2]);
    displayP[3].innerText = formatoNumero(data[3]);
    displayP[4].innerText = formatoNumero(data[4]);
    displayP[5].innerText = formatoNumero(data[5]);
	}else{
    localStorage.setItem('puntos',JSON.stringify(puntaje));
  }
}

function addPunto(p){
  puntajetmp += p;
  displayPuntos.innerText = formatoNumero(puntajetmp);
}


function resetearPuntos(){
  
}


function guardarPuntos(){
  if(puntajetmp > puntaje[tipoJuego]){
    puntaje[tipoJuego] = puntajetmp;
    displayP[tipoJuego].innerText = formatoNumero(puntajetmp);
    guardarDatosLocalStorage();
  }
}
