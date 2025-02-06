import Product from './products.js';
import ShopCart from './shopCart.js';

const signUpButton = document.querySelector('#add_prod_button');
const delButton = document.querySelector('#del_cart_prod');
const renderCart = document.querySelector('#render_cart_button');

const shop_cart = new ShopCart();

signUpButton.addEventListener('click', function (event) {
    event.preventDefault();

    const prod = new Product("HotDog", 30, "/cart-container/banana.jpg");
    shop_cart.addProductInfoToCart(prod);

});

delButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Holiiiiii")
    shop_cart.deleteCart();
});

renderCart.addEventListener('click', function (event) {
    event.preventDefault();
})





