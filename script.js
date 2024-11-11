let orderItems = [];

function addItem(name, price) {
    const existingItem = orderItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderItems.push({ name, price, quantity: 1 });
    }
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderItemsList = document.getElementById('orderItems');
    const totalAmountElem = document.getElementById('totalAmount');

    orderItemsList.innerHTML = '';
    let totalAmount = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - $${itemTotal}`;
        orderItemsList.appendChild(listItem);
    });

    totalAmountElem.textContent = totalAmount;
}

function exportToCSV() {
    let csvContent = '名稱,數量,單價,總價\n';
    let totalAmount = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        csvContent += `${item.name},${item.quantity},${item.price},${itemTotal}\n`;
    });

    csvContent += `總計,,,$${totalAmount}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'order_summary.csv';
    link.click();
}
