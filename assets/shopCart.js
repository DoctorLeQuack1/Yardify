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
        img_.src = '../banana.jpg';
        img_.height = '100';
        img_.width = '100';

        img_div.appendChild(img_);

        //Segunda Col
        const item_desc_div = document.createElement('div');
        item_desc_div.classList.add('col');

        const item_name = document.createElement("span");
        item_name.textContent = value.name
        item_name.style.display = "block";

        const item_price = document.createElement("span");
        item_price.textContent = value.price
        item_price.style.display = "block";

        item_desc_div.append(item_name, item_price)

        // Tercera Col
        const trash_button_div = document.createElement('div');
        trash_button_div.classList.add('col-auto');

        const trash_button = document.createElement("button");
        trash_button.type = 'button';
        trash_button.className = 'btn';
        trash_button.textContent = '\u{1F5D1}';

        trash_button_div.appendChild(trash_button);

        //Add all elements to car section
        prod_card.append(img_div, item_desc_div, trash_button_div);

        document.querySelector('#cart-section').append(prod_card);
        document.querySelector('#empty-cart-section').style.display = 'none'; // Oculta la sección vacía
        document.querySelector('#cart-section').style.display = 'block'; // Muestra la sección del carrito

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
        }
    }

    deleteCart() {
        this.products = {};
        localStorage.clear();
        document.querySelectorAll('[class*="data-product"]').forEach(elemento => elemento.remove());
        this.renderCart();
    }
}


export default ShopCart;