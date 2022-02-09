let jugar = document.querySelector("#iniciar-juego");
let agregarPalabra = document.querySelector("#nueva-palabra");
let palabraNueva = document.querySelector("#input-nueva-palabra");
let error = document.querySelector("#error");
let repetida = document.querySelector("#repetida");

/*Lista de palabras */
let listaPalabras = ["ALURA","ORACLE","CARTERA","MUSICA","COCODRILO","TELEFONO"];

/*Chequea que las localStorage no este creada. Si esta creada la levanta, sino la crea */
if(!localStorage.getItem("listaDePalabras")){
    localStorage.setItem("listaDePalabras",JSON.stringify(listaPalabras));
}else{
listaPalabras = JSON.parse(localStorage.getItem("listaDePalabras"))
}

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Almacena las letras equivocadas
var letrasEncontradas = []; //Guarda las letras correctas
var palabra = "";

// Evento comenza juego
jugar.addEventListener("click",comenzar);

/*Inicia el juego */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); //Saca el foco del botón 
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)]

    // reset
    letrasErradas = [];
    letrasEncontradas = [];
    event.preventDefault();

    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); 
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirPalabraChica("Ingrese una letra con el teclado",600,250,"#fff");

    // Toma letra presionada del teclado
    document.addEventListener("keypress",teclado);
};

/*Verifica la letra del teclado presionada. Si esta en la palabra, la ingresa
en el array de letras correctas y la anota; si no esta la imprime con los errores y la ingresa
en el array de errores.*/
function teclado(event){
    var letraNoEncontrada = true; //Condición para saber si la letra esta NO está en la palabra
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasEncontradas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"blue");
                    letrasEncontradas.push(letraIngresada);

                };
            };
            if ((letraNoEncontrada) && (!validacionLetraError(letraIngresada))){
                letrasErradas.push(letraIngresada);
                dibujarAhorcado(letrasErradas.length);
                escribirLetraError(letraIngresada,letrasErradas.length);
                alert ("Has errado")
            }
        }
    }

    finDelJuego();
    
}

//*Verifica si se GANÓ o PERDIÓ
function finDelJuego(){
    if(letrasEncontradas.length==palabra.length){
        alert ("HAS GANADO");
        crearderechos();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            alert ("HAS PERDIDO");
            crearderechos();
            document.removeEventListener("keypress",teclado);
            for(var t in palabra){
                escribirLetra(palabra[t],t,"red");
            }
        }
    }

    /*Chequea si el click en canvas se hizo cobre el botón */
    pantalla.onclick = inicio;
    function inicio(evento){
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        if ((x<630)&&(x>480)&&(y<770)&&(y>725)){
            document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});
        }
    }
}

    agregarPalabra.addEventListener("click",function(event){
    let palabraIngresada = palabraNueva.value.toLocaleUpperCase();

    if ((!validarPalabraNueva(palabraIngresada)) || (palabraIngresada == "")){
        error.classList.remove("invisible");
        palabraNueva.focus();
        setTimeout(function(){
            error.classList.add("invisible");
        },2000);
        
    }else{
        if(validarPalabraRepetida(palabraIngresada)){
            repetida.classList.remove("invisible");
            palabraNueva.focus();
            setTimeout(function(){
            repetida.classList.add("invisible");
            },2000);
        }else{
            listaPalabras.push(palabraIngresada);
            localStorage.setItem("listaDePalabras",JSON.stringify(listaPalabras));
            agregada.classList.remove("invisible");
            setTimeout(function(){
            agregada.classList.add("invisible");
            },2000);
            palabraNueva.value="";
        }
    }
});

////////////////////VALIDACIONES /////////////////////////////////

var abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*Valida que la letra ingresada sea la correcta
Devuelve TRUE si la letra esta en la palabra y todavia no se ingreso*/
function validacionLetraIngresada(letra){
    var letraCorrecta = false;
    var letraRepetida = false
    letraCorrecta = abecedario.includes(letra);
    letraRepetida = letrasEncontradas.includes(letra);
    if(letraCorrecta && !letraRepetida){
        return true;
        
    }else{
        return false;
                
    }

}

/*Valida que la letra errada ya no este en el array de errores */
function validacionLetraError(letraError){
    var error = false;
    error = letrasErradas.includes(letraError)
    return error;
   
}
    
/*Valida que la palabra ingresada no tenga caracteres especiales */
function validarPalabraNueva(palabra){

    for(i=0;i<palabra.length;i++){
        if (!letraAbecedario(palabra[i])){
            return false;
        }
    }
    return true;
}

/*Valida que la letra este en el abecedario */
function letraAbecedario(letra){
    return abecedario.includes(letra);
}

/*Valida que la palabra ingresada no este en la lista de palabras */
function validarPalabraRepetida(palabra){
    return listaPalabras.includes(palabra);
    
}