const elForm = document.querySelector(".form");
const elNameInput = document.querySelector(".user-name")
const elPasswordInput = document.querySelector(".user-password")


const loginToken = window.localStorage.getItem("login-token");

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    const nameInputValue = elNameInput.value;
    const passwordInputValue = elPasswordInput.value;
    
        fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },       
        body: JSON.stringify(
            {
                email: nameInputValue,
                password: passwordInputValue
            }
            ),
        })
        .then(res => res.json())
        .then(data => {
            if(data.token){
                window.localStorage.setItem("login-token", data.token)
                window.location.pathname = "index.html"
            }else{
                alert("USER NOT FOUND")
            }
        })  
})



