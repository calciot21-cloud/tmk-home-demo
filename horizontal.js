const horizontalRoot = document.querySelector(".horizontal-scroll");
const horizontalTrack = document.querySelector(".horizontal-track");

if (horizontalRoot && horizontalTrack) {
  const horizontalPanels = Array.from(horizontalTrack.querySelectorAll(".horizontal-panel"));
  const horizontalLinks = document.querySelectorAll('a[href^="#"]');
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

  horizontalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      if (!targetId) return;

      const target =
        targetId === "top"
          ? horizontalPanels[0]
          : document.getElementById(targetId);

      if (!target) return;
      event.preventDefault();

      if (window.matchMedia("(max-width: 820px)").matches) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const targetIndex = horizontalPanels.indexOf(target);
      if (targetIndex < 0) return;

      const maxScroll = horizontalRoot.offsetHeight - window.innerHeight;
      const maxIndex = Math.max(horizontalPanels.length - 1, 1);
      const targetTop = horizontalRoot.offsetTop + maxScroll * (targetIndex / maxIndex);

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  updateHorizontalScroll();
}
