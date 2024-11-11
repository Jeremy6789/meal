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
}

function confirmOrder() {
    if (orderItems.length === 0) {
        alert("請先點選餐點！");
        return;
    }

    // 隱藏點餐畫面，顯示結帳畫面
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("checkoutScreen").style.display = "block";

    // 更新訂單摘要
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
    // 加入 BOM 以避免亂碼問題
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
    // 清空訂單並返回點餐畫面
    orderItems = [];
    document.getElementById("menuScreen").style.display = "block";
    document.getElementById("checkoutScreen").style.display = "none";
    document.getElementById("orderItems").innerHTML = '';
    document.getElementById("totalAmount").textContent = '0';
}
