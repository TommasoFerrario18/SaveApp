const btnDropDown = document.getElementById("dropdownDividerButton");
const content = document.getElementById("content");

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

const loginDiv = document.getElementById("login-div");
const loginBtn = document.getElementById("login-btn");
const closeBtnLogin = document.getElementById("close-btn-login");

const signupDiv = document.getElementById("signup-div");
const signupBtn = document.getElementById("signup-btn");
const closeBtnSignup = document.getElementById("close-btn-signup");

loginBtn.addEventListener("click", () => {
  loginDiv.classList.toggle("hidden");
  content.classList.add(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
});

closeBtnLogin.addEventListener("click", () => {
  loginDiv.classList.toggle("hidden");
  content.classList.remove(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
});

signupBtn.addEventListener("click", () => {
  openSignup();
});

closeBtnSignup.addEventListener("click", () => {
  signupDiv.classList.toggle("hidden");
  content.classList.remove(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
});

document.getElementById("get-access-btn").addEventListener("click", () => {
  openSignup();
});

function openSignup() {
  signupDiv.classList.toggle("hidden");
  content.classList.add(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
}

const formLogin = document.getElementById("login-form");
const formSignup = document.getElementById("signup-form");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formLogin);

  if (!validateEmail(formData.get("email"))) {
    alert("Inserisci una email valida");
    return;
  }

  if (!validatePassword(formData.get("password"))) {
    alert(
      "La password deve contenere almeno 8 caratteri, di cui almeno una lettera e un numero"
    );
    return;
  }

  formLogin.submit();
});
formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formSignup);

  if (!validateEmail(formData.get("email"))) {
    alert("Inserisci una email valida");
    return false;
  }

  if (!validatePassword(formData.get("password"))) {
    alert(
      "La password deve contenere almeno 8 caratteri, di cui almeno una lettera e un numero"
    );
    return false;
  }

  if (formData.get("password") !== formData.get("confirmPassword")) {
    alert("Le password non coincidono");
    return false;
  }

  // form.submit();
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}
