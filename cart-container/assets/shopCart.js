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


export default ShopCart;