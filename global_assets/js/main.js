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


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash-button')) {
        console.log("¡Botón clickeado!", event.target);
        shop_cart.deleteCartProduct(event.target);
        shopContainer.updateCartCount();
        shop_cart.renderTotal();
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



