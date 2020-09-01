const burger = document.querySelector(".header__inner__burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    nav.classList.toggle("open");
});
