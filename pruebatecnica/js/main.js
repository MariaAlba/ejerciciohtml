// comentario de linea
/* 
    comentario 
    de 
    bloque
*/
/**
 * esto es un comentario de bloque 
 * para documentar
 * tipo javadoc de java
 * pero para javascript
 */
/* var  a = 2;
console.debug("la variable es "+a);
console.trace("esto es trace de un log");
console.info("esto es info"); */
//console.warn("Warning");
//console.error("Error");
//console.log("tipo log")




function buscarVoluntario(){
    
    var nombre = document.getElementById('nombre').innerHTML;
    
    var tds = document.querySelectorAll('td');
    
    var alumnos = [];
    for (const key of tds) {
      alumnos.push(key.innerText);
      console.log(key.innerText);
    }
   
    var numAleatorio = Math.floor(Math.random() * alumnos.length); 
    
    console.log(numAleatorio);
    document.getElementById('nombre').innerHTML =(alumnos[numAleatorio]);
   /* console.log(alumnos);
    console.log(nombre); */

    //JSON se usa en servicios web pq pesa menos que html
    var jAlumnos = [
        {   "nombre":"pepe",
            "github": "http://github.com/ipartek",
            "edad" : 35,
            "aprobado" : false,  
        },
        {
            "nombre":"pepa",
            "github": "http://github.com/ipartek",
            "edad" : 35,
            "aprobado" : false,
        },
    ];
}