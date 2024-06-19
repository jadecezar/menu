var orderItems = [];

function toggleCategoryButtons(show) {
  var categoryButtons = document.getElementById("category-buttons");
  if (show) {
    categoryButtons.style.display = "block";
  } else {
    categoryButtons.style.display = "none";
  }
}

function showReviewOrder() {
  toggleCategoryButtons(false);

  document.getElementById("review-order-section").style.display = "block";

  var orderList = document.getElementById("order-list");
  orderList.innerHTML = "";
  for (var i = 0; i < orderItems.length; i++) {
    var item = orderItems[i];
    var listItem = document.createElement("li");
    listItem.textContent = item.name + " - P" + item.price.toFixed(2);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = (function(index) {
      return function() {
        deleteOrderItem(index);
      };
    })(i);
    listItem.appendChild(deleteButton);
    orderList.appendChild(listItem);
  }

  var total = calculateTotal();
  var discountedTotal = calculateTotalWithDiscount(total);
  document.getElementById("total").textContent = discountedTotal.toFixed(2);
}

function calculateTotal() {
  var total = 0;
  for (var i = 0; i < orderItems.length; i++) {
    total += orderItems[i].price;
  }
  return total;
}

function calculateTotalWithDiscount(total) {
  var discount = 0;
  var discountOption = document.querySelector('input[name="discount"]:checked').value;
  if (discountOption === "student") {
    discount = 0.10; // 10% discount for students
  } else if (discountOption === "senior") {
    discount = 0.15; // 15% discount for senior citizens
  }
  return total - (total * discount);
}

function scrollToCategory(categoryId) {
  var categorySection = document.getElementById(categoryId);
  categorySection.scrollIntoView({ behavior: 'smooth' });
}

function addToOrder(name, price) {
  orderItems.push({ name: name, price: price });
  updateOrderList();
  updateTotal();
}

function updateOrderList() {
  var orderList = document.getElementById("order-list");
  orderList.innerHTML = "";
  for (var i = 0; i < orderItems.length; i++) {
    var item = orderItems[i];
    var listItem = document.createElement("li");
    listItem.textContent = item.name + " - P" + item.price.toFixed(2);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = (function(index) {
      return function() {
        deleteOrderItem(index);
      };
    })(i);
    listItem.appendChild(deleteButton);
    orderList.appendChild(listItem);
  }
}

function deleteOrderItem(index) {
  orderItems.splice(index, 1);
  showReviewOrder(); 
}

function clearOrder() {
  orderItems = [];
  updateOrderList();
  updateTotal();

  document.getElementById("review-order-section").style.display = "none";

  document.getElementById("menu-section").style.display = "block";

  toggleCategoryButtons(true);
}

function calculateFinalAmount() {
  var total = parseFloat(document.getElementById("total").textContent);
  var discountOption = document.querySelector('input[name="discount"]:checked').value;
  var discountRate = 0;
  
  if (discountOption === "student") {
    discountRate = 0.10; // 10% discount for students
  } else if (discountOption === "senior") {
    discountRate = 0.15; // 15% discount for senior citizens
  }

  var discountedAmount = total - (total * discountRate);

  return discountedAmount;
}

function proceedToPayment() {
  var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  var diningOption = document.querySelector('input[name="dining"]:checked').value;
  var finalAmount = calculateFinalAmount();

 
  var message = "Proceeding to payment using "  + paymentMethod;
  if (diningOption === "dine-in") {
    message += " for Dine In.";
  } else {
    message += " for Take Out.";
  }
  message += " Final amount to be paid: P" + finalAmount.toFixed(2);
  alert(message);
}
