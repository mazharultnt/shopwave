// Shop page: search, category filter and sorting.

var searchInput = document.getElementById("search");
var categorySelect = document.getElementById("category");
var sortSelect = document.getElementById("sort");
var resultCount = document.getElementById("result-count");
var grid = document.getElementById("product-grid");
var emptyMessage = document.getElementById("empty-message");

// Fill the category dropdown
categories.forEach(function (name) {
  categorySelect.innerHTML += '<option value="' + name + '">' + name + "</option>";
});

// If we came from a link like shop.html?category=Tech, pre-select it
var params = new URLSearchParams(window.location.search);
var startCategory = params.get("category");
if (startCategory && categories.indexOf(startCategory) !== -1) {
  categorySelect.value = startCategory;
}

function showProducts() {
  var text = searchInput.value.trim().toLowerCase();
  var category = categorySelect.value;
  var sort = sortSelect.value;

  var list = products.filter(function (p) {
    var matchesText = p.name.toLowerCase().indexOf(text) !== -1;
    var matchesCategory = category === "All" || p.category === category;
    return matchesText && matchesCategory;
  });

  if (sort === "price-low") {
    list.sort(function (a, b) { return a.price - b.price; });
  } else if (sort === "price-high") {
    list.sort(function (a, b) { return b.price - a.price; });
  } else if (sort === "name") {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  grid.innerHTML = list.map(productCardHTML).join("");
  resultCount.textContent = list.length + (list.length === 1 ? " product" : " products");
  emptyMessage.hidden = list.length > 0;
}

searchInput.addEventListener("input", showProducts);
categorySelect.addEventListener("change", showProducts);
sortSelect.addEventListener("change", showProducts);
listenForAddButtons(grid);

showProducts();
