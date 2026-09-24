/* =========================================
   EVERFIT — INTERACTION ENGINE
========================================= */

let soundEnabled = true;


/* -----------------------------------------
   MOBILE MENU
----------------------------------------- */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn){

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    if(mobileMenu.classList.contains("open")){
      menuBtn.textContent = "×";
    }else{
      menuBtn.textContent = "☰";
    }

    playClick();

  });

}


/* -----------------------------------------
   SOUND ENGINE
----------------------------------------- */

let audioContext;

function initAudio(){

  if(!audioContext){
    audioContext =
      new (window.AudioContext || window.webkitAudioContext)();
  }

}

function playClick(){

  if(!soundEnabled) return;

  try{

    initAudio();

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      620,
      audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      260,
      audioContext.currentTime + .07
    );

    gain.gain.setValueAtTime(
      .045,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      .001,
      audioContext.currentTime + .09
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + .1
    );

  }catch(e){}

}


/* -----------------------------------------
   SOUND TOGGLE
----------------------------------------- */

const soundToggle =
  document.getElementById("soundToggle");

if(soundToggle){

  soundToggle.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    soundToggle.innerHTML =
      soundEnabled ? "◉" : "○";

    if(soundEnabled){
      playClick();
    }

  });

}


/* -----------------------------------------
   BUTTON CLICK SFX
----------------------------------------- */

document.querySelectorAll(
  "a, .program-card, .presence-card, .contact-action"
).forEach(element => {

  element.addEventListener("click", () => {
    playClick();
  });

});


/* -----------------------------------------
   SCROLL REVEAL
----------------------------------------- */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold:.12
    }
  );


document.querySelectorAll(".reveal").forEach(el => {

  observer.observe(el);

});


/* -----------------------------------------
   CURSOR GLOW
----------------------------------------- */

const cursorGlow =
  document.querySelector(".cursor-glow");

if(cursorGlow){

  window.addEventListener("pointermove", event => {

    cursorGlow.style.left =
      event.clientX + "px";

    cursorGlow.style.top =
      event.clientY + "px";

  });

}


/* -----------------------------------------
   MAGNETIC BUTTONS
----------------------------------------- */

document.querySelectorAll(".magnetic").forEach(button => {

  button.addEventListener("mousemove", event => {

    const rect =
      button.getBoundingClientRect();

    const x =
      event.clientX - rect.left - rect.width / 2;

    const y =
      event.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * .12}px, ${y * .12}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform = "";

  });

});


/* -----------------------------------------
   3D CARD TILT
----------------------------------------- */

const supportsHover =
  window.matchMedia("(hover:hover)").matches;

if(supportsHover){

  document.querySelectorAll(".tilt-card").forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - .5) * 10;

      const rotateX =
        ((y / rect.height) - .5) * -10;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0)";

    });

  });

}


/* -----------------------------------------
   HERO PARALLAX
----------------------------------------- */

const heroVisual =
  document.querySelector(".hero-visual");

if(heroVisual && supportsHover){

  window.addEventListener("mousemove", event => {

    const x =
      (event.clientX / window.innerWidth - .5);

    const y =
      (event.clientY / window.innerHeight - .5);

    heroVisual.style.transform =
      `translate(${x * 12}px, ${y * 12}px)`;

  });

}


/* -----------------------------------------
   SMOOTH PAGE TRANSITION
----------------------------------------- */

document.querySelectorAll(
  "a[href$='.html']"
).forEach(link => {

  link.addEventListener("click", event => {

    const href =
      link.getAttribute("href");

    if(
      !href ||
      href.startsWith("#") ||
      link.target === "_blank"
    ){
      return;
    }

    event.preventDefault();

    document.body.style.opacity = "0";

    setTimeout(() => {

      window.location.href = href;

    },220);

  });

});


/* -----------------------------------------
   PAGE LOAD
----------------------------------------- */

window.addEventListener("load", () => {

  document.body.style.transition =
    "opacity .45s ease";

  document.body.style.opacity = "1";

});


/* -----------------------------------------
   ACTIVE NAVIGATION
----------------------------------------- */

const currentPage =
  window.location.pathname.split("/").pop() ||
  "index.html";

document.querySelectorAll(".desktop-nav a")
.forEach(link => {

  if(
    link.getAttribute("href") === currentPage
  ){

    link.classList.add("active");

  }

});
