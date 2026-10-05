/* main.js - classic script (no import/export). Put it at public/main.js and load it with:
   <script src="/main.js"></script>
   Everything page-specific is null-checked, so the same file is safe on every page. */

/* ------------------------------------------------------------------ */
/* 1. HTML includes (w3-include-html)                                  */
/* ------------------------------------------------------------------ */

// Calls are queued, so a second includeHTML() call (e.g. an old inline one)
// waits for the first to finish instead of returning early.
let includeQueue = Promise.resolve();

function includeHTML() {
  includeQueue = includeQueue.then(runIncludes);
  return includeQueue;
}

async function runIncludes() {
  let els;
  let rounds = 0;
  // loop so includes nested inside included files also get loaded
  while ((els = document.querySelectorAll('[w3-include-html]')).length && rounds++ < 5) {
    await Promise.all([...els].map(async (el) => {
      const file = el.getAttribute('w3-include-html');
      el.removeAttribute('w3-include-html');
      try {
        const res = await fetch(file);
        const text = await res.text();
        // Partials are fragments. A full document means the server sent its
        // fallback page (Vite/Netlify) because the file wasn't found.
        if (!res.ok || /<!doctype|<html[\s>]/i.test(text)) {
          console.warn('Include failed:', file, res.status);
          el.textContent = 'Include failed: ' + file;
        } else {
          el.innerHTML = text;
        }
      } catch (err) {
        console.warn('Include failed:', file, err);
        el.textContent = 'Include failed: ' + file;
      }
    }));
  }
}

/* ------------------------------------------------------------------ */
/* 2. Collapsibles + background height                                 */
/* ------------------------------------------------------------------ */

let collapsiblesReady = false;

function refreshOpenCollapsibles() {
  const chimney = document.getElementById('chimney-repeating'); // can be null
  document.querySelectorAll('.collapsible.active').forEach((btn) => {
    const content = btn.nextElementSibling;
    if (!content) return;
    content.style.maxHeight = null;
    content.style.maxHeight = content.scrollHeight + 'px';
    if (chimney) chimney.style.height = content.scrollHeight + 2048 + 'px';
  });
}

function setupCollapsibles() {
  if (collapsiblesReady) return;
  collapsiblesReady = true;

  // One delegated listener, so it also works for collapsibles that were included.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.collapsible');
    if (!btn) return;

    btn.classList.toggle('active');
    const content = btn.nextElementSibling;
    if (content) {
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        const chimney = document.getElementById('chimney-repeating');
        if (chimney) chimney.style.height = content.scrollHeight + 2048 + 'px';
      }
    }
    window.setTimeout(refreshOpenCollapsibles, 200);
  });
}

function setBackgroundHeight() {
  const chimney = document.getElementById('chimney-repeating');
  if (!chimney) return;
  const body = document.body;
  const html = document.documentElement;
  const documentHeight = Math.max(
    body.scrollHeight, body.offsetHeight, html.clientHeight, html.offsetHeight
  );
  chimney.style.height = documentHeight + 'px';
}

window.addEventListener('resize', setBackgroundHeight);
window.addEventListener('load', setBackgroundHeight);
document.addEventListener('toggle', setBackgroundHeight, true); // <details> toggles, including included ones

/* ------------------------------------------------------------------ */
/* 3. Pizza spinner                                                    */
/* ------------------------------------------------------------------ */

let pizzaStarted = false;

