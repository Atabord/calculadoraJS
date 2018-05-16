var pantalla = document.getElementById("display");
var lastNum = "0";
var decimal = false;
var positivo = true;
var primerNumero;

var Calculadora = (function(){
    var resultado = 0;
    var operacion = "";

    function down(){
      this.style.transform="scale(0.9)";
      if (this.id =="mas" || this.id == "menos" || this.id == "por" || this.id == "dividido" || this.id == "raiz"){
        procesarOperacion(this.id)
      } else if (this.id == "on") {
        prender(this.id)
      } else if (this.id == "sign") {
        cambiarSigno()
      }else if (this.id == "igual") {
        igual();
      } else {
        procesarNumero(this.id)
      }
    }

    function up(){
      this.style.transform="scale(1.0)";
    }

    function procesarOperacion(tecla){
      primerNumero = Number(lastNum);
      if(tecla == "raiz"){
        lastNum = Math.sqrt(primerNumero).toString();
        mostrarNumero();
      } else {
        operacion = tecla;
        lastNum = ""
        mostrarNumero();
      }
    }

    function prender(tecla){
      lastNum = "0";
      operacion = "";
      decimal = false;
      positivo = true;
      mostrarNumero()
    }

    function procesarNumero(tecla){
      if(tecla == "punto"){
        if (decimal == true) {
          lastNum = lastNum;
        }else {
          lastNum = lastNum + ".";
          decimal = true;
        }
      } else if (lastNum == "0") {
        lastNum = tecla;
      } else {
        lastNum = lastNum + tecla;
      }
      mostrarNumero();
    }

    function cambiarSigno(){
      if (positivo == true && lastNum != "0"){
        lastNum = "-" + lastNum;
        positivo = false;
      } else if(lastNum == "0"){
        lastNum = lastNum;
      } else{
        lastNum = lastNum.slice(1);
        positivo = true;
      }
      mostrarNumero();
    }

    function mostrarNumero (){

      if (lastNum.length > 8){
      display.innerHTML = lastNum.slice(0, 8);
      } else {
        display.innerHTML = lastNum;
      }
    }

    function sumar(a, b){
      return a + b;
    }

    function restar(a, b){
      return a - b;
    }

    function multiplicar(a, b){
      return a * b;
    }

    function dividir(a, b){
      return a/b;
    }

    function igual(){
      switch(operacion) {
        case "mas":
          lastNum = sumar(primerNumero, Number(lastNum)).toString();
          mostrarNumero();
          break;
        case "menos":
          lastNum = restar(primerNumero, Number(lastNum)).toString();
          mostrarNumero();
          break;
        case "por":
          lastNum = multiplicar(primerNumero, Number(lastNum)).toString();
          mostrarNumero();
          break;
        case "dividido":
          lastNum = dividir(primerNumero, Number(lastNum)).toString();
          mostrarNumero();
          break;
        default:
          alert("Ocurrio un error, favor reiniciar la pagina");
        }
    }

    return {
      init: function(){
        var teclas = document.getElementsByClassName('tecla')
        for (var i = 0; i < teclas.length; i++){
            teclas[i].addEventListener("mousedown", down)
            teclas[i].addEventListener("mouseup", up)
        }

      }
    }
  })

Calculadora().init();
