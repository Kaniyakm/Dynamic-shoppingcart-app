const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
const itemCounter = document.getElementById('item-counter'); // Add for counter

// Variables to track totals
let itemCount = 0;
let totalPrice = 0; // Added track # of products
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to recalculate total price based on all items
function recalculateTotal() {
  let newTotal = 0;
  const items = document.querySelectorAll('.cart-item');
  items.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    newTotal += price * quantity;
  });
  totalPrice = newTotal;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

 // addProduct: 
 function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);


  // Validate inputs
  if (!name || isNaN(price) || price <= 0) {
    alert("Please enter a valid product name and price.");
    return;}

  // Create new list item using createElement()
 // Create a new <li> element for the product
  const li = document.createElement('li');
  li.classList.add('cart-item');

  // Create elements for product name and price
  const nameSpan = document.createElement('span');
  nameSpan.textContent = `${name} - `;

  // Create quantity input
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.value = '1';
  quantityInput.classList.add('quantity-input');

    // Create price display (subtotal)
  const priceSpan = document.createElement('span');
  priceSpan.textContent = `$${price.toFixed(2)}`;

  // Create a "Remove" button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

    // Event listener to remove the product using .remove()
  removeButton.addEventListener('click', () => {
    li.remove(); // Removes this product from the DOM
    updateTotalPrice(-price);    // Subtract this item's price
    itemCount--; // Decrease item count
    itemCounter.textContent = itemCount; // Update counter display
  });

  // Event: Change quantity
  quantityInput.addEventListener('input', () => {
    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
      li.remove(); // Remove invalid or zero quantity items
      itemCount--;
      itemCounter.textContent = itemCount;
    }
    recalculateTotal(); // Update total
  });

  // Append elements to <li>
  li.appendChild(nameSpan);
  li.appendChild(priceSpan);
  li.appendChild(removeButton);
  li.appendChild(quantityInput);


  // Append the new <li> to the cart list
  cart.appendChild(li);

  // Update totals
  updateTotalPrice(price);       // Add this product's price
  itemCount++;                   // Increase counter
  itemCounter.textContent = itemCount;
  recalculateTotal();

  // Clear input fields
  productNameInput.value = '';
  productPriceInput.value = '';
}

// Add event listener for the Add Product button
addProductButton.addEventListener('click', addProduct);
