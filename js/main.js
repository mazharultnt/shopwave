// Shared code used by every page: cart helpers, product cards, and the mobile menu.

var CART_KEY = "shopwave_cart";
var PROMO_KEY = "shopwave_promo";

// ---------- Cart helpers ----------

// The cart is saved in localStorage as a list like [{ id: 3, qty: 2 }]
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, qty) {
  var cart = getCart();
  var existing = cart.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: id, qty: qty });
  }
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce(function (total, item) {
    return total + item.qty;
  }, 0);
}

function updateCartCount() {
  var badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = getCartCount();
  }
}

function findProduct(id) {
  return products.find(function (p) {
    return p.id === id;
  });
}

function formatPrice(number) {
  return "$" + number.toFixed(2);
}

// Works out the money for the cart (used by the cart page and the checkout page)
function getTotals() {
  var cart = getCart();
  var subtotal = 0;

  cart.forEach(function (item) {
    var product = findProduct(item.id);
    if (product) {
      subtotal += product.price * item.qty;
    }
  });

  var promoApplied = localStorage.getItem(PROMO_KEY) === "WAVE10";
  var discount = promoApplied ? subtotal * 0.1 : 0;
  var afterDiscount = subtotal - discount;

  // Free delivery over $100, otherwise a flat $6
  var shipping = cart.length === 0 || afterDiscount >= 100 ? 0 : 6;

  return {
    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    total: afterDiscount + shipping,
    promoApplied: promoApplied,
  };
}

// ---------- Product card ----------

function productCardHTML(product) {
  return (
    '<article class="product-card">' +
    '<a href="product.html?id=' + product.id + '" class="card-image">' +
    '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.style.display=\'none\'">' +
    "</a>" +
    '<div class="card-body">' +
    '<p class="card-category">' + product.category + "</p>" +
    '<h3><a href="product.html?id=' + product.id + '">' + product.name + "</a></h3>" +
    '<p class="card-price">' + formatPrice(product.price) + "</p>" +
    '<button class="btn btn-small" data-add="' + product.id + '">Add to cart</button>' +
    "</div>" +
    "</article>"
  );
}

// Lets any grid of cards use the "Add to cart" buttons
function listenForAddButtons(container) {
  container.addEventListener("click", function (event) {
    var button = event.target.closest("[data-add]");
    if (!button) {
      return;
    }
    addToCart(Number(button.dataset.add), 1);
    button.textContent = "Added";
    setTimeout(function () {
      button.textContent = "Add to cart";
    }, 1200);
  });
}

// ---------- Mobile menu ----------

function setUpMenu() {
  var button = document.getElementById("menu-button");
  var nav = document.getElementById("main-nav");
  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  setUpMenu();
});
