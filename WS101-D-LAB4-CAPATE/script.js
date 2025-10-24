let inventory = [
    { name: "Laptop", category: "Electronics", price: 50000, stock: 10 },
    { name: "Phone", category: "Electronics", price: 30000, stock: 3 },
    { name: "Shoes", category: "Fashion", price: 2500, stock: 15 },
    { name: "Bag", category: "Fashion", price: 1800, stock: 2 },
    { name: "Book", category: "Education", price: 500, stock: 20 }
];

function getTotalValue(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].stock;
    }
    return total;
}

function getHighestPrice(items) {
    let highest = items[0];
    for (let i = 1; i < items.length; i++) {
        if (items[i].price > highest.price) {
            highest = items[i];
        }
    }
    return highest;
}

function getLowStock(items) {
    return items.filter(p => p.stock < 5);
}

function groupByCategory(items) {
    let groups = {};
    for (let i = 0; i < items.length; i++) {
        let category = items[i].category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(items[i]);
    }
    return groups;
}

function fetchNewProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let newItems = [
                { name: "Tablet", category: "Electronics", price: 15000, stock: 5 },
                { name: "Watch", category: "Fashion", price: 3500, stock: 8 }
            ];
            resolve(newItems);
        }, 2000);
    });
}

async function updateInventory() {
    console.log("Fetching new products...");
    let newItems = await fetchNewProducts();
    inventory = inventory.concat(newItems);
    console.log("Updated Inventory:", inventory);
}

// Test functions
console.log("Total Value of Stock:", getTotalValue(inventory));
console.log("Highest Priced Product:", getHighestPrice(inventory));
console.log("Low Stock Products:", getLowStock(inventory));
console.log("Grouped by Category:", groupByCategory(inventory));

updateInventory();
