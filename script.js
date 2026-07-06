const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const slides = document.querySelectorAll(".strength-slide");
const dots = document.querySelectorAll("[data-slide-index]");
const arrows = document.querySelectorAll("[data-slide-direction]");
let currentSlide = 0;
let slideTimer;
const slideInterval = 7200;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

function startAutoSlide() {
  window.clearInterval(slideTimer);
  if (window.matchMedia("(max-width: 520px)").matches) return;
  slideTimer = window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, slideInterval);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slideIndex));
    startAutoSlide();
  });
});

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showSlide(currentSlide + Number(arrow.dataset.slideDirection));
    startAutoSlide();
  });
});

const strengthSlider = document.querySelector(".strength-slider");

if (strengthSlider) {
  strengthSlider.addEventListener("mouseenter", () => window.clearInterval(slideTimer));
  strengthSlider.addEventListener("mouseleave", startAutoSlide);
  strengthSlider.addEventListener("focusin", () => window.clearInterval(slideTimer));
  strengthSlider.addEventListener("focusout", startAutoSlide);

  const sliderObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        strengthSlider.classList.add("is-playing");
        showSlide(0);
        startAutoSlide();
      } else {
        strengthSlider.classList.remove("is-playing");
        window.clearInterval(slideTimer);
      }
    },
    { threshold: 0.35 }
  );

  sliderObserver.observe(strengthSlider);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    window.clearInterval(slideTimer);
  } else {
    if (strengthSlider?.classList.contains("is-playing")) startAutoSlide();
  }
});
