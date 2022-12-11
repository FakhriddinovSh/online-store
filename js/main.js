const elList = document.querySelector(".list");
const elListRazdel = document.querySelector(".list-razdel");
const elTemplate = document.querySelector(".template").content;
const fragment = new DocumentFragment();
const headerLogin = document.querySelector(".site-header__login")
const loginModal = document.querySelector(".login")
const loginToken = window.localStorage.getItem("login-token");
const loginClose = loginModal.querySelector(".login-close")
const orederCart = document.querySelector(".order-cart")
headerLogin.addEventListener("click", (evt)=>{
    evt.preventDefault()
    loginModal.classList.add("login--active")
})

loginClose.addEventListener("click", ()=>{
    loginModal.classList.remove("login--active")
})

    fetch("http://localhost:5000/product",{
    headers: {
        "Content-Type": "application/json",
        Authorization: loginToken
    }
})
.then(res => res.json())
.then(data => {
    data.forEach(item =>{
        console.log(item);
        const clonedTemplate = elTemplate.cloneNode(true);
        clonedTemplate.querySelector(".flower-image").src = `http://localhost:5000/${item.product_img}`;
        clonedTemplate.querySelector(".flower-name").textContent = item.product_name;
        clonedTemplate.querySelector(".flower-price").textContent = `${item.product_price}`;
        clonedTemplate.querySelector(".flower-desc").textContent = item.product_desc;
        clonedTemplate.querySelector(".flower-order").dataset.id = item.id;
        
        fragment.appendChild(clonedTemplate)
    }); 
    elList.appendChild(fragment)
})











function orderShop(id){
    fetch(`http://localhost:5000/order/${id}`, {
    method: "POST",
    headers: {
        Authorization: loginToken
    },
    body: {
        id: id,
        product_id: id,
        user_id: id
    }
}).then(data => console.log(data))
}
let num = 0

elList.addEventListener("click", (evt)=>{
    evt.preventDefault();
    if (evt.target.matches(".flower-order")) {
        const id = evt.target.dataset.id;
        num++
        orederCart.textContent = num
    }
})









// elList.addEventListener("click", function(evt){
//     let btnId = Number(evt.target.dataset.id);
//     orderMy(btnId)
//     console.log(btnId);
// })



// function orderMy(idd) {
//     try {
//         fetch("http://localhost:5000/order", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: loginToken
//         },
//         body: JSON.stringify({
//             product_id: idd,
//         })
//     })
// } catch (error) {
//     console.log(error);
// }
// }

























































// elList.addEventListener("click", function (evt) {
//     if (evt.target.matches(".flower-order")) {
//         const id = evt.target.dataset.id;
//         postOrder(id);
//         console.log(id);
//     }
// });

// async function postOrder(id) {
//     const formData = new FormData();
//     formData.append("product_id", Number(id));
    
//     try {
//         const response = await fetch("http://localhost:5000/order", {
//         method: "POST",
//         headers: {
//             Authorization: loginToken,
//         }, 
        
//         body: formData,
//     });
    
//     const data = await response.json();
//     console.log(data);
// } catch (error) {
//     console.log(error.message);
// }
// }