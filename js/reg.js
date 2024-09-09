"use strict";

let elRegisterForm = document.querySelector('.register-form');

elRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const NewData = {
        newUsername: e.target.username.value.trim(),
        newPassword: e.target.password.value.trim()
    };
    elRegisterForm.lastElementChild.innerHTML = `
        <img class="mx-auto scale-[1.3]" src = "../images/loading.png" alt="loading" width="25" >
        `;
    localStorage.setItem("isRegestred", JSON.stringify(NewData));
    setTimeout(() => location.href = "./index.html", 1000);
});
