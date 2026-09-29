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

  var coll = document.getElementsByClassName("collapsible");
var i;
var chimney = document.getElementById('chimney-repeating'); // Can be null

var checkCollapcible = function() {
    for (var j = coll.length - 1; j >= 0;  j--) {
        if (coll[j].classList.contains('active')) {
            console.log(j, coll[j].classList);
            var c2 = coll[j].nextElementSibling;
            console.log(c2);
            
            // 1. Added null check for c2
            if (c2) {
                c2.style.maxHeight = null;
                c2.style.maxHeight = c2.scrollHeight + "px";
                
                // 2. Added null check for chimney
                if (chimney) {
                    chimney.style.height = (c2.scrollHeight) + 2048  + "px";
                }
            }
        }
    }
};

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        
        // 3. Added null check for content
        if (content) {
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                
                // 4. Added null check for chimney
                if (chimney) {
                    chimney.style.height = (content.scrollHeight) + 2048 + "px";
                }
            }
        }
        window.setTimeout(checkCollapcible, 200);
    });
}

function setBackgroundHeight() {
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.offsetHeight);
    
    // 5. Added null check for chimney
    const chimneyElement = document.getElementById('chimney-repeating');
    if (chimneyElement) {
        chimneyElement.style.height = documentHeight + 'px';
    }
}

window.onresize = setBackgroundHeight;
window.onload = setBackgroundHeight;

document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', setBackgroundHeight);
});

if (window.performance) {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
        if (navigationEntries[0].type === 'reload') {
            console.log("Page was reloaded specifically!");
            setBackgroundHeight();
        } else {
            setBackgroundHeight();
            console.log("Page was not a specific reload, type:", navigationEntries[0].type);
        }
    }
}
}
    
        // const button = document.getElementById("button");
        // button.addEventListener("click", ToggleParagraph);
        // function ToggleParagraph() 
        // {
        // var paragraph = document.getElementById("Paragraph");
        // // Toggle the 'hidden' class on the paragraph element
        // paragraph.classList.toggle("hidden"); 
        // // setBackgroundHeight();
        // }     
     document.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById('launch-btn');
    const stepInit = document.getElementById('step-init');
    const stepLoading = document.getElementById('step-loading');
    
    const enterBtn = document.getElementById('enter-btn');
    const preloader = document.getElementById('preloader');
    const bgMusic = document.getElementById('bg-music');
    const statusText = document.getElementById('status-text');
    const progressBar = document.getElementById('progress-bar');

    // Array of text phases to give it an authentic dial-up/network connection feel
    const phrases = [
        "Initializing modem...",
        "Dialing network gateway...",
        "Verifying username and password...",
        "Exchanging security certificates...",
        "Establishing data link protocol...",
        "Connected to JAGCAC network!"
    ];

    function runMockLoadingBar() {
        let progress = 0;
        let phraseIndex = 0;

        // Progress bar ticker loop
        const interval = setInterval(() => {
            // Speed up or slow down randomly to make it feel organic
            progress += Math.floor(Math.random() * 8) + 4; 

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Connection complete UI updates
                if (statusText) statusText.innerText = phrases[phrases.length - 1];
                if (progressBar && progressBar.parentElement) {
                    progressBar.parentElement.style.display = 'none'; // Hide empty container
                }
                if (enterBtn) enterBtn.style.display = 'inline-block'; // Reveal final action button
            } else {
                if (progressBar) progressBar.style.width = `${progress}%`;
                
                // Cycle through text phrases relative to the progress percentage
                let currentPhase = Math.floor((progress / 100) * (phrases.length - 1));
                if (currentPhase > phraseIndex && currentPhase < phrases.length - 1) {
                    phraseIndex = currentPhase;
                    if (statusText) statusText.innerText = phrases[phraseIndex];
                }
            }
        }, 250);
    }

    // --- STEP 1: Boot Button Click Handler ---
    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            // Unlocks audio element context safely
            if (bgMusic) {
                bgMusic.play().catch(err => console.warn("Audio element blocked:", err));
            }

            // Swap visibility layouts from Start button to Connection Bar
            stepInit.style.display = 'none';
            stepLoading.style.display = 'block';

            // Kick off the visual progression bar safely
            runMockLoadingBar();

            // Quietly register service worker caching in backend shell
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
            }
        });
    }

    // --- STEP 2: Final Site Redirection ---
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            if (bgMusic) {
                bgMusic.pause();
                bgMusic.currentTime = 0; // Reset dial-up tracker
            }
            
            // Redirect straight to your custom dashboard layout routing page
            window.location.href = '/home';
        });
    }
});





