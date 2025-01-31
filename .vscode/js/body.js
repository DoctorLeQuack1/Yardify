const products = [
    {
        id: 2,
        name: "Maletín",
        price: 45.99,
        image: "images/maletin.png"  
    },
    {
        id: 3,
        name: "Máquina de Escribir",
        price: 19.99,
        image: "images/maquinadeescribir.png" 
    },
    {
        id: 4,
        name: "Reloj",
        price: 89.99,
        image: "images/reloj.png" 
    },
    {
        id: 5,
        name: "Radio",
        price: 59.99,
        image: "images/radio.png"     
    },
    {
        id: 6,
        name: "Teléfono",
        price: 129.99,
        image: "images/telefono.png"   
    }
];

let cart = [];

// Función para renderizar productos dinámicos
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ""; // LIMPIA ANTES DE RENDERIZAR

    console.log("Renderizando productos..."); // DEBUG

    container.innerHTML = products.map(product => `
        <div class="col-md-4 col-sm-6">
            <div class="product-card">
                <div class="add-to-cart" onclick="addToCart(${product.id})">+</div>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="mt-3">
                    <h5>${product.name}</h5>
                    <p class="mb-0">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`¡${product.name} agregado al carrito!`);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Inicializar la página con `once: true` para evitar múltiples ejecuciones
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded ejecutado"); // DEBUG
    renderProducts();
}, { once: true });