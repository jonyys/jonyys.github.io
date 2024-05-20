document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("hamburger-checkbox");
    const dropdown = document.querySelector(".dropdown");

    checkbox.addEventListener("change", function () {
        if (!(checkbox.checked)) {
            dropdown.querySelector(".dropdown-content").style.display = "none";
        } else {
            dropdown.querySelector(".dropdown-content").style.display = "block";
        }
    });
});
