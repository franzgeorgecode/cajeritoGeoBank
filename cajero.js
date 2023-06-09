







var sonidos  =
{
  tecla: document.getElementById("tecla_id"),
  alerta: document.getElementById("alerta_id"),
  entrega: document.getElementById("entrega_id"),
}



var imagenes = [];
imagenes ["100000"] = "billete100.jpg";
imagenes ["50000"] = "billete50.png";
imagenes ["20000"] = "billete20.png";
imagenes ["10000"] = "billete10.png";
imagenes ["5000"] = "billete5.png";
imagenes ["2000"] = "billete2.png";
imagenes ["1000"] = "billete1.png";

class Billete
{
  constructor(v,c)
  {
    this.imagen = new Image();
    this.valor = v;
    this.cantidad = c;

    this.imagen.src = imagenes[this.valor];
  }
}






var caja = [];
var entregado = [];
caja.push ( new Billete (100000,100 ));
caja.push ( new Billete (50000,100 ));
caja.push ( new Billete (20000,100 ));
caja.push ( new Billete (10000,100 ));
caja.push ( new Billete (5000,100 ));
caja.push ( new Billete (2000,100 ));
caja.push ( new Billete (1000,100 ));
contar();
document.addEventListener("keydown", sonido_tecla);
var boton_extraccion = document.getElementById("botonExtraccion");
boton_extraccion.addEventListener("click", insertarDinero);


var dinero= 0;
var div = 0;
var papeles = 0;
var dinero_disponible = caja;
var entregado = [];
var carga = document.getElementById("carga_id");
var pantalla = document.getElementById("pantalla_texto");
var boton_extraccion = document.getElementById("botonExtraccion");
var factura = document.getElementById("recibo");






function contar()
{
	total = 0
	for (var tot of caja)
	{
		total = total + tot.valor * tot.cantidad;
	}
	console.log(total);
}


//DECLARACION DE FUNCIONES
function sonido_tecla()
{
  sonidos.tecla.play();
}


function contador() //dinero total de  la caja
{
  for(v of caja)
  {
    dinero_disponible = dinero_disponible + (v.valor * v.cantidad);
  }
}







function insertarDinero()
{
  entregado.splice(0, entregado.length); //Reseteo el array entregado
  dinero = parseInt(pantalla.value);
  compatibilidad();
}



function compatibilidad() //solo tomará multiplos positivos de 10 y distintos de 0
{
  if (dinero > dinero_disponible) // SI NO HAY SUFICIENTE DINERO
  {
    sonidos.alerta.play();
    resultado.innerHTML = "Monto no Disponible!";
  } else
  {
    if (dinero % 10 == 0 && dinero > 0)
    {
      entregarDinero();
      contar();
     
    } else if (dinero == 0)
    {
      sonidos.alerta.play();
      resultado.innerHTML = "Para que Usa el cajero?";
    } else if (dinero < 0)
    {
      sonidos.alerta.play();
      resultado.innerHTML = "Monto negativo, Incorrecto";
    }
  }
}

function entregarDinero()
{
  for(v of caja)
  {
    if (dinero > 0)
    {
      div = parseInt(dinero / v.valor) //NUMERO DE BILLETES NECESARIOS

      if (div > v.cantidad) //CUANDO NO ALCANZAN LOS BILLETES MAS GRANDES
      {
        papeles = v.cantidad;
        dinero_disponible = dinero_disponible - (v.valor * v.cantidad);
        dinero = dinero - (v.valor * v.cantidad);
        entregado.push(new Billete(v.valor, papeles));
        v.cantidad = 0//SE AGOTAN LOS BILLETES AL TERMINAR
        check();
      } else //CUANDO SI ALCANZAN LOS BILLETES MAS GRANDES
      {
        papeles = div;
        dinero_disponible = dinero_disponible - (v.valor * div);
        dinero = dinero - (v.valor * div);
        entregado.push(new Billete(v.valor, papeles));
        v.cantidad = v.cantidad - div;
        check();
      }
    }
  }
}

function check() //VERIFICA SI LA SUMA ES VÁLIDA RESPECTO A LOS BILLETES DISPONIBLES
{
  if (dinero == 0)//ENTREGA EL DINERO
  {
    sonidos.entrega.play();
    carga.innerHTML += "<br /> Su Dinero: <br />";
recibo.innerHTML += "<br /> Su Recibo: <br />";

 recibo.innerHTML += "<img src=https://raw.githubusercontent.com/fgmuller/CajeritoGeoBank/master/recibocabeza.png>" ;


       recibo.innerHTML += "<br /> Dinero Disponible: $" + total + "<br />" ;


         var r =document.getElementById("pantalla_texto");
       retiro = parseInt(r.value);

       recibo.innerHTML += "<br /> Monto Retirado: $" + retiro + "<br />";
     recibo.innerHTML += "<br /> Nuevo Saldo: $" + (total-retiro) + "<br />";
recibo.innerHTML += "<img src=https://raw.githubusercontent.com/fgmuller/CajeritoGeoBank/master/recibopie.png>" ;

    for(e of entregado)
    {
      resultado.innerHTML = "Retire su dinero abajo ↓";
      for (var i = 0; i < e.cantidad; i++)
      {
        carga.innerHTML += "<img src=" + e.imagen.src + " />";

      }


    }
  } else
  {
    sonidos.alerta.play();
    resultado.innerHTML = "Suma No Disponible";
  }
}


function reset() {

  location.reload(true);
 }




