<html>
 <head>
  <title>Дмитрий Сомов</title>
  <meta charset="utf-8">
 </head>
 <body> 
    <input type="number" value="2" id="n1">x +
    <input type="number" value="3" id="n2">y =
    <input type="number" value="18" id="n3"><br>
    <input type="number" value="4" id="n4">x +
    <input type="number" value="-5" id="n5">y =
    <input type="number" value="-8" id="n6"><br>
    <button id="bt" onclick="
                             
                             /* извлечение данных */  
      const n1 = Number(document.querySelector('#n1').value);
      const n2 = Number(document.querySelector('#n2').value); 
      const n3 = Number(document.querySelector('#n3').value);
      const n4 = Number(document.querySelector('#n4').value);
      const n5 = Number(document.querySelector('#n5').value);
      const n6 = Number(document.querySelector('#n6').value);
       
      
      /* вычисления  */                       
      const B3 = n1 * n5 - n2 * n4;          
      const E1 = n3 * n5 - n2 * n6;          
      const E2 = n1 * n6 - n4 * n3;
      const result1 = E1 / B3;
      const result2 = E2 / B3;
                             
                             
      /* запись результата */ 
      document.querySelector('#result1').value = result1;    
      document.querySelector('#result2').value = result2;                                                          
    ">Вычислить</button><br>
    x=<input type="number" value="" id="result1"><br>
    y=<input type="number" value="" id="result2">
   
  
 
 
</body></html>
