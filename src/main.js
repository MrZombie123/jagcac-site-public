// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// var coll = document.getElementById("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }


function SetPizza()
{
  const rotateObj = document.getElementById('pizzadisc');
  const rotateArrowLeft = document.getElementById('rotatearrowleft');
  const rotateArrowRight = document.getElementById('rotatearrowright');

  let currentRotation = 0;
  let targetRotation = 0;
  let t = 0;

  rotateArrowLeft.addEventListener('click',() =>{
      
    targetRotation-=60;
      // targetRotation=((targetRotation%360)+360)%360;
  })
  rotateArrowRight.addEventListener('click',() =>{
      

      targetRotation+=60;
      // targetRotation=((targetRotation%360)+360)%360;

  })


 const Update= function (time) {
  
    const deltaTime = time -t;

    t=time;

    RotatePizzaUpdate(deltaTime);

    
    requestAnimationFrame(Update);
  }
 function RotatePizzaUpdate(deltaTime){
      const easing = 0.01;
      currentRotation +=(targetRotation-currentRotation)*easing *deltaTime;
      rotateObj.style.transform = 'rotate(' + currentRotation + 'deg)';
  
 }


  requestAnimationFrame(Update);
// setInterval(roateAnim,20);
}
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}



