class Product {

    constructor(name, price, img_) {
        this.name = name
        this.price = price
        this.img = img_
    }
}


class ShopCart {
    constructor() {
        // Intenta obtener el carrito de compras desde el localStorage, o usa un objeto vacío si no existe.
        const storedCart = JSON.parse(localStorage.getItem('shop_cart')) || {};
        this.products = storedCart;

        this.renderCart();

    }

    addProductInfoToCart(item_) {

        if (!(item_.name in this.products)) {
            // Agrega el producto al carrito
            this.products[item_.name] = item_;
            // Convierte el objeto de productos a una cadena JSON antes de almacenarlo
            localStorage.setItem('shop_cart', JSON.stringify(this.products));
            this.addElementToCart(item_)
        }
    }

    addElementToCart(value) {

        // Creamos nuestro elemento row
        const prod_card = document.createElement('div');
        prod_card.classList.add('row', 'border-bottom', 'data-product');

        // Creamos un total de tres elementos col

        // Primer Col
        const img_div = document.createElement('div');
        img_div.classList.add('col-auto', 'p-0');

        const img_ = document.createElement('img');
        img_.src = value.img;
        img_.height = '150';
        img_.width = '150';

        img_div.appendChild(img_);

        //Segunda Col
        const item_desc_div = document.createElement('div');
        item_desc_div.classList.add('col', 'div_span');

        const item_name = document.createElement("span");
        item_name.classList.add('span_item_name');
        item_name.textContent = value.name
        item_name.style.display = "block";

        const item_price = document.createElement("span");
        item_price.textContent = "$" + value.price
        item_price.style.display = "block";

        item_desc_div.append(item_name, item_price)

        // Tercera Col
        const trash_button_div = document.createElement('div');
        trash_button_div.classList.add('col-auto');

        const trash_button = document.createElement("button");
        trash_button.type = 'button';
        trash_button.classList.add('trash-button');
        trash_button.setAttribute("data-id", value.name);
        trash_button.classList.add('btn');
        trash_button.textContent = '\u{1F5D1}';
        trash_button_div.appendChild(trash_button);

        //Add all elements to car section
        prod_card.append(img_div, item_desc_div, trash_button_div);

        document.querySelector('#cart-section').append(prod_card);
        document.querySelector('#empty-cart-section').style.display = 'none'; // Oculta la sección vacía
        document.querySelector('#cart-section').style.display = 'block'; // Muestra la sección del carrito
        document.querySelector('#empty_cart').disabled = false;

    }

    renderCart() {
        if (Object.keys(this.products).length > 0) { // Verifica si hay productos en el carrito
            Object.values(this.products).forEach(value => {
                this.addElementToCart(value); // Llama a la función para agregar el producto al carrito
            });
            document.querySelector('#empty-cart-section').style.display = 'none'; // Oculta la sección vacía
            document.querySelector('#cart-section').style.display = 'block'; // Muestra la sección del carrito
        } else {
            document.querySelector('#empty-cart-section').style.display = 'flex'; // Muestra la sección vacía
            document.querySelector('#cart-section').style.display = 'none'; // Oculta la sección del carrito
            document.querySelector('#empty_cart').disabled = true;

        }
    }

    deleteCartProduct(button_clicked) {

        const storedCart = JSON.parse(localStorage.getItem('shop_cart')) || {};
        this.products = storedCart;

        const deletedItem = button_clicked.getAttribute("data-id");
        console.log(deletedItem);

        delete this.products[deletedItem];

        // Subir al padre adecuado antes de buscar `.data-product`
        const productElement = button_clicked.closest('.col-auto')?.closest('.data-product');

        if (!productElement) {
            console.error("No element found on DOM.");
            return; // Evita llamar a .remove() en null
        }

        productElement.remove(); // Eliminar del carrito
        localStorage.setItem('shop_cart', JSON.stringify(this.products));

        if (Object.keys(this.products).length <= 0) {
            this.renderCart();
        }
    }

    deleteCart() {
        this.products = {};
        localStorage.clear();
        document.querySelectorAll('[class*="data-product"]').forEach(elemento => elemento.remove());
        this.renderCart();
    }

    renderTotal() {
        const storedCart = JSON.parse(localStorage.getItem('shop_cart')) || {};
        this.products = storedCart;

        const total_amount = document.querySelector("#total_pay");
        let total_price = 0;
        if (Object.keys(this.products).length > 0) {
            for (const key in this.products) {
                console.log(this.products[key].price);
                total_price = total_price + this.products[key].price;
            }
        }
        else {
            total_price = 0;
        }

        total_amount.textContent = "Your total is: $" + total_price.toFixed(2);

    }
}


class ShopContainer {
    constructor() {
        this.products = [
            {
                id: 0,
                name: "Case",
                price: 45.99,
                image: "./maletin.png"
            },
            {
                id: 1,
                name: "Typing Machine",
                price: 19.99,
                image: "./maquinadeescribir.png"
            },
            {
                id: 2,
                name: "Clock",
                price: 89.99,
                image: "./reloj.png"
            },
            {
                id: 3,
                name: "Radio",
                price: 59.99,
                image: "./radio.png"
            },
            {
                id: 4,
                name: "Vintage Telephone",
                price: 129.99,
                image: "./telefono.png"
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
    path: "./emptyCart.json"
  });

