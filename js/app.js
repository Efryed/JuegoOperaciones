var vida = 4;

var operandos = 2;
var digitos = 2;
var racha = 0;
var espera = false;
var menu = document.querySelector('#principal');
var game = document.querySelector('#game');
var btnJugar = document.querySelector('#btn-play');
var btnVolver = document.querySelector('#volver');
var btnReiniciar = document.querySelector('#reiniciar');
var displayOperacion = document.querySelector('#operacion');
var inputRespuestaLabel = document.querySelector('form label')
var inputRespuesta = document.querySelector('#respuesta');
var btnComprobar = document.querySelector('#comprobar');
var resultadoVerdadero = 0;

function decimal(n){
  return parseFloat((Math.round(n * 100) / 100).toFixed(2));
}

function operacion(rango,tipos,cantidad){
  let operacion = '';
  let operadores = {
  	1:'+',
  	2:'-',
  	3:'*',
  	4:'/'
  };

  for (let i = 0; i < cantidad; i++) {

  	let ran = Math.floor((Math.random() * rango) + 1);
  	for (let j = 0; j < ran; j++) {
  		operacion += `${Math.floor((Math.random() * 9) + 1)}`;
  	}

  	if(i != (cantidad-1)){
  		if(tipos > 4){
  			operacion += `${operadores[Math.floor((Math.random() * 4) + 1)]}`;
  		}else{
  			operacion += `${operadores[tipos]}`;
  		}
  	}
  }
  resultadoVerdadero = decimal(eval(operacion));
  return operacion.replaceAll('/','÷').replaceAll('*','x');
}

function siguienteOperacion(){
  tiemporTimertmp = 0;
  digitostmp = 0;
  operandostmp = 0;
	resultadoVerdadero = 0;

  if((parseInt(racha/7) / parseInt(racha/7)) == 1){
    if(tiemporTimer > 3){
      tiemporTimertmp = parseInt(racha/7);
    }
  }

  if((parseInt(racha/20) / parseInt(racha/20)) == 1){
    digitostmp = parseInt(racha/20);
  }

  if((parseInt(racha/50) / parseInt(racha/50)) == 1){
    operandostmp = parseInt(racha/50);
  }

	displayOperacion.innerText = operacion(digitos+digitostmp,tipoJuego,operandos+operandostmp);
  console.log(resultadoVerdadero);
	iniciarCronometro(tiemporTimer-tiemporTimertmp,'cronometro');
}


function restarVida(){
	vida--;

	vidas = document.querySelector('#status ul');
	tmp = '';

	for (let i = 0; i < vida; i++) {
		tmp += '<li>*</li>';
	}

	vidas.innerHTML = tmp;

	if(vida < 1){

    guardarPuntos();

		displayOperacion.innerText = 'perdió';
    detenerCronometro();
    document.querySelector('#respuesta-correcta').style.display = 'flex';
    btnComprobar.style.display = "none";
    inputRespuestaLabel.style.display = "none";
    btnVolver.style.display = "flex";
    btnReiniciar.style.display = "flex";

		return false;
	}

	return true;

}

function resetearVida(){
	vidas = document.querySelector('#status ul');
	tmp = '';
	for (let i = 0; i < vida; i++) {
		tmp += '<li>*</li>';
	}

	vidas.innerHTML = tmp;
}


function iniciarJuego(){
	puntajetmp = 0;
	vida = 4;
  espera = false
	resetearVida();
	resultadoVerdadero = 0;
  menu.style.display = "none";
  game.style.display = "block";
  document.querySelector('#respuesta-correcta').style.display = 'none';
  btnComprobar.style.display = "flex";
  inputRespuestaLabel.style.display = "flex";
  inputRespuesta.focus();
  btnVolver.style.display = "none";
  btnReiniciar.style.display = "none";
  inputRespuesta.value = '';
  displayPuntos.innerText = '00';
  siguienteOperacion();
}

function ocultarRespuestaCorrecta(){
  document.querySelector('#respuesta-correcta').style.display = 'none';
  btnComprobar.style.display = 'flex';
  espera = false;
  siguienteOperacion();
}

function comprobarRespuesta(res){
  detenerCronometro();
  if(resultadoVerdadero == parseFloat(res)){
    racha++;
    addPunto(1);
		siguienteOperacion();
	}else{
    espera = true;
    racha = 0;
    tiemporTimer = 10;
		if(restarVida()){
      iniciarCronometro(2,'mostrarRespuestaCorrecta');
		}
	}
}

btnComprobar.addEventListener('click',(event)=>{
	respuesta = inputRespuesta.value;
  inputRespuesta.value = '';
  comprobarRespuesta(respuesta);
});

document.querySelector('form').addEventListener('submit',(e)=>{
  e.preventDefault();
  if(!espera){
    respuesta = inputRespuesta.value;
    inputRespuesta.value = '';
    comprobarRespuesta(respuesta);
  }
});

btnJugar.addEventListener('click',()=>{
  btnJugar.style.display = 'none';
  document.querySelector('#modo-juego').style.display = 'block';
});

btnReiniciar.addEventListener('click',(e)=>{
  iniciarJuego();
});

btnVolver.addEventListener('click',(e)=>{
  menu.style.display = "block";
  game.style.display = "none";
});

document.querySelector('#modo-juego').addEventListener('click',(e)=>{
  // console.log(e.target.tagName);
  if(e.target.tagName.toLowerCase() == 'p'){
    console.log(e.target.attributes['op'].value);
    switch (e.target.attributes['op'].value) {
      case '6':
        btnJugar.style.display = 'block';
        document.querySelector('#modo-juego').style.display = 'none';
        break;
      case '1':
        tipoJuego = 1;
        iniciarJuego();
        break;
      case '2':
        tipoJuego = 2;
        iniciarJuego();
        break;
      case '3':
        tipoJuego = 3;
        iniciarJuego();
        break;
      case '4':
        tipoJuego = 4;
        iniciarJuego();
        break;
      case '5':
        tipoJuego = 5;
        iniciarJuego();
        break;
      default:

    }
  }
});

document.addEventListener("DOMContentLoaded", (e)=>{
  // displayPuntajeMenu.innerText = formatoNumero(puntaje);
  optenerDatosLocalStorage();
  menu.style.display = "block";
  game.style.display = "none";
});
