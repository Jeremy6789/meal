let orderItems = [];

function addItem(name, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value, 10);
    if (quantity < 1) return;

    const existingItem = orderItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        orderItems.push({ name, price, quantity });
    }

    alert(`${name} x ${quantity} 已加入訂單！`);
    updateCurrentOrderDisplay();
}

function updateCurrentOrderDisplay() {
    const currentOrderList = document.getElementById("currentOrder");
    currentOrderList.innerHTML = '';

    orderItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} x ${item.quantity}`;
        currentOrderList.appendChild(listItem);
    });
}

function confirmOrder() {
    if (orderItems.length === 0) {
        alert("請先點選餐點！");
        return;
    }

    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("checkoutScreen").style.display = "block";

    updateOrderSummary();
}

function updateOrderSummary() {
    const orderItemsList = document.getElementById("orderItems");
    const totalAmountElem = document.getElementById("totalAmount");

    orderItemsList.innerHTML = '';
    let totalAmount = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} x ${item.quantity} - $${itemTotal}`;
        orderItemsList.appendChild(listItem);
    });

    totalAmountElem.textContent = totalAmount;
}

function exportToCSV() {
    let csvContent = '\uFEFF名稱,數量,單價,總價\n';
    let totalAmount = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        csvContent += `${item.name},${item.quantity},${item.price},${itemTotal}\n`;
    });

    csvContent += `總計,,,$${totalAmount}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "order_summary.csv";
    link.click();
}

function backToMenu() {
    orderItems = [];
    document.getElementById("menuScreen").style.display = "block";
    document.getElementById("checkoutScreen").style.display = "none";
    document.getElementById("orderItems").innerHTML = '';
    document.getElementById("totalAmount").textContent = '0';
    document.getElementById("currentOrder").innerHTML = '';
}
