// Cart page: list the items, change quantities, remove items and use a promo code.

var itemsBox = document.getElementById("cart-items");
var emptyCart = document.getElementById("empty-cart");
var cartLayout = document.getElementById("cart-layout");
var promoInput = document.getElementById("promo-code");
var promoMessage = document.getElementById("promo-message");

function showCart() {
  var cart = getCart();

  if (cart.length === 0) {
    emptyCart.hidden = false;
    cartLayout.hidden = true;
    return;
  }
  emptyCart.hidden = true;
  cartLayout.hidden = false;

  var html = "";
  cart.forEach(function (item) {
    var product = findProduct(item.id);
    if (!product) {
      return;
    }
    html +=
      '<div class="cart-item">' +
      '<a class="cart-thumb" href="product.html?id=' + product.id + '">' +
      '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.style.display=\'none\'">' +
      "</a>" +
      "<div>" +
      "<h3>" + product.name + "</h3>" +
      '<p class="muted">' + formatPrice(product.price) + " each</p>" +
      '<div class="cart-item-controls">' +
      '<label class="muted" for="qty-' + product.id + '">Qty</label>' +
      '<input type="number" id="qty-' + product.id + '" min="1" max="20" value="' + item.qty + '" data-qty="' + product.id + '">' +
      '<button type="button" class="link-button" data-remove="' + product.id + '">Remove</button>' +
      "</div>" +
      "</div>" +
      '<p class="cart-item-price">' + formatPrice(product.price * item.qty) + "</p>" +
      "</div>";
  });
  itemsBox.innerHTML = html;

  var totals = getTotals();
  document.getElementById("subtotal").textContent = formatPrice(totals.subtotal);
  document.getElementById("discount").textContent = "-" + formatPrice(totals.discount);
  document.getElementById("discount-row").hidden = !totals.promoApplied;
  document.getElementById("shipping").textContent =
    totals.shipping === 0 ? "Free" : formatPrice(totals.shipping);
  document.getElementById("total").textContent = formatPrice(totals.total);
}

// Quantity changes and remove buttons (one listener for the whole list)
itemsBox.addEventListener("change", function (event) {
  var input = event.target.closest("[data-qty]");
  if (!input) {
    return;
  }
  var id = Number(input.dataset.qty);
  var qty = parseInt(input.value, 10);
  if (isNaN(qty) || qty < 1) {
    qty = 1;
  }
  if (qty > 20) {
    qty = 20;
  }

  var cart = getCart();
  cart.forEach(function (item) {
    if (item.id === id) {
      item.qty = qty;
    }
  });
  saveCart(cart);
  showCart();
});

itemsBox.addEventListener("click", function (event) {
  var button = event.target.closest("[data-remove]");
  if (!button) {
    return;
  }
  var id = Number(button.dataset.remove);
  var cart = getCart().filter(function (item) {
    return item.id !== id;
  });
  saveCart(cart);
  showCart();
});

document.getElementById("apply-promo").addEventListener("click", function () {
  var code = promoInput.value.trim().toUpperCase();

  if (code === "WAVE10") {
    localStorage.setItem(PROMO_KEY, "WAVE10");
    promoMessage.textContent = "Code applied. You get 10% off.";
  } else {
    localStorage.removeItem(PROMO_KEY);
    promoMessage.textContent = "Sorry, that code is not valid.";
  }
  showCart();
});

if (localStorage.getItem(PROMO_KEY) === "WAVE10") {
  promoInput.value = "WAVE10";
}

showCart();
