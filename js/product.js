// Product page: reads ?id=3 from the address and shows that product.

var params = new URLSearchParams(window.location.search);
var productId = Number(params.get("id"));
var product = findProduct(productId);

var detail = document.getElementById("product-detail");
var notFound = document.getElementById("not-found");

if (!product) {
  detail.hidden = true;
  notFound.hidden = false;
} else {
  document.title = product.name + " | ShopWave";
  document.getElementById("breadcrumb-name").textContent = product.name;

  detail.innerHTML =
    '<div class="detail-image">' +
    '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.style.display=\'none\'">' +
    "</div>" +
    "<div>" +
    '<p class="card-category">' + product.category + "</p>" +
    "<h1>" + product.name + "</h1>" +
    '<p class="detail-price">' + formatPrice(product.price) + "</p>" +
    "<p>" + product.description + "</p>" +
    '<div class="quantity-row">' +
    '<button type="button" class="qty-button" id="minus" aria-label="Less">-</button>' +
    '<input type="number" id="qty" value="1" min="1" max="20">' +
    '<button type="button" class="qty-button" id="plus" aria-label="More">+</button>' +
    "</div>" +
    '<button type="button" class="btn" id="add-button">Add to cart</button>' +
    '<p class="muted" id="added-message" role="status"></p>' +
    "</div>";

  var qtyInput = document.getElementById("qty");

  function getQty() {
    var value = parseInt(qtyInput.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    if (value > 20) {
      value = 20;
    }
    return value;
  }

  document.getElementById("minus").addEventListener("click", function () {
    qtyInput.value = Math.max(1, getQty() - 1);
  });

  document.getElementById("plus").addEventListener("click", function () {
    qtyInput.value = Math.min(20, getQty() + 1);
  });

  document.getElementById("add-button").addEventListener("click", function () {
    var qty = getQty();
    qtyInput.value = qty;
    addToCart(product.id, qty);
    document.getElementById("added-message").textContent =
      qty + " added to your cart. View your cart to check out.";
  });

  // Other products from the same category
  var related = products
    .filter(function (p) {
      return p.category === product.category && p.id !== product.id;
    })
    .slice(0, 4);

  if (related.length > 0) {
    var relatedGrid = document.getElementById("related-products");
    relatedGrid.innerHTML = related.map(productCardHTML).join("");
    listenForAddButtons(relatedGrid);
    document.getElementById("related-section").hidden = false;
  }
}
