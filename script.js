document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartListElement = document.getElementById('cart-list');
    const cartButtonElement = document.getElementById('cart-button');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    let cart = [];

    cartButtonElement.addEventListener('click', function () {
        modal.style.display = "block";
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        let total = 0;
        let count = 0;
        cartListElement.innerHTML = '';
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartListElement.appendChild(listItem);
        });

        cartCountElement.textContent = count;
        cartTotalElement.textContent = total.toFixed(2);
    }
});
