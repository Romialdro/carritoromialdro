const cart = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");
const productContainer = document.getElementById("product-list");

let cartItems = [];
//funcion agregar productos, verifica si encuentra el item, en ese caso usa el metodo push+cantidad, tambien va un for each, no me funco
function addToCart(product) {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
}

//funcion eliminar productos quita las cantidades exitentes en carrito si coinciden con la lista productos

function removeFromCart(itemId) {
  const existingCartItem = cartItems.find((item) => item.id === itemId);

  if (existingCartItem) {
    existingCartItem.quantity--;
    if (existingCartItem.quantity === 0) {
      cartItems = cartItems.filter((item) => item.id !== itemId);
    }
  }

  renderCart();
}
//funcion limpiar productos lo lleva a un array vacio

function clearCart() {
  cartItems = [];  /*matriz vacia*/

  renderCart();
}
//funcion que activa la suma// tiene lentitud deberiamos agregar un async await

function renderCart() {
  let cartItemsHtml = "";

  cartItems.forEach((item) => {
    cartItemsHtml += `
      <li>
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <span> x ${item.quantity}</span>
        <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
      </li>
    `;
  });

  cart.innerHTML = cartItemsHtml;

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}
// Función para limpiar el carrito "evento"
clearCartBtn.addEventListener("click", clearCart);

checkoutBtn.addEventListener("click", () => {
  alert(`¡Gracias por su compra! El total fue de: $${cartTotal.innerHTML.slice(7)}`);
});
// Actualiza el carrito y el total 
productContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = Number(event.target.getAttribute("data-id"));
    const product = PRODUCTS.find((product) => product.id === productId);

    addToCart(product);
  } else if (event.target.classList.contains("remove-from-cart")) {
    const itemId = Number(event.target.getAttribute("data-id"));

    removeFromCart(itemId); 
  }
});
//array que usamos
const PRODUCTS = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripción del producto 1",
    price: 1200.0,
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2",
    price: 1540.0,
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción del producto 3",
    price: 2050.0,
  },
];

