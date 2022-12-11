const elForm = document.querySelector(".form");
const elProductName = document.querySelector(".product_name");
const elProductDescription = document.querySelector(".product_desc");
const elProductImage = document.querySelector(".product_img");
const elProductPrice = document.querySelector(".product_price");
const elList = document.querySelector(".list");
const elTemplate = document.querySelector(".template").content;
const fragment = new DocumentFragment();
const orderList = document.querySelector(".order-list");
const orderBtn = document.querySelector(".order-button");
const defaultBtn = document.querySelector(".default-button");
const loginToken = window.localStorage.getItem("login-token");
const headerLogin = document.querySelector(".site-header__login")
const loginModal = document.querySelector(".login")
const loginClose = loginModal.querySelector(".login-close")

headerLogin.addEventListener("click", (evt)=>{
    evt.preventDefault()
    loginModal.classList.add("login--active")
})

loginClose.addEventListener("click", ()=>{
    loginModal.classList.remove("login--active")
})

// const loginToken = window.localStorage.getItem("login-token")

function postItem(){
    const formDate = new FormData()
    
    formDate.append("product_name", elProductName.value.trim());
    formDate.append("product_desc", elProductDescription.value.trim());
    formDate.append("product_price", elProductPrice.value.trim());
    formDate.append("product_img", elProductImage.files[0]);
    
    fetch("http://localhost:5000/product/", {
    method: "POST",
    headers: {
        Authorization: loginToken
    },
    body: formDate
})
}

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    postItem()
    setInterval(() => {
        window.location.reload()
    }, 1000);
})


function renderProducts(){
    fetch("http://localhost:5000/product/",{
    headers: {
        "Content-Type": "application/json",
        Authorization: loginToken
    }
})
.then(res => res.json())
.then(data => {
    data.forEach(item =>{
        // console.log(item);
        const clonedTemplate = elTemplate.cloneNode(true);
        clonedTemplate.querySelector(".flower-image").src = `http://localhost:5000/${item.product_img}`;
        clonedTemplate.querySelector(".flower-name").textContent = item.product_name;
        clonedTemplate.querySelector(".flower-desc").textContent = item.product_desc;
        clonedTemplate.querySelector(".edit-btn").dataset.id = item.id;
        clonedTemplate.querySelector(".delete-btn").dataset.id = item.id;
        
        fragment.appendChild(clonedTemplate)
    }); 
    elList.appendChild(fragment)
})
} 
renderProducts()






function editShop(id){
    const formDate = new FormData()
    
    formDate.append("product_name", elProductName.value.trim());
    formDate.append("product_desc", elProductDescription.value.trim());
    formDate.append("product_price", elProductPrice.value.trim());
    formDate.append("product_img", elProductImage.files[0]);
    
    try {
        fetch("http://localhost:5000/product/" + id, {
        method:"PUT",
        headers:{
            Authorization: loginToken
        },
        body: formDate
    })
} catch (error) {
    console.log(error);
}
}

elList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".edit-btn")){
        console.log("found");
        const id =  evt.target.dataset.id;
        editShop(id)
    }
})


function deleteItem(id) {
    try {
        fetch("http://192.168.5.236:5000/product/" + id, {
        method: "DELETE",
        headers: {
            Authorization: loginToken
        }
    })
    .then(res => res.json())
    .then(data => console.log(data));
} catch (error) {
    console.log(error);
}
}
elList.addEventListener("click", (evt) => {
    if (evt.target.matches(".delete-btn")) {
        const id = evt.target.dataset.id;
        deleteItem(id)
        setInterval(() => {
            window.location.reload()
        }, 2000);
    }
})




// function orderGetting(){

//     fetch("http://localhost:5000/order",{
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: loginToken
//     }
// })
// .then(res => res.json())
// .then(data => {
//     console.log(data);
// })
// }

// orderGetting()





// function optionOrder(){
//     orderBtn.addEventListener("click", (evt) => {
//         evt.preventDefault();
        
//         orderList.classList.remove("d-none");
//         elList.innerHTML = "";
//         orderGetting()
//     })
    
//     defaultBtn.addEventListener("click", function(evt){
//         evt.preventDefault()
//         orderList.classList.add("d-none")
//         renderProducts()
//     })
// }

// optionOrder()






// function orderFn(){
//     fetch("http://192.168.5.236:5000/order/",{
//     headers:{
//         Authorization: loginToken   
//     }   
// })
// .then(res => res.json())
// .then(data => {
//     console.log(data);
//     data.forEach(item =>{
//         const clonedTemplate = elTemplate.cloneNode(true);
//         clonedTemplate.querySelector(".flower-image").src = `http://192.168.5.236:5000/${item.product_img}`;
//         clonedTemplate.querySelector(".flower-name").textContent = item.product_name;
//         clonedTemplate.querySelector(".flower-price").textContent = item.product_price;
//         clonedTemplate.querySelector(".edit-btn").dataset.id = item.id;
//         clonedTemplate.querySelector(".delete-btn").dataset.id = item.id;

//         fragment.appendChild(clonedTemplate)
//     })
//     elList.appendChild(fragment)
// }) 
// }

