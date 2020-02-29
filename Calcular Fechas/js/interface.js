
document.getElementById("Calcular1").addEventListener("click",function(e){
    var fi1 = document.getElementById("fi1").value; 
    var dn1 = document.getElementById("dn1").value;
    document.getElementById("fi1").value = calcDate(new Date(fi1), dn1);
  });
  
  document.getElementById("Calcular2").addEventListener("click",function(e){
    var fi2 = document.getElementById("fi2").value; 
    var ff2 = document.getElementById("ff2").value;  
    document.getElementById("dn2").value = getDays(new Date(fi2), new Date(ff2)); 
  });
  
  document.getElementById("Calcular3").addEventListener("click",function(e){
    var fi3 = document.getElementById("fi3").value; 
    var dh3 = document.getElementById("dh3").value;  
    document.getElementById("fi3").value = calcWorkingDate(new Date(fi3), dh3); 
  });
  
  document.getElementById("Calcular4").addEventListener("click",function(e){
    var fi4 = document.getElementById("fi4").value; 
    var ff4 = document.getElementById("ff4").value;  
    document.getElementById("dh4").value = getWorkingDays(new Date(fi4), new Date(ff4)); 
  });
  
  function getDate() {
    var today = new Date();
    today = today.toISOString().substring(0, 10);
    document.getElementById("fi1").value = today;
    document.getElementById("fi2").value = today;
    document.getElementById("ff2").value = today;
    document.getElementById("fi3").value = today;
    document.getElementById("fi4").value = today;
    document.getElementById("ff4").value = today;
}

window.onload = function() {
    getDate();
};
