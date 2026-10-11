// Checkout page: check the form, then show a thank-you message.

var form = document.getElementById("checkout-form");
var layout = document.getElementById("checkout-layout");
var emptyCheckout = document.getElementById("empty-checkout");
var successBox = document.getElementById("success-box");

function showSummary() {
  var cart = getCart();

  if (cart.length === 0) {
    emptyCheckout.hidden = false;
    layout.hidden = true;
    return;
  }

  var lines = "";
  cart.forEach(function (item) {
    var product = findProduct(item.id);
    if (product) {
      lines +=
        '<div class="order-line"><span>' + product.name + " x " + item.qty + "</span>" +
        "<span>" + formatPrice(product.price * item.qty) + "</span></div>";
    }
  });
  document.getElementById("order-lines").innerHTML = lines;

  var totals = getTotals();
  document.getElementById("subtotal").textContent = formatPrice(totals.subtotal);
  document.getElementById("discount").textContent = "-" + formatPrice(totals.discount);
  document.getElementById("discount-row").hidden = !totals.promoApplied;
  document.getElementById("shipping").textContent =
    totals.shipping === 0 ? "Free" : formatPrice(totals.shipping);
  document.getElementById("total").textContent = formatPrice(totals.total);
}

function setError(fieldId, message) {
  document.getElementById(fieldId + "-error").textContent = message;
  document.getElementById(fieldId).classList.toggle("input-error", message !== "");
}

function checkForm() {
  var valid = true;
  var name = document.getElementById("full-name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var city = document.getElementById("city").value.trim();
  var address = document.getElementById("address").value.trim();

  if (name.length < 2) {
    setError("full-name", "Please enter your full name.");
    valid = false;
  } else {
    setError("full-name", "");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  // Accept digits, spaces, + and dashes, with at least 7 digits
  var digits = phone.replace(/\D/g, "");
  if (!/^[0-9+\-\s()]+$/.test(phone) || digits.length < 7) {
    setError("phone", "Please enter a valid phone number.");
    valid = false;
  } else {
    setError("phone", "");
  }

  if (city === "") {
    setError("city", "Please enter your city.");
    valid = false;
  } else {
    setError("city", "");
  }

  if (address.length < 5) {
    setError("address", "Please enter your full address.");
    valid = false;
  } else {
    setError("address", "");
  }

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!checkForm()) {
    return;
  }

  var orderNumber = "SW-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("order-number").textContent = "Order number: " + orderNumber;
  document.getElementById("success-email").textContent = document.getElementById("email").value.trim();

  // Empty the cart and forget the promo code
  saveCart([]);
  localStorage.removeItem(PROMO_KEY);

  layout.hidden = true;
  successBox.hidden = false;
  window.scrollTo(0, 0);
});

showSummary();