function SetPizza() {
  const rotateObj = document.getElementById('pizzadisc');
  const rotateArrowLeft = document.getElementById('rotatearrowleft');
  const rotateArrowRight = document.getElementById('rotatearrowright');
  if (pizzaStarted || !rotateObj || !rotateArrowLeft || !rotateArrowRight) return;
  pizzaStarted = true;

  let currentRotation = 0;
  let targetRotation = 0;
  let t = 0;

  rotateArrowLeft.addEventListener('click', () => { targetRotation -= 60; });
  rotateArrowRight.addEventListener('click', () => { targetRotation += 60; });

  function update(time) {
    const deltaTime = Math.min(time - t, 50); // clamp so a background tab doesn't overshoot
    t = time;

    const easing = 0.01;
    currentRotation += (targetRotation - currentRotation) * easing * deltaTime;
    rotateObj.style.transform = 'rotate(' + currentRotation + 'deg)';

    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ------------------------------------------------------------------ */
/* 4. Loading screen (index.html)                                      */
/* ------------------------------------------------------------------ */

function initLoadingScreen() {
  const launchBtn = document.getElementById('launch-btn');
  if (!launchBtn) return; // not the loading page

  const stepInit = document.getElementById('step-init');
  const stepLoading = document.getElementById('step-loading');
  const enterBtn = document.getElementById('enter-btn');
  const bgMusic = document.getElementById('bg-music');
  const statusText = document.getElementById('status-text');
  const progressBar = document.getElementById('progress-bar');

  const phrases = [
    'Initializing modem...',
    'Dialing network gateway...',
    'Verifying username and password...',
    'Exchanging security certificates...',
    'Establishing data link protocol...',
    'Connected to JAGCAC network!'
  ];

  function runMockLoadingBar() {
    let progress = 0;
    let phraseIndex = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (statusText) statusText.innerText = phrases[phrases.length - 1];
        if (progressBar && progressBar.parentElement) {
          progressBar.parentElement.style.display = 'none';
        }
        if (enterBtn) enterBtn.style.display = 'inline-block';
      } else {
        if (progressBar) progressBar.style.width = progress + '%';
        const currentPhase = Math.floor((progress / 100) * (phrases.length - 1));
        if (currentPhase > phraseIndex && currentPhase < phrases.length - 1) {
          phraseIndex = currentPhase;
          if (statusText) statusText.innerText = phrases[phraseIndex];
        }
      }
    }, 250);
  }

  launchBtn.addEventListener('click', () => {
    if (bgMusic) bgMusic.play().catch((err) => console.warn('Audio blocked:', err));

    if (stepInit) stepInit.style.display = 'none';
    if (stepLoading) stepLoading.style.display = 'block';
    runMockLoadingBar();

    // Service worker only in production: on localhost it fights Vite's dev server.
    if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    }
  });

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        // Don't set bgMusic.src = '' here: an empty src makes the browser request
        // an empty URL, which is what produced "Failed to load ''".
      }
      // home.html.html works in Vite dev, in the build, and on Netlify.
      window.location.href = '/home.html';
    });
  }
}

/* ------------------------------------------------------------------ */
/* 5. Custom video player (video.html)                                 */
/* ------------------------------------------------------------------ */

function initCustomVideoPlayer() {
  const video = document.getElementById('my-video');
  if (!video) return false;                 // no player on this page
  if (video.dataset.playerReady) return true; // already set up, don't stack listeners

  const audio = document.getElementById('background-music');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const progressBar = document.getElementById('progress-bar');
  const timeDisplay = document.getElementById('time-display');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const playIcon = document.getElementById('play-icon');
  const volumeIcon = document.getElementById('volume-icon');
  const videoBorder = document.getElementById('video-border');

  if (!playPauseBtn) {
    console.warn('player init: video found but #play-pause-btn is missing from video.html');
    return false;
  }
  video.dataset.playerReady = '1';

  const icons = {
    play: '/icons/play.png',
    pause: '/icons/pause.png',
    volumeUp: '/icons/volume-up.png',
    volumeMute: '/icons/volume-mute.png'
  };

  const pad = (n) => Math.floor(n).toString().padStart(2, '0');

  function togglePlay() {
    if (video.paused) {
      video.play().catch((err) => console.warn('Video play blocked:', err));
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    video.muted = !video.muted;
    if (volumeIcon) volumeIcon.src = video.muted ? icons.volumeMute : icons.volumeUp;
    if (volumeSlider) volumeSlider.value = video.muted ? 0 : video.volume;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      (video.parentElement || video).requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (!videoBorder) return;
    videoBorder.style.display = document.fullscreenElement ? 'none' : 'block';
  });

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
    if (audio) audio.play().catch(() => {});
  });

  video.addEventListener('timeupdate', () => {
    if (isNaN(video.duration)) return;
    if (progressBar) progressBar.value = (video.currentTime / video.duration) * 100;
    if (timeDisplay) {
      timeDisplay.textContent =
        `${pad(video.currentTime / 60)}:${pad(video.currentTime % 60)}/` +
        `${pad(video.duration / 60)}:${pad(video.duration % 60)}`;
    }
  });

  if (progressBar) {
    progressBar.addEventListener('input', () => {
      video.currentTime = (progressBar.value / 100) * video.duration;
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      video.volume = volumeSlider.value;
      video.muted = video.volume === 0;
      if (volumeIcon) volumeIcon.src = video.muted ? icons.volumeMute : icons.volumeUp;
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMute(); });
  }
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleFullscreen(); });
  }

  document.addEventListener('keydown', (e) => {
    const el = document.activeElement;
    if (el && el.tagName === 'INPUT' && el.type === 'text') return;
    switch (e.code) {
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

/* ------------------------------------------------------------------ */
/* 6. Boot: one place, one order                                       */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  initLoadingScreen();      // only does anything on the loading page
  await includeHTML();      // wait for menu/footer/sidebar/video partials
  setupCollapsibles();
  SetPizza();
  initCustomVideoPlayer();  // the <video> exists now
  setBackgroundHeight();
});
