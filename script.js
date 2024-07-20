document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 3000); // Change image every 3 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const buyButtons = document.querySelectorAll('.buy-btn');
    const cartItems = document.querySelector('.cart-items');
    const checkoutForm = document.getElementById('checkout-form');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            cart.push(product);
            updateCart();
        });
    });

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart,
                email,
                address
            })
        }).then(response => response.json())
          .then(data => {
              alert('Order placed successfully!');
              cart = [];
              updateCart();
              checkoutForm.reset();
          });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            cartItems.appendChild(div);
        });
    }
    
});
