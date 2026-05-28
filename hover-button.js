const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};






/* LANGUAGE SECTION */


const LANG_CONFIG = {
    en: {
        name: "English",
        flag: "https://cahayabangsa.org/newsletter/imgnews/flag_us.ico"
    },
    id: {
        name: "Indonesian",
        flag: "https://cahayabangsa.org/newsletter/imgnews/flag_id.ico"
    }
};

let langToggle, langMenu, currentFlag, currentLang, langOptions;

function detectLanguage() {
    const path = window.location.pathname;
    return Object.keys(LANG_CONFIG).find(l => path.includes(`/${l}/`)) || "en";
}

function updateDisplay(lang) {
    const cfg = LANG_CONFIG[lang];
    if (!cfg) return;

    currentFlag.src = cfg.flag;
    currentFlag.alt = cfg.name;
    currentLang.textContent = cfg.name;

    langOptions.forEach(opt =>
        opt.classList.toggle("active", opt.dataset.lang === lang)
    );
}

function initFlags() {
    langOptions.forEach(opt => {
        const lang = opt.dataset.lang;
        const img = opt.querySelector(".flag-icon");
        if (LANG_CONFIG[lang] && img) {
            img.src = LANG_CONFIG[lang].flag;
            img.alt = LANG_CONFIG[lang].name;
        }
    });
}

function init() {
    langToggle = document.getElementById("langToggle");
    langMenu = document.getElementById("langMenu");
    currentFlag = document.getElementById("currentFlag");
    currentLang = document.getElementById("currentLang");
    langOptions = document.querySelectorAll(".lang-option");

    if (!langToggle || !langMenu || !currentFlag || !currentLang || !langOptions.length) {
        console.error("Language selector: required elements not found");
        return;
    }

    initFlags();
    updateDisplay(detectLanguage());

    langToggle.addEventListener("click", e => {
        e.stopPropagation();
        langMenu.parentElement.classList.toggle("open");
    });

    langOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            langMenu.parentElement.classList.remove("open");
        });
    });

    document.addEventListener("click", () => {
        langMenu.parentElement.classList.remove("open");
    });
}

document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
