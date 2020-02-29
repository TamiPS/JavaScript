const MILI = 86400000;
  //días hábiles son las fechas que no caen en uno de los siguientes días: fines de semana, 
  //1 enero, 6 enero, 1 mayo ,15 agosto, 12 octubre, 1 noviembre, 6 diciembre, 8 diciembre y 25 diciembre

var festivos = ["01-01","01-06","05-01","08-15","10-12","11-01","12-06","12-08","12-25"];

/* Función que suma o resta un número de dias naturales según el valor de operation 
   startdate: objeto Fecha 
   days: número de días naturales
   return el resultado como un string en formato dd/mm/YYYY
*/
function calcDate(startdate, days) {
  var fechaMS = startdate.getTime(); //Pasa la fecha a milisegundos
  var daysMS = days * MILI; //Pasa los días a milisegundos

  var fechaFin = new Date(fechaMS+daysMS); //Asigna a fechaFin la suma en ms  de la fecha inicio y lo días

  var fecha_text = fechaFin.toISOString().substring(0, 10); //pasa la fecha a ISO y recorta los campos que contienen año, mes y día
  
  return  fecha_text;
}

/* Función que recibe dos fechas de tipo Date y devuelva el el número de días naturales que hay entre
  las dos fechas.
  startdate: objeto Fecha inicio
  endDate: objeto Fecha inicio
  return número de días naturales entre las dos fechas
*/
function getDays(startdate, endDate) {
  var fechaInMS = startdate.getTime(); //Pasa fecha inicio a ms
  var fechaFiMS = endDate.getTime(); //Pasa fecha fin a ms

  return (fechaFiMS-fechaInMS)/MILI; //Devuelve los días entre ambas fechas
}

/* Función que suma o resta un número de dias hábiles según el valor de operation 
   startdate: objeto Fecha 
   days: número de días hábiles
   return el resultado como un string en formato dd/mm/YYYY
*/
function calcWorkingDate(startdate, days) {

  var entra = false;
  if(days<0){ //Si los días son menor a 0 los pasa a positivo y activa entra
    days = days * -1;
    entra = true;
  }
  var i = 0;

  while(i<days){ //Por cada día recorre las fechas, i aumenta o decrementa según festivos y findes

    if(entra){
      startdate = new Date(startdate.getTime()-MILI); //Si los días eran negativos se restan días
    }else{
      startdate = new Date(startdate.getTime()+MILI); //Si no, se suman
    }

    if(startdate.getDay() != 6 && startdate.getDay()!=0){ //Si no es domingo ni sábado entra en el for del array de los festivos
      for(var indice in festivos){
        if(startdate.toISOString().substring(5, 10) == festivos[indice]){
          i--; //Si es festivo resta un día
        }
      }
      i++; //Si no es finde suma un día
    }
  }

  var fecha_text = startdate.toISOString().substring(0, 10);
  return  fecha_text;
}

/* Función que recibe dos fechas de tipo Date y devuelva el el número de días hábiles que hay entre
  las dos fechas.
  startdate: objeto Fecha inicio
  endDate: objeto Fecha inicio
  return número de días hábiles entre las dos fechas*/

function getWorkingDays(startdate, endDate) {

  var diasNaturales = getDays(startdate,endDate); //Llama a la función getDays que devuelve los días naturales entre ambas fechas y lo asigna a días naturales
  
  var FechaIn;
  var entra = false;
  var diasHabiles;

  if(diasNaturales<0){ //Si los días entre ambas fechas dan negativo se intercambian para que startdate sea inferior a enddate
    FechaIn =  new Date(endDate);
    diasNaturales = diasNaturales * -1; //Se pasa a positivo
    entra = true; //Se activa entra

  }else{
    FechaIn =  new Date(startdate);
  }

  var restaDias = 0;

  for (i=0;i<diasNaturales;i++){ //Da tantas vueltas como días naturales haya

    if(FechaIn.getDay()==6 || FechaIn.getDay()==0){ //Si es finde se suma un día a la resta (se resta un día más).
      restaDias++;
    }
    else{
      for(var indice in festivos){ //Si no es finde pero es festivo se compara con el array para restar los festivos.
        if(FechaIn.toISOString().substring(5, 10) == festivos[indice]){
          restaDias++;
        }
      }
    }
    FechaIn = new Date(FechaIn.getTime()+MILI);//Se va aumentando la fecha inicio en un día por cada día natural que recorre entre las dos fechas.
  }

  if(entra){ //Si están inversas la fecha inicio y fecha fin, se convierte el nùmero en negativo.
    diasHabiles = diasNaturales - restaDias; //Se restan los días sin festivos ni findes a los días naturales.
    diasHabiles = -1*diasHabiles;
  }
  else{//No estan inversas.
    diasHabiles = diasNaturales - restaDias; //Se restan los días sin festivos ni findes a los días naturales.
  }

  return diasHabiles;
}