// 1. Move the initialization logic into a dedicated boot function
function initCustomVideoPlayer() {
  const audio = document.getElementById('background-music');
  const video = document.getElementById('my-video');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const progressBar = document.getElementById('progress-bar');
  const timeDisplay = document.getElementById('time-display');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  
  // PNG Icon Element Trackers
  const playIcon = document.getElementById('play-icon');
  const volumeIcon = document.getElementById('volume-icon');
   const videoBorder = document.getElementById('video-border');
  
if (!video || !playPauseBtn) {
  console.warn('player init: elements missing', { video, playPauseBtn });
  return false;
}

  // Paths to your PNG assets
  const icons = {
    play: '/icons/play.png',
    pause: '/icons/pause.png',
    volumeUp: '/icons/volume-up.png',
    volumeMute: '/icons/volume-mute.png'
  };

  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    video.muted = !video.muted;
    if (volumeIcon) volumeIcon.src = video.muted ? icons.volumeMute : icons.volumeUp;
    if (volumeSlider) volumeSlider.value = video.muted ? 0 : video.volume;
  }
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    // We are now in fullscreen mode
    videoBorder.style.display = "none";
  } else {
    // We have exited fullscreen mode (via button or Esc key)
    videoBorder.style.display = "block"; // or "flex", "inline-block", etc.
  }
});
 function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen().catch(err => console.error(err));
  }
}

  // Click Actions
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });
  
  video.addEventListener('click', togglePlay);
  
  video.addEventListener('play', () => {
    if (playIcon) playIcon.src = icons.pause;
    if (audio) audio.pause();
  });
  
  video.addEventListener('pause', () => {
    if (playIcon) playIcon.src = icons.play;
    if (audio) audio.play();
  });

  // Timeline Progress
  video.addEventListener('timeupdate', () => {
    if (!isNaN(video.duration)) {
      const percentage = (video.currentTime / video.duration) * 100;
      if (progressBar) progressBar.value = percentage;
      
      const minCur = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
      const secCur = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
      const minDur = Math.floor(video.duration / 60).toString().padStart(2, '0');
      const secDur = Math.floor(video.duration % 60).toString().padStart(2, '0');
      
      if (timeDisplay) timeDisplay.textContent = `${minCur}:${secCur}/${minDur}:${secDur}`;
    }
  });

  if (progressBar) {
    progressBar.addEventListener('input', () => {
      video.currentTime = (progressBar.value / 100) * video.duration;
    });
  }

  // Volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      video.volume = volumeSlider.value;
      video.muted = video.volume === 0;
      if (volumeIcon) {
        volumeIcon.src = video.muted ? icons.volumeMute : icons.volumeUp;
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMute();
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreen();
    });
  }

  // KEYBOARD CONTROLS SYSTEM
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'text') {
      return;
    }
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'KeyM':
        toggleMute();
        break;
      case 'KeyF':
        toggleFullscreen();
        break;
      case 'ArrowRight':
        e.preventDefault();
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 5);
        break;
    }
  });

  return true;
}
function whenReady() {
  if (initCustomVideoPlayer()) return;      // elements already there
  const obs = new MutationObserver(() => {
    if (initCustomVideoPlayer()) obs.disconnect();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', whenReady);
} else {
  whenReady();
}

