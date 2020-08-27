const header = document.querySelector("header");
const headerHeight = header.clientHeight;

window.onscroll = function () {
    if (
        document.body.scrollTop > headerHeight ||
        document.documentElement.scrollTop > headerHeight
    ) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};
