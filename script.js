// Sample Product Data representing Vanshika General Store inventory
const products = [
    {
        id: 1,
        name: "Handwoven Merino Wool Shawl",
        category: "woollens",
        price: 1499,
        description: "Soft, warm, and traditionally handwoven pure merino wool shawl.",
        image: "https://images.unsplash.com/photo-1601382559564-9844856f6cd9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Premium Soft Knitting Yarn (Pack of 3)",
        category: "knitting",
        price: 450,
        description: "High-quality acrylic-wool blend yarn, perfect for sweaters and scarves.",
        image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Pearl & Velvet Hair Scrunchie Set",
        category: "hair",
        price: 299,
        description: "Elegant pastel velvet scrunchies adorned with delicate pearls.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Gold-Plated Kundan Earrings",
        category: "jewellery",
        price: 899,
        description: "Traditional handcrafted Kundan earrings suitable for festive occasions.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Rose Glow Hydrating Body Lotion",
        category: "beauty",
        price: 550,
        description: "Deeply nourishing body lotion infused with natural rose extracts.",
        image: "https://images.unsplash.com/photo-1608248597359-994b63309a47?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Handcrafted Festive Gift Hamper Box",
        category: "gifts",
        price: 1299,
        description: "A curated gift box containing scented candles, bath items, and treats.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80"
    }
];

// Shopping Cart Array
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartCountSpan = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPriceSpan = document.getElementById('cart-total-price');

// Function to Display Products
function displayProducts(productsToDisplay) {
    productGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found matching your search.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <span class="product-cat">${product.category.toUpperCase()}</span>
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price}</span>
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    alert(`${product.name} added to cart!`);
}

// Update Cart Display & Totals
function updateCartUI() {
    cartCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalPriceSpan.textContent = '0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item-row');
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalPriceSpan.textContent = total;
}

// Search Filter Event Listener
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Cart Modal Toggles
cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Initial load
displayProducts(products);