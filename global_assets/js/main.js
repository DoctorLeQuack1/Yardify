import Product from "../../cart-container/assets/products.js"
import ShopCart from "../../cart-container/assets/shopCart.js"


class ShopContainer {
    constructor() {
        this.products = [
            {
                id: 0,
                name: "Case",
                price: 45.99,
                image: "./shoping-container/images/maletin.png"
            },
            {
                id: 1,
                name: "Typing Machine",
                price: 19.99,
                image: "./shoping-container/images/maquinadeescribir.png"
            },
            {
                id: 2,
                name: "Clock",
                price: 89.99,
                image: "./shoping-container/images/reloj.png"
            },
            {
                id: 3,
                name: "Radio",
                price: 59.99,
                image: "./shoping-container/images/radio.png"
            },
            {
                id: 4,
                name: "Vintage Telephone",
                price: 129.99,
                image: "./shoping-container/images/telefono.png"
            }
        ];

        
    }

    renderProduct(product) {
        
        console.log("Renderizando productos..."); // DEBUG

        const prod_grid = document.createElement('div');
        prod_grid.classList.add('col-md-4', 'col-sm-6');

        const prod_card = document.createElement('div');
        prod_card.classList.add('product-card');
        prod_grid.appendChild(prod_card);

        const add_button = document.createElement('div');
        add_button.classList.add('add-to-cart');
        add_button.setAttribute("data-id", product.id);
        prod_card.appendChild(add_button);
        add_button.textContent = '+';

        const prod_image = document.createElement('img');
        prod_image.classList.add('product-image');
        prod_image.src = product.image;
        prod_image.alt = product.name
        prod_card.appendChild(prod_image);

        const prod_desc = document.createElement('div');
        prod_desc.classList.add('mt-3');
        prod_card.appendChild(prod_desc);

        const prod_header = document.createElement('h5');
        prod_header.textContent = product.name;
        prod_desc.appendChild(prod_header);

        const prod_text = document.createElement('p');
        prod_text.classList.add('mb-0');
        prod_text.textContent = "$" + product.price;
        prod_desc.appendChild(prod_text);


        document.querySelector('#products-container').appendChild(prod_grid);
    }

    renderAllProduct() {

        this.products.forEach(product =>{
            this.renderProduct(product);
        })

    }

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            alert(`¡${product.name} agregado al carrito!`);
        }
    }

    // Actualizar contador del carrito
    updateCartCount() {
        const storedCart = JSON.parse(localStorage.getItem('shop_cart')) || {};
        document.getElementById('cart-count').textContent = Object.keys(storedCart).length
    }

}


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

var animation = lottie.loadAnimation({
    container: document.getElementById("lottie-container"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "../emptyCart.json"
  });

