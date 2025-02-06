
class ShopContainer {
    constructor() {
        this.products = [
            {
                id: 0,
                name: "Maletín",
                price: 45.99,
                image: "/shoping-container/images/maletin.png"
            },
            {
                id: 1,
                name: "Máquina de Escribir",
                price: 19.99,
                image: "/shoping-container/images/maquinadeescribir.png"
            },
            {
                id: 2,
                name: "Reloj",
                price: 89.99,
                image: "/shoping-container/images/reloj.png"
            },
            {
                id: 3,
                name: "Radio",
                price: 59.99,
                image: "/shoping-container/images/radio.png"
            },
            {
                id: 4,
                name: "Teléfono",
                price: 129.99,
                image: "/shoping-container/images/telefono.png"
            }
        ];

        let cart = [];
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

export default ShopContainer;