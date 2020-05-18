function disableAllNavBarItem() {
    const navBarItems = document.querySelectorAll(".nav-bar-item");
    navBarItems.forEach(nbi => {
        nbi.classList.remove("active");
    })
}

function disableAllMainContentItem() {
    const navBarItems = document.querySelectorAll(".mc-it");
    navBarItems.forEach(nbi => {
        nbi.classList.remove("active");
    })
}

function enableNavBarItem(e) {
    disableAllNavBarItem();
    e.classList.add("active");
    disableAllMainContentItem();
    document.querySelector("." + e.id).classList.add("active");
}