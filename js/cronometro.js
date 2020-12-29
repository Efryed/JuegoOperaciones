var tiempo = 0;
var idTimer = 0;
var tiemporTimer = 10;

function formatoNumero(t){
	return `${t}`.length > 1 ? `${t}`: `0${t}`
}

function iniciarCronometro(t,func){
  let timer = document.querySelector('#time');
	tiempo = t;

  switch (func) {
    case 'cronometro':
      timer.innerText = formatoNumero(t);
      idTimer = setInterval(cronometro,1000);
      break;
    case 'mostrarRespuestaCorrecta':
      btnComprobar.style.display = 'none';
      document.querySelector('#respuesta-correcta p').innerText = `Error: ${resultadoVerdadero}`;
      document.querySelector('#respuesta-correcta').style.display = 'flex';
      idTimer = setTimeout(ocultarRespuestaCorrecta,1000*tiempo);
      break;
    default:

  }

}

function cronometro(){
	time.innerText = formatoNumero(tiempo-1);
	tiempo--;

	if(tiempo == 0){
		time.innerText = 'tiempo';
		detenerCronometro();
		if(restarVida()){
			iniciarCronometro(2,'mostrarRespuestaCorrecta');
		}else{
      detenerCronometro();
    }
	}
}


function detenerCronometro(){
	clearInterval(idTimer);
}
