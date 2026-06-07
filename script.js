/* ==========================================
   KING'S FOOD V2
========================================== */

/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const menu =
    document.querySelector(".mobile-menu");

    if(menu){
        menu.classList.toggle("active");
    }

}

/* Close menu when link clicked */

document.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        document
        .querySelector(".mobile-menu")
        ?.classList.remove("active");

    });

});

/* ================= CART SYSTEM ================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    renderCartOnOrder();

    updateDeliveryFee();

}

function addItem(name, price) {

    cart.push({
        name,
        price:Number(price)
    });

    saveCart();

    showToast(`${name} added to cart`);

}

function removeItem(index) {

    cart.splice(index,1);

    saveCart();

    showToast("Item removed");

}

function clearCart() {

    cart = [];

    saveCart();

    showToast("Cart cleared");

}

function cartTotalRaw() {

    return cart.reduce(
        (sum,item)=>
        sum + item.price,
        0
    );

}

/* ================= CART DISPLAY ================= */

function renderCart() {

    const list =
    document.getElementById("cartList");

    const total =
    document.getElementById("total");

    if(!list || !total) return;

    list.innerHTML = "";

    cart.forEach((item,index)=>{

        list.innerHTML += `
        <li>

            <span>
                ${item.name}
            </span>

            <button
            onclick="removeItem(${index})">

            ❌

            </button>

        </li>
        `;

    });

    total.innerText =
    cartTotalRaw().toFixed(2);

}

function renderCartOnOrder() {

    const list =
    document.getElementById("cartListOrder");

    const total =
    document.getElementById("totalOrder");

    if(!list) return;

    list.innerHTML = "";

    cart.forEach(item=>{

        list.innerHTML += `
        <li>
            ${item.name}
            <span>
            R${item.price.toFixed(2)}
            </span>
        </li>
        `;

    });

    if(total){

        total.innerText =
        cartTotalRaw().toFixed(2);

    }

}

/* ================= DELIVERY ================= */

function handleOrderType() {

    const type =
    document.getElementById("orderType");

    const area =
    document.getElementById("area");

    const address =
    document.getElementById("address");

    if(!type) return;

    if(type.value === "Delivery"){

        if(area)
        area.style.display = "block";

        if(address)
        address.style.display = "block";

    }
    else{

        if(area)
        area.style.display = "none";

        if(address)
        address.style.display = "none";

    }

}

function getDeliveryFee() {

    const orderType =
    document.getElementById("orderType");

    const area =
    document.getElementById("area");

    if(
        !orderType ||
        orderType.value !== "Delivery"
    ){
        return 0;
    }

    switch(area.value){

        case "Katlehong":
            return 15;

        case "Eden Park":
            return 10;

        case "Thokoza":
            return 15;

        case "Other":
            return 50;

        default:
            return 0;

    }

}

function updateDeliveryFee() {

    const delivery =
    document.getElementById("deliveryFee");

    const grand =
    document.getElementById("grandTotal");

    const total =
    cartTotalRaw();

    const fee =
    getDeliveryFee();

    const grandTotal =
    total + fee;

    if(delivery)
    delivery.innerText =
    fee.toFixed(2);

    if(grand)
    grand.innerText =
    grandTotal.toFixed(2);

}

/* ================= ORDER ================= */

function sendOrder() {

    if(cart.length === 0){

        alert(
        "Please add food to your cart."
        );

        return;

    }

    const name =
    document.getElementById("name");

    const phone =
    document.getElementById("phone");

    const type =
    document.getElementById("orderType");

    const area =
    document.getElementById("area");

    const address =
    document.getElementById("address");

    const notes =
    document.getElementById("notes");

    if(
        !name.value.trim() ||
        !phone.value.trim()
    ){

        alert(
        "Please complete your details."
        );

        return;

    }

    let msg =
`👑 KING'S FOOD ORDER

Name: ${name.value}
Phone: ${phone.value}

Order Type: ${type.value}
`;

    if(type.value === "Delivery"){

        msg +=
`Area: ${area.value}
Address: ${address.value}
`;

    }

    msg += `
------------------

ORDER ITEMS

`;

    cart.forEach(item=>{

        msg +=
`• ${item.name}
R${item.price.toFixed(2)}

`;

    });

    const fee =
    getDeliveryFee();

    const total =
    cartTotalRaw();

    const grand =
    total + fee;

    msg += `
------------------

Items Total:
R${total.toFixed(2)}

Delivery Fee:
R${fee.toFixed(2)}

Grand Total:
R${grand.toFixed(2)}

`;

    if(notes){

        msg += `
Notes:
${notes.value}
`;

    }

    const whatsappNumber =
    "27790154354";

    window.open(

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,

"_blank"

    );

}

/* ================= SEARCH ================= */

function searchMenu() {

    const input =
    document
    .getElementById("menuSearch")
    .value
    .toLowerCase();

    const cards =
    document.querySelectorAll(".food-card");

    cards.forEach(card=>{

        const text =
        card.innerText.toLowerCase();

        if(text.includes(input)){

            card.style.display =
            "block";

        }
        else{

            card.style.display =
            "none";

        }

    });

}

/* ================= FILTER ================= */

function filterMenu(category) {

    const cards =
    document.querySelectorAll(".food-card");

    const buttons =
    document.querySelectorAll(".filter-btn");

    buttons.forEach(btn=>{

        btn.classList.remove(
        "active-filter"
        );

    });

    event.target.classList.add(
    "active-filter"
    );

    cards.forEach(card=>{

        if(category === "all"){

            card.style.display =
            "block";

        }

        else if(
            card.classList.contains(category)
        ){

            card.style.display =
            "block";

        }

        else{

            card.style.display =
            "none";

        }

    });

}

/* ================= TOAST ================= */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "toast-message";

    toast.innerText =
    message;

    toast.style.position =
    "fixed";

    toast.style.bottom =
    "30px";

    toast.style.left =
    "50%";

    toast.style.transform =
    "translateX(-50%)";

    toast.style.background =
    "#d4af37";

    toast.style.color =
    "#000";

    toast.style.padding =
    "15px 25px";

    toast.style.borderRadius =
    "50px";

    toast.style.fontWeight =
    "700";

    toast.style.zIndex =
    "999999";

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.remove();

    },2000);

}

/* ================= SCROLL REVEAL ================= */

function revealOnScroll(){

    const reveals =
    document.querySelectorAll(
        ".reveal"
    );

    reveals.forEach(el=>{

        const windowHeight =
        window.innerHeight;

        const top =
        el.getBoundingClientRect()
        .top;

        if(top < windowHeight - 100){

            el.classList.add(
            "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

/* ================= INIT ================= */

document.addEventListener(
"DOMContentLoaded",
()=>{

    renderCart();

    renderCartOnOrder();

    handleOrderType();

    updateDeliveryFee();

    revealOnScroll();

});
