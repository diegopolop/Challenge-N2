var pantalla = document.querySelector("#ahorcado");
var pincel = pantalla.getContext("2d");

/*Posición donde comienzan las lineas para las letras */
var posicionLineasX = 300;
var posicionLineasY = 700;
var largoLinea = 70;

/*Dibuja el ahorcado a medida que erran las letras*/
function dibujarAhorcado(error){
    
    if(error == 0){
        /*Color de fondo*/
        pincel.beginPath();
        pincel.fillStyle = "transparent";
        pincel.fillRect(0,0,1200,800);

        /*Base del ahorcado*/
        pincel.lineWidth = 7;
        pincel.strokeStyle = "black";
        pincel.beginPath();
        pincel.moveTo(45,700);
        pincel.lineTo(150,650);
        pincel.lineTo(250,700);
        pincel.lineTo(48,700);
        pincel.stroke();
    }

    if(error == 1){
        /*Mastil*/
        dibujarRecta(150,650,150,300);   
    }
    if(error == 2){
        /*Barra horizontal*/
        dibujarRecta(146,300,350,300);
    }
    if(error == 3){
        /*Barra vertical*/
        dibujarRecta(348,300,350,400);
    }
    if(error == 4){
        /*Cabeza*/
        pincel.beginPath();
        pincel.arc(350,430,35,0,2*Math.PI);
        pincel.stroke();
    }
    if(error == 5){
        /*Cuerpo*/
        dibujarRecta(350,460,350,550);
    }
    if(error == 6){
        /*Pierna izquierda*/
        dibujarRecta(350,550,280,630);
    }
    if(error == 7){
        /*Pierna derecha*/
        dibujarRecta(350,550,400,630);
    }
    if(error == 8){
        /*Brazo izquierdo*/
        dibujarRecta(350,497,290,530);
    }
    if(error == 9){
        /*Brazo Derecho*/
        dibujarRecta(350,497,400,530);
        /*Ojo Izquiero*/
        dibujarRecta(320,420,340,440);
        dibujarRecta(340,420,320,440);
        /*Ojo Derecho*/
        dibujarRecta(360,420,380,440);
        dibujarRecta(380,420,360,440);
    }
}

/*Dibuja las lineas donde aparece las letras correctas */
function dibujarLineas(palabra){
    pincel.beginPath()
    for(let i=0;i<palabra.length;i++){
        var posicion = posicionLineasX + (largoLinea*i);
        pincel.moveTo(posicion,posicionLineasY);
        pincel.lineTo(posicion + 50,posicionLineasY);
        pincel.stroke();
    }   
}

/*Funcion para dibujar todas las lineas del dibujo del ahorcado */
function dibujarRecta(inicioX,inicioY,finX,finY){
    pincel.beginPath();
    pincel.strokeStyle = "black";
    pincel.lineWidth = 7;
    pincel.moveTo(inicioX,inicioY);
    pincel.lineTo(finX,finY);
    pincel.stroke();
}

/*Escribe la letra arriba de su respectiva linea */
function escribirLetra(letra,linea,color){
    let posicion = posicionLineasX + (largoLinea*linea);
    pincel.beginPath()
    pincel.font = "40pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(letra,posicion+6,690);
}

/*Escribe las que son error */
function escribirLetraError(letra,error){
    let posicion = 600 + (50*error);
    pincel.beginPath();
    pincel.font = "40pt Verdana";
    pincel.fillStyle ="red";
    pincel.fillText(letra,posicion,500);

}

/*Escribe una palabra en un posicion determinada*/
function escribirPalabra(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "40pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

function escribirPalabraChica(palabra,posicionX,posicionY,color){
    pincel.beginPath();
    pincel.font = "20pt Verdana";
    pincel.fillStyle =color;
    pincel.fillText(palabra,posicionX,posicionY);
}

/*Crea el Botón "INICIO" para volver al comienzo de la página */
function crearderechos (){
    pincel.fillText(" GAME OVER ",500,760);
    escribirPalabraChica("Programa creado por Diego Polop para Alura Challenge Nº 2",100,800, "black");

        
}
