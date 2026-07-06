const horizontalRoot = document.querySelector(".horizontal-scroll");
const horizontalTrack = document.querySelector(".horizontal-track");

if (horizontalRoot && horizontalTrack) {
  const progress = document.createElement("div");
  const progressBar = document.createElement("span");
  progress.className = "horizontal-progress";
  progress.appendChild(progressBar);
  document.body.appendChild(progress);

  function updateHorizontalScroll() {
    if (window.matchMedia("(max-width: 820px)").matches) {
      horizontalTrack.style.transform = "";
      progressBar.style.width = "0%";
      return;
    }

    const rect = horizontalRoot.getBoundingClientRect();
    const maxScroll = horizontalRoot.offsetHeight - window.innerHeight;
    const scrollAmount = Math.min(Math.max(-rect.top, 0), maxScroll);
    const maxTranslate = horizontalTrack.scrollWidth - window.innerWidth;
    const progressValue = maxScroll > 0 ? scrollAmount / maxScroll : 0;

    horizontalTrack.style.transform = `translateX(${-maxTranslate * progressValue}px)`;
    progressBar.style.width = `${progressValue * 100}%`;
  }

  window.addEventListener("scroll", updateHorizontalScroll, { passive: true });
  window.addEventListener("resize", updateHorizontalScroll);
  updateHorizontalScroll();
}
