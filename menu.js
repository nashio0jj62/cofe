document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartItemsList = document.getElementById('cart-items');
  const orderButton = document.getElementById('order-btn');
  const clearCartButton = document.getElementById('clear-cart-btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  orderButton.addEventListener('click', processOrder);
  clearCartButton.addEventListener('click', clearCart);

  function addToCart(event) {
    const menuItem = event.target.closest('.menu-item');
    const itemId = menuItem.dataset.id;
    const itemName = menuItem.dataset.name;
    const itemPrice = parseFloat(menuItem.dataset.price);

    const cartItem = document.createElement('li');
    cartItem.innerHTML = `<span>${itemName} - $${itemPrice.toFixed(2)}</span>`;
    cartItemsList.appendChild(cartItem);
  }

  function processOrder() {
    // Create and append the dollar image
    const dollarImage = document.createElement('img');
    dollarImage.src = 'money.png'; // Путь к изображению доллара
    dollarImage.className = 'dollar-img';
    document.body.appendChild(dollarImage);

    // Calculate total order amount
    const totalAmount = Array.from(cartItemsList.children)
      .map(item => parseFloat(item.textContent.match(/\$([\d.]+)/)[1]))
      .reduce((sum, price) => sum + price, 0);

    // Display confirmation message
    const confirmationMessage = `Order placed successfully! You ordered for $${totalAmount.toFixed(2)}.`;
    alert(confirmationMessage);

    // Play sound effect
    playOrderSound();

    // Animate the dollar image
    animateDollarImage(dollarImage);
  }

  function clearCart() {
    cartItemsList.innerHTML = '';
  }

  function playOrderSound() {
    // You can replace the 'path/to/order-sound.mp3' with the actual path to your sound file
    const audio = new Audio('coffee-sound.mp3');
    audio.play();
  }

  function animateDollarImage(image) {
    const animationDuration = 2000; // Длительность анимации в миллисекундах

    // Set initial styles
    image.style.position = 'absolute';
    image.style.width = '50px'; // Начальная ширина изображения
    image.style.top = `${orderButton.offsetTop}px`;
    image.style.left = `${orderButton.offsetLeft + orderButton.offsetWidth}px`;

    // Start animation
    image.animate(
      [
        { opacity: 0, transform: 'translateX(0) scale(0.5)' },
        { opacity: 1, transform: 'translateX(200px) scale(1)' },
      ],
      {
        duration: animationDuration,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    // Remove the image after the animation is complete
    setTimeout(() => {
      image.remove();
    }, animationDuration);
  }
});
