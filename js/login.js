"use strict";

let elLogin = document.querySelector('.login-form');
let signInButton = document.querySelector('.sign-in-btn');
const isRegestred = JSON.parse(localStorage.getItem("isRegestred"));


elLogin.addEventListener("submit", (e) => {
    e.preventDefault();


    const data = {
        username: e.target.username.value.trim(),
        password: e.target.password.value.trim()
    };


    signInButton.innerHTML = `<img class="mx-auto scale-[1.3] " src="../images/loading.png" alt="loading" width="25">`;

    if (isRegestred) {
        if (data.username === isRegestred.newUsername && data.password === isRegestred.newPassword) {
            localStorage.setItem("loginData", JSON.stringify(data));
            setTimeout(() => {
                location.href = "./dashboard.html";
            }, 1000);
        } else if (data.username === "Golibov" && data.password === "Golibov6002") {
            localStorage.setItem("loginData", JSON.stringify(data));
            setTimeout(() => {
                location.href = "../../admin.html";
            }, 1000);
        } else {
            alert("Login yoki parol xato");
            signInButton.innerHTML = "SIGN IN";
        }
    } else {
        alert("Foydalanuvchi ro'yxatdan o'tmagan!");
        signInButton.innerHTML = "SIGN IN";
    }
});
