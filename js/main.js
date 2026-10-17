
const discount = 15;
const productList = document.querySelector("#product-list");
const productCount = document.querySelector("#product-count");
const form = document.querySelector("#modal-form");
const titleInput = document.querySelector("#product-title");
const priceInput = document.querySelector("#price");
const manufacturerSelect = document.querySelector("#product-manufacturer");
const filterSelect = document.querySelector("#manufacturer");
const addModal = document.querySelector("#addProductModal");
const addModalEl = new bootstrap.Modal(addModal);
const editModal = document.querySelector("#editProductModal");
const editModalEl = new bootstrap.Modal(editModal);
const editForm = document.querySelector("#edit-form");
const editTitle = document.querySelector("#edit-product-title");
const editPrice = document.querySelector("#edit-price");
const editManufacturer = document.querySelector("#edit-product-manufacturer");
const editBenefits = document.querySelector("#edit-benefits");
const deleteModal = document.querySelector("#exampleModal");
const deleteModalEl = new bootstrap.Modal(deleteModal);
const deleteModalLabel = document.querySelector("#deleteModalLabel");
const deleteModalBody = document.querySelector("#deleteModalBody");
const deleteConfirm = document.querySelector("#deleteConfirm");
const benefitsInput = document.querySelector("#benefits");
const maxPrice = document.querySelector("#highestPrice")
const minPrice = document.querySelector("#lowestPrice")
const btn = document.querySelector("submitBtn")
function renderProduct(product) {
  const item = document.createElement("li");
  const card = document.createElement("div");
  const img = document.createElement("img");
  const body = document.createElement("div");
  const productTitle = document.createElement("h3");
  const productPrice = document.createElement("p");
  const discountedPrice = document.createElement("s");
  const manufacturer = document.createElement("p");
  const addedDate = document.createElement("p");
  const benefits = document.createElement("ul");
  const actionWrapper = document.createElement("div");
  const editBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("i");
  item.classList.add("col-4");
  card.classList.add("card", "h-100", "position-relative");
  img.classList.add("card-img-top");
  img.src = product.img;
  img.alt = product.title;
  body.classList.add("card-body");
  productTitle.classList.add("card-title");
  productTitle.textContent = product.title;
  productPrice.classList.add("card-text", "fw-bold");
  productPrice.textContent = `${product.price} so'm`;
  discountedPrice.classList.add("newPrice");
  discountedPrice.textContent = `${Math.round(product.price * (100 - discount) / 100)} so'm`;
  manufacturer.classList.add("badge", "bg-success");
  manufacturer.textContent = product.model;
  addedDate.classList.add("card-text");
  addedDate.textContent = new Date(product.addedDate).toLocaleDateString();
  benefits.classList.add("d-flex", "flex-wrap", "list-unstyled");
  product.benefits.forEach((benefit) => {
    const benefitItem = document.createElement("li");
    benefitItem.classList.add("badge", "bg-primary", "me-1", "mb-1");
    benefitItem.textContent = benefit;
    benefits.append(benefitItem);
  });
  actionWrapper.classList.add("position-absolute", "top-0", "end-0", "d-flex");
  editBtn.classList.add("btn", "rounded-0", "btn-secondary");
  editIcon.classList.add("fa-solid", "fa-pen");
  editBtn.append(editIcon);
  editBtn.dataset.id = product.id;
  editBtn.classList.add("edit-btn");
  deleteBtn.classList.add("btn", "rounded-0", "btn-danger");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteBtn.append(deleteIcon);
  deleteBtn.dataset.id = product.id;
  deleteBtn.classList.add("delete-btn");
  actionWrapper.append(editBtn, deleteBtn);
  body.append(productTitle, productPrice, discountedPrice, manufacturer, addedDate, benefits, actionWrapper);
  card.append(img, body);
  item.append(card);
  productList.append(item);
}
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => renderProduct(product));
  productCount.textContent = products.length;
}
renderProducts();
form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  if (titleInput.value.trim() && Number(priceInput.value)>0 && manufacturerSelect.value !== "0") {
    const newProduct = {
      id: Date.now(),
      title: titleInput.value.trim(),
      img: "https://picsum.photos/300/200",
      price: Number(priceInput.value),
      model: manufacturerSelect.value,
      addedDate: new Date().toISOString(),
      benefits: benefitsInput.value.split(",")
    };
    products.push(newProduct);
    renderProducts();
    form.reset();
    addModalEl.hide();
  }
});
function renderManufacturers() {
  manufacturers.forEach(function(m) {
    const opt1 = document.createElement("option");
    opt1.value = m.name;
    opt1.textContent = m.name;
    manufacturerSelect.append(opt1);
    const opt2 = document.createElement("option");
    opt2.value = m.name;
    opt2.textContent = m.name;
    filterSelect.append(opt2);
    const opt3 = document.createElement("option");
    opt3.value = m.name;
    opt3.textContent = m.name;
    editManufacturer.append(opt3);
  });
}
renderManufacturers();
productList.addEventListener("click", function(evt) {
  if (evt.target.matches(".delete-btn") || evt.target.matches(".delete-btn i")) {
    const clickedElement = evt.target.matches("i") ? evt.target.parentElement : evt.target;
    const clickedId = +clickedElement.dataset.id;
    const foundProduct = products.find(function(product) {
      return product.id == clickedId;
    });
    if (!foundProduct) {
      return;
    }
    deleteModalLabel.textContent = "Delete product";
    deleteModalBody.textContent = `Do you want to delete ${foundProduct.title}?`;
    deleteConfirm.dataset.id = clickedId;
    deleteModalEl.show();
  }
  else if (evt.target.matches(".edit-btn") || evt.target.matches(".edit-btn i")) {
    const clickedElement = evt.target.matches("i") ? evt.target.parentElement : evt.target;
    const clickedId = +clickedElement.dataset.id;
    const foundProduct = products.find(function(product) {
      return product.id == clickedId;
    });
    if (!foundProduct) {
      return;
    }
    editTitle.value = foundProduct.title;
    editPrice.value = foundProduct.price;
    editManufacturer.value = foundProduct.model;
    editBenefits.value = foundProduct.benefits.join(",");
    editForm.dataset.id = clickedId;
    editModalEl.show();
  }
});
deleteConfirm.addEventListener("click", function(evt) {
  const clickedId = +evt.target.dataset.id;
  const index = products.findIndex(function(product) {
    return product.id == clickedId;
  });
  if (index != -1) {
    products.splice(index, 1);
    renderProducts();
  }
  deleteModalEl.hide();
});
editForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const clickedId = +editForm.dataset.id;
  const index = products.findIndex(function(product) {
    return product.id == clickedId;
  });
  if (index != -1 && editTitle.value.trim() && Number(editPrice.value)>0 && editManufacturer.value !== "0") {
    const editedProduct = {
      id: clickedId,
      title: editTitle.value.trim(),
      img: products[index].img,
      price: Number(editPrice.value),
      model: editManufacturer.value,
      addedDate: products[index].addedDate,
      benefits: editBenefits.value.split(",")
    };
    products.splice(index, 1, editedProduct);
    renderProducts();
    editModalEl.hide();
  }
});
btn.addEventListener("submit" , function(evt){
  evt.preventDefault()
  

})