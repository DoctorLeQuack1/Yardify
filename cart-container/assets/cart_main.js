import Product from './products.js';
import ShopCart from './shopCart.js';

const signUpButton = document.querySelector('#add_prod_button');
const delButton = document.querySelector('#del_cart_prod');
const renderCart = document.querySelector('#render_cart_button');

const shop_cart = new ShopCart();

signUpButton.addEventListener('click', function (event) {
    event.preventDefault();

    const prod = new Product("HotDog", 30, "../../banana.jpg");
    const prod2 = new Product("Banana", 8, "../../banana.jpg");
    const prod3 = new Product("Apple", 2000, "../../banana.jpg");
    shop_cart.addProductInfoToCart(prod);
    shop_cart.addProductInfoToCart(prod2);
    shop_cart.addProductInfoToCart(prod3);
});

delButton.addEventListener('click', function (event) {
    event.preventDefault();

    shop_cart.deleteCart();
});

renderCart.addEventListener('click', function (event) {
    event.preventDefault();
})





