const switchToggle = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector("#toggle-icon");
const nav = document.querySelector("#nav");
const image1 = document.getElementById("1");
const image2 = document.getElementById("2");
const image3 = document.getElementById("3");

function switchMode(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    imageSwitchMode("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    imageSwitchMode("light");
  }
}

function darkMode() {
  toggleIcon.children[0].textContent = "โหมดกลางคืน";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  nav.style.backgroundColor = "rgb(0 0 0 /50%)";
}

function lightMode() {
  toggleIcon.children[0].textContent = "โหมดกลางวัน";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  nav.style.backgroundColor = "rgb(255 255 255 /50%)";
}

function imageSwitchMode(mode) {
  image1.src = `img/projection_${mode}.svg`;
  image2.src = `img/freelancer_${mode}.svg`;
  image3.src = `img/game_${mode}.svg`;
}

switchToggle.addEventListener("change", switchMode);
