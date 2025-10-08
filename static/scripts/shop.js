// Cart array to hold selected items
let cart = [];

// Function to add an item to the cart
function addToCart(id, name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // Add new item to the cart
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartCount();
    updateCartItems();
}











































// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Function to update cart items in the modal
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - Rs.${item.price} x ${item.quantity}
            <button class="btn-increase" data-id="${item.id}">+</button>
            <button class="btn-decrease" data-id="${item.id}">-</button>
            <button class="btn-remove" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
    });

    updateTotalPrice();
}

// Function to update the total price in the cart
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartItems();
}

// Function to increase item quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCartCount();
        updateCartItems();
    }
}

// Function to decrease item quantity
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(id);
    }
    updateCartCount();
    updateCartItems();
}

// Event listener to handle button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        addToCart(id, name, price);
    }

    if (e.target.classList.contains('btn-increase')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        increaseQuantity(id);
    }

    if (e.target.classList.contains('btn-decrease')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        decreaseQuantity(id);
    }

    if (e.target.classList.contains('btn-remove')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(id);
    }
});

// Function to open the cart modal
function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
}

// Function to close the cart modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Event listener for cart icon click
document.getElementById('cartIcon').addEventListener('click', openCartModal);

// Event listener for close button in the cart modal
document.querySelector('.close').addEventListener('click', closeCartModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCartModal();
    }
});
