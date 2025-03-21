// Get references to elements
const currentPriceEl = document.getElementById("current-price");
const alertPriceEl = document.getElementById("alert-price");
const setAlertBtn = document.getElementById("set-alert-btn");
const alertMessageEl = document.getElementById("alert-message");

let currentPrice = 100;
let alertPrice = null;
let alertTriggered = false;

// Function to update random price every second
function updatePrice() {
  currentPrice = Math.floor(Math.random() * 100) + 50; // Between 50 and 150
  currentPriceEl.textContent = currentPrice;

  if (alertPrice !== null && currentPrice >= alertPrice && !alertTriggered) {
    alertTriggered = true;
    notifyUser(currentPrice);
  }
}

// Function to notify user when price threshold is reached
function notifyUser(price) {
  if (Notification.permission === "granted") {
    new Notification(`Price Alert: Price hit $${price}`);
  } else {
    alert(`Price Alert: Price hit $${price}`);
  }
  alertMessageEl.textContent = `🔥 Price hit $${price}!`;
}

// Set alert price
setAlertBtn.addEventListener("click", () => {
  alertPrice = parseFloat(alertPriceEl.value);
  if (isNaN(alertPrice) || alertPrice <= 0) {
    alertMessageEl.textContent = "❌ Please enter a valid price.";
    return;
  }
  alertTriggered = false;
  alertMessageEl.textContent = `✅ Alert set for $${alertPrice}`;
});

// Ask for notification permission
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Start the price generator
setInterval(updatePrice, 1000);
