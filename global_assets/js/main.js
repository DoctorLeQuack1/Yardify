import ShopContainer from "../../shoping-container/js/shopContainer.js";
import Product from "../../cart-container/assets/products.js"
import ShopCart from "../../cart-container/assets/shopCart.js"


const shopContainer = new ShopContainer();
const shop_cart = new ShopCart();


shopContainer.renderAllProduct();
shopContainer.updateCartCount();
shop_cart.renderTotal();

const add_buttons = document.querySelectorAll(".add-to-cart");
const empty_button = document.querySelector('#del_cart_prod');
const cart_container = document.getElementById('cart-container');
const shop_div_container = document.getElementById('shoping-container');

const anchors_ = document.querySelectorAll("a");
console.log(anchors_);


document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('trash-button')) {
        console.log("¡Botón clickeado!", event.target);
        shop_cart.deleteCartProduct(event.target);
        shopContainer.updateCartCount();
        shop_cart.renderTotal();
    }

    if (event.target.classList.contains('btn-close')) {
        cart_container.style.display = "none";
        shop_div_container.style.display = "block";
    }

    if (event.target.id == 'cart-button') {
        cart_container.style.display = "block";
        shop_div_container.style.display = "none";
    }
});

add_buttons.forEach(element => {
    element.addEventListener('click', function (event){
        event.preventDefault();
        const productId = event.target.getAttribute("data-id");
        const item = shopContainer.products[productId];
        const product = new Product(item.name, item.price, item.image);
        shop_cart.addProductInfoToCart(product);
        shopContainer.updateCartCount();
        shop_cart.renderTotal();
    })
    
});

empty_button.addEventListener('click', function (event){
    event.preventDefault();
    shop_cart.deleteCart();
    shopContainer.updateCartCount();
    shop_cart.renderTotal();
});

anchors_.forEach(element => {
    element.addEventListener('click', function (event){
        event.preventDefault();
        console.log(event.target);
        if (event.target.id == "facebook") {
            console.log("facebook clicked")
            window.open("https://web.facebook.com/profile.php?id=100092685300877&mibextid=wwXIfr&rdid=xrn44ObMsvcwCPxq&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F15fXprKg3R%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#", "_blank");
            
        }
        if (event.target.id == "twiter") {
            console.log("twiter clicked")
            window.open("https://x.com/Yardify1", "_blank");
            
        }
        if (event.target.id == "instagram") {
            console.log("instagram clicked")
            window.open("https://www.instagram.com/yardify2025/?hl=es", "_blank");
            
        }
    })
    
});

