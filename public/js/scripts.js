const burgerMenu = document.querySelector("#burger-menu")

burgerMenu.addEventListener("click", () => {
    if(burgerMenu.classList.contains("burger-menu-open")) {
        burgerMenu.classList.remove("burger-menu-open")
    } else {
        burgerMenu.classList.add("burger-menu-open");
    };
});