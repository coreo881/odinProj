const inputElements = document.querySelectorAll(
    ".formSection__inputAreaInner input"
);
const submitBtn = document.querySelector("button[type='submit']");
const form = document.querySelector(".formSection__form");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const passGroup = document.querySelector(".formSection__formGroup.pass");

submitBtn.addEventListener("click", () => {
    inputElements.forEach((element) => {
        if (!element.checkValidity()) {
            element.classList.add("error");
        } else if (
            (element.checkValidity() && element.classList.contains("error")) ||
            (element.checkValidity() && element.classList.contains("passError"))
        ) {
            element.classList.remove("error");
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let p = password.value;
    let c = confirmPass.value;

    if (p === c) {
        console.log("valid");
        form.submit();
    } else {
        password.classList.add("error");
        confirmPass.classList.add("error");
        passGroup.classList.add("passError");
    }
});
