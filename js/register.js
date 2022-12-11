const elForm = document.querySelector(".form");
const elNameInput = document.querySelector(".name-input");
const elPhoneInput = document.querySelector(".phone-input");
const elEmailInput = document.querySelector(".email-input");
const elPasswordInput = document.querySelector(".password-input");

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    const nameInputValue = elNameInput.value;
    const phoneInputValue = elPhoneInput.value;
    const emailInputValue = elEmailInput.value;
    const passwordInputValue = elPasswordInput.value;
    
    
    fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(
        {
            user_name: nameInputValue,
            phone: phoneInputValue,
            email: emailInputValue,
            password: passwordInputValue
        }
        ),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.token){
            window.localStorage.setItem("register-token", data.token)
            window.location.pathname = "index.html"
        }
    })
})

