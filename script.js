const filterButtons = document.querySelectorAll(".filter-pill");
const portfolioCards = document.querySelectorAll(".portfolio-card");

const setActive = (button) => {
  filterButtons.forEach((btn) => btn.classList.remove("is-active"));
  button.classList.add("is-active");
};

const applyFilter = (filter) => {
  portfolioCards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow = filter === "all" || category === filter;
    card.style.display = shouldShow ? "block" : "none";
  });
};

if (filterButtons.length > 0 && portfolioCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      setActive(button);
      applyFilter(filter);
    });
  });

  applyFilter("all");
}

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay;
        if (delay) {
          entry.target.style.transitionDelay = `${delay}ms`;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const galleryImages = document.querySelectorAll(".project-image img");

if (galleryImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img alt="" />
      <button class="lightbox-close" type="button" aria-label="Close image">×</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
  };

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || "Project image";
      lightbox.classList.add("is-open");
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === closeButton) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}
