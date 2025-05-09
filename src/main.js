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
const rotateObj = document.querySelector('.rotateobj');
const rotateArrowLeft = document.querySelector('rotatearrowleft');
const rotateArrowRight = document.querySelector('rotatearrowright');

let currentRotation = 0;

rotateArrowLeft.addEventListener('click',() =>{
    
  roateAnim(rotateObj,-60);
})
rotateArrowRight.addEventListener('click',() =>{
    
  roateAnim(rotateObj,60);
})
// function rotateAnim(rot,whichWay){
//   var from = currentRotation
//   var to = 60*whichWay;
//   inter
// }

 
 const roateAnim= function (elem,diseredRotation) {
  
  // currentRotation;
  // diseredRotation += currentRotation;
    currentRotation += 5;
  
    // if (currentRotation == diseredRotation) {
    //  return;
    // } else {
     
    rotateObj.style.transform = 'rotate(' + rot + 'deg)';
  
      // elem.style.left = rot;
    // }
  }

setInterval(roateAnim,20);