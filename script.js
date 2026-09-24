/* =========================================
   EVERFIT — PREMIUM INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* PAGE LOADER */

  const loader = document.querySelector(".page-loader");

  if(loader){
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 500);
    });
  }


  /* MOBILE MENU */

  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if(menuBtn && navLinks){

    menuBtn.addEventListener("click", () => {

      menuBtn.classList.toggle("open");
      navLinks.classList.toggle("open");

      premiumClick();

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        menuBtn.classList.remove("open");
        navLinks.classList.remove("open");
      });

    });

  }


  /* REVEAL ON SCROLL */

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
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

  revealElements.forEach(el => observer.observe(el));


  /* FAQ */

  document.querySelectorAll(".faq-item button").forEach(button => {

    button.addEventListener("click", () => {

      const item = button.parentElement;
      const answer = item.querySelector(".faq-answer");

      document.querySelectorAll(".faq-item").forEach(other => {

        if(other !== item){

          other.classList.remove("open");

          const otherAnswer =
            other.querySelector(".faq-answer");

          if(otherAnswer){
            otherAnswer.style.maxHeight = null;
          }

        }

      });

      item.classList.toggle("open");

      if(item.classList.contains("open")){
        answer.style.maxHeight = answer.scrollHeight + "px";
      }else{
        answer.style.maxHeight = null;
      }

      premiumClick();

    });

  });


  /* PREMIUM SOUND */

  let soundEnabled = false;
  let audioContext = null;

  const soundToggle =
    document.querySelector(".sound-toggle");

  function createAudio(){

    if(!audioContext){

      audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    }

    if(audioContext.state === "suspended"){
      audioContext.resume();
    }

  }

  function premiumClick(){

    if(!soundEnabled) return;

    createAudio();

    const now =
      audioContext.currentTime;

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      520,
      now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      760,
      now + .055
    );

    gain.gain.setValueAtTime(
      0.0001,
      now
    );

    gain.gain.exponentialRampToValueAtTime(
      .045,
      now + .008
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + .12
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + .13);

  }


  function premiumDeepClick(){

    if(!soundEnabled) return;

    createAudio();

    const now =
      audioContext.currentTime;

    const osc =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    osc.type = "triangle";

    osc.frequency.setValueAtTime(
      180,
      now
    );

    osc.frequency.exponentialRampToValueAtTime(
      90,
      now + .18
    );

    gain.gain.setValueAtTime(
      .0001,
      now
    );

    gain.gain.exponentialRampToValueAtTime(
      .06,
      now + .015
    );

    gain.gain.exponentialRampToValueAtTime(
      .0001,
      now + .2
    );

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + .21);

  }


  if(soundToggle){

    soundToggle.addEventListener("click", () => {

      soundEnabled =
        !soundEnabled;

      soundToggle.classList.toggle(
        "active",
        soundEnabled
      );

      if(soundEnabled){

        createAudio();

        premiumClick();

      }

    });

  }


  /* CLICK SOUND FOR IMPORTANT ELEMENTS */

  document.querySelectorAll(
    ".btn, .nav-cta, .presence-card, .text-link"
  ).forEach(element => {

    element.addEventListener("click", () => {

      if(
        element.classList.contains("btn-light") ||
        element.classList.contains("btn-dark")
      ){

        premiumDeepClick();

      }else{

        premiumClick();

      }

    });

  });


  /* SUBTLE IMAGE PARALLAX */

  const heroImages =
    document.querySelectorAll(
      ".hero-image, .page-hero-bg, .final-bg"
    );

  window.addEventListener("scroll", () => {

    const scrollY =
      window.scrollY;

    heroImages.forEach(image => {

      if(scrollY < window.innerHeight){

        image.style.transform =
          `translateY(${scrollY * 0.12}px) scale(1.04)`;

      }

    });

  });


  /* IMAGE HOVER DEPTH */

  document.querySelectorAll(
    ".program-card, .photo-card"
  ).forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -2;

        const rotateY =
          ((x / rect.width) - .5) * 2;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* PAGE TRANSITIONS */

  document.querySelectorAll(
    'a[href$=".html"]'
  ).forEach(link => {

    link.addEventListener("click", event => {

      const url =
        link.getAttribute("href");

      if(
        !url ||
        url.startsWith("#") ||
        link.target === "_blank"
      ) return;

      event.preventDefault();

      document.body.style.opacity = "0";

      document.body.style.transition =
        "opacity .35s ease";

      setTimeout(() => {
        window.location.href = url;
      }, 350);

    });

  });


  /* RESTORE PAGE OPACITY */

  window.addEventListener("pageshow", () => {

    document.body.style.opacity = "1";

  });

});
