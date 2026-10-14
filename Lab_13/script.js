const sliderElement = document.querySelector(".reviews-swiper");
const autoplayButton = document.querySelector("#autoplay-toggle");
const sliderStatus = document.querySelector("#slider-status");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (typeof Swiper === "undefined") {
  sliderElement.classList.add("slider-fallback");
  sliderStatus.textContent =
    "Слайдер не завантажився. Перевір підключення до інтернету.";
} else {
  const reviewsSwiper = new Swiper(sliderElement, {
    watchSlidesProgress: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    speed: reducedMotion ? 0 : 500,

    navigation: {
      nextEl: sliderElement.querySelector(".swiper-button-next"),
      prevEl: sliderElement.querySelector(".swiper-button-prev"),
    },

    pagination: {
      el: sliderElement.querySelector(".swiper-pagination"),
      clickable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    autoplay: reducedMotion
      ? false
      : {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },

    a11y: {
      prevSlideMessage: "Попередній відгук",
      nextSlideMessage: "Наступний відгук",
      paginationBulletMessage: "Перейти до слайда {{index}}",
      slideLabelMessage: "Слайд {{index}} із {{slidesLength}}",
    },
  });

  if (!reducedMotion) {
    autoplayButton.hidden = false;

    autoplayButton.addEventListener("click", () => {
      if (reviewsSwiper.autoplay.running) {
        reviewsSwiper.autoplay.stop();
        autoplayButton.textContent = "Увімкнути автопрокрутку";
      } else {
        reviewsSwiper.autoplay.start();
        autoplayButton.textContent = "Призупинити автопрокрутку";
      }
    });
  }
}

(() => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");
  const mobileScreen = window.matchMedia("(max-width: 768px)");

  const menuLinks = [...mobileMenu.querySelectorAll("a")];

  function setMenuState(isOpen, restoreFocus = true) {
    hamburger.classList.toggle("active", isOpen);
    mobileMenu.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Закрити меню" : "Відкрити меню",
    );

    // Закрите меню недоступне для клавіатури.
    mobileMenu.inert = !isOpen;

    if (isOpen) {
      menuLinks[0].focus();
    } else if (restoreFocus) {
      hamburger.focus();
    }
  }

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.contains("active");
    setMenuState(!isOpen);
  });

  // Закриття кліком поза меню.
  overlay.addEventListener("click", () => {
    setMenuState(false);
  });

  // Закриття після вибору розділу.
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!hamburger.classList.contains("active")) return;

    if (event.key === "Escape") {
      setMenuState(false);
    }

    // Утримуємо клавіатурний фокус у відкритому меню
    // та на кнопці його закриття.
    if (event.key === "Tab") {
      const focusable = [hamburger, ...menuLinks];
      const index = focusable.indexOf(document.activeElement);

      const nextIndex = event.shiftKey
        ? index <= 0
          ? focusable.length - 1
          : index - 1
        : (index + 1) % focusable.length;

      event.preventDefault();
      focusable[nextIndex].focus();
    }
  });

  // При переході до широкого екрана закриваємо меню.
  mobileScreen.addEventListener("change", (event) => {
    if (!event.matches) {
      const wasOpen = hamburger.classList.contains("active");
      setMenuState(false, false);

      if (wasOpen) {
        document.querySelector(".desktop-menu a").focus();
      }
    }
  });
})();
