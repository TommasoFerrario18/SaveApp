const btnDropDown = document.getElementById("dropdownDividerButton");

btnDropDown.addEventListener("click", () => {
  const dropdownDivider = document.getElementById("dropdownDivider");
  dropdownDivider.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselInner = carousel.querySelector(".carousel-inner");
  const carouselItems = carousel.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  const intervalTime = 5000; // Cambia slide ogni 5 secondi

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  }

  // Funzione per cambiare slide automaticamente
  function autoSlide() {
    nextSlide();
  }

  // Avvia l'autoplay
  setInterval(autoSlide, intervalTime);
});
