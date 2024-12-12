let orderItems = []; 

// 監聽頁面載入
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const menuScreen = document.getElementById("menuScreen");

    // 點擊開始點餐按鈕
    startButton.addEventListener("click", () => {
        welcomeScreen.style.display = "none";
        menuScreen.style.display = "block";
    });
});

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

function removeItem(name) { 
    const itemIndex = orderItems.findIndex(item => item.name === name); 
    if (itemIndex !== -1) { 
        orderItems.splice(itemIndex, 1); 
        updateCurrentOrderDisplay(); 
        updateOrderSummary(); 
        alert(`${name} 已從訂單移除！`); 
    } 
}

function updateCurrentOrderDisplay() { 
    const currentOrderList = document.getElementById("currentOrder"); 
    currentOrderList.innerHTML = ''; 

    orderItems.forEach(item => { 
        const listItem = document.createElement("li"); 
        listItem.textContent = `${item.name} x ${item.quantity}`; 
        currentOrderList.appendChild(listItem); 
    }); 
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElem = document.createElement("p");
    totalElem.textContent = `目前總金額: $${totalAmount}`;
    currentOrderList.appendChild(totalElem);
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
    document.getElementById("payScreen").style.display = "none"; 
    document.getElementById("orderItems").innerHTML = ''; 
    document.getElementById("totalAmount").textContent = '0'; 
    document.getElementById("currentOrder").innerHTML = ''; 
}

function pay() {
    const pickupNumber = Math.floor(Math.random() * 200)+1; // 生成1-200編號
    document.getElementById("pickup-number").textContent = pickupNumber;
    document.getElementById("payScreen").style.display = "block"; 
    document.getElementById("checkoutScreen").style.display = "none";
    alert("您的訂單已送出!!");
}

function select() {
    const selected = document.getElementById("means").value;
    alert(`已確認以${selected}支付`);
    pay();
}
