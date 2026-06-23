"use strict";
// The main program

// the store
const myDataStore = {
    items: [],
    cartCount: 0,
    totalPrice: 0,
    couponApplied: false,
    isBotFlagged: false
};

// subscribers
const subscribersList = [];
const subscribeToStore = (sectionFunction) => {
    subscribersList.push(sectionFunction);
};

// adding data guard
const addData = (product) => {
    // Is it a valid object
    if (!product || typeof product !== 'object' || !product.id || !product.price) {
        console.error("[GUARD REJECTED]: Invalid product data structure.");
        return false;
    }

    // Is it in stock?
    if (product.stock <= 0) {
        console.error(`[GUARD REJECTED]: ${product.name} is out of stock!`);
        return false;
    }

    // Is the price mathematically safe?
    if (product.price <= 0) {
        console.error("[GUARD REJECTED]: Price integrity violation (must be greater than 0).");
        return false;
    }

    // Bot Limit Check
    // Check how many of this specific item are already inside our store array
    const existingItemsCount = myDataStore.items.filter(item => item.id === product.id).length;

    // Rule A: Cannot have more than 5 of the exact same item
    // Rule B: Total items in the entire cart cannot exceed 10
    if (existingItemsCount >= 5 || myDataStore.cartCount >= 10) {
        console.error("[GUARD REJECTED]: Bulk purchase limit hit! Bot flag activated.");
        myDataStore.isBotFlagged = true;
        return false;
    }

    // SUCCESS
    console.log(`[GUARD PASSED]: ${product.name} is safe to add.`);

    myDataStore.items.push(product);
    myDataStore.cartCount++;
    myDataStore.totalPrice += product.price;

    product.stock--
    console.log(`[STORE SUCCESS]: ${product.name} added to memory.`);
    announceAddition()
    return true;
};

// announcing addtion (megaphone)
const announceAddition = () => {
    console.log("[MEGAPHONE]: State changed! Broadcasting to all components...");

    subscribersList.forEach((notifyComponent) => {
        notifyComponent();
    });
};

// deep freeze
const deepFreeze = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach((key) => {
        const prop = obj[key];

        if (prop !== null && typeof prop === 'object') {
            deepFreeze(prop);
        }
    });

    return obj;
};

// reading the data
const readData = function () {
    const deepCloneOfStore = structuredClone(myDataStore);

    const safeSnapshot = deepFreeze(deepCloneOfStore);

    return safeSnapshot;
}



// The simulation

// section 1 (Header Cart)
// increase the number of cart count 
function headerUpdate() {
    const data = readData();
    console.log(`[HEADER UI]: Total Items: ${data.cartCount}`);
}

subscribeToStore(headerUpdate);

// section 2 (Checkout)
// will give the total product details with all the product specification and final total price
function checkoutTotal() {
    const data = readData();
    console.log(`[CHECKOUT PAGE]: Current Bill Balance: $${data.totalPrice}`);
    console.log("Items List:");
    data.items.forEach(item => console.log(`  - ${item.name} ($${item.price})`));
}

subscribeToStore(checkoutTotal);

// section 3 (analytics)
// server side work 
function analyticsReport() {
    const data = readData();
    console.log("[ANALYTICS ENGINE]: Analyzing behavior...");

    if (data.isBotFlagged) {
        console.warn("[SECURITY ALERT]: Suspicious bulk bot activity recorded");
    }

    if (data.totalPrice > 500) {
        console.log("[MARKETING EVENT]: High-Tier Spender detected.");
    } else {
        console.log("Standard Tier user activity logged.");
    }
}

subscribeToStore(analyticsReport);

// adding data section 1 (add to cart)

// available products dataset imported from gemini
const availableProducts = [
    // ============================================================================
    // 🏷️ LOW-COST / BUDGET TIER ($0 - $20)
    // ============================================================================
    { id: "prod_low_01", name: "Premium Sticker Pack (Laptop Deco)", price: 3, category: "stationery", stock: 500, rating: 4.2 },
    { id: "prod_low_02", name: "Microfiber Screen Cleaning Cloth", price: 5, category: "electronics", stock: 1200, rating: 4.6 },
    { id: "prod_low_03", name: "AA Rechargeable Batteries (4-Pack)", price: 12, category: "electronics", stock: 340, rating: 4.4 },
    { id: "prod_low_04", name: "Ergonomic Foam Mousepad", price: 15, category: "electronics", stock: 210, rating: 4.1 },
    { id: "prod_low_05", name: "Stainless Steel Pocket Multi-Tool", price: 19, category: "accessories", stock: 180, rating: 4.3 },

    // ============================================================================
    // 🛒 STANDARD / MID-TIER ($20 - $500)
    // ============================================================================
    { id: "prod_mid_01", name: "Insulated Travel Tumbler", price: 25, category: "kitchen", stock: 150, rating: 4.6 },
    { id: "prod_mid_02", name: "Minimalist Leather Journal", price: 30, category: "books", stock: 85, rating: 4.2 },
    { id: "prod_mid_03", name: "USB-C Multi-Port Hub", price: 35, category: "electronics", stock: 110, rating: 3.2 },
    { id: "prod_mid_04", name: "Waterproof Windbreaker Jacket", price: 85, category: "apparel", stock: 24, rating: 4.3 },
    { id: "prod_mid_05", name: "Wireless Mechanical Keyboard", price: 125, category: "electronics", stock: 45, rating: 4.6 },
    { id: "prod_mid_06", name: "Ergonomic Running Shoes", price: 130, category: "apparel", stock: 15, rating: 4.7 },
    { id: "prod_mid_07", name: "Noise-Canceling Headphones", price: 299, category: "electronics", stock: 18, rating: 4.9 },
    { id: "prod_mid_08", name: "UltraWide 2K Gaming Monitor", price: 450, category: "electronics", stock: 12, rating: 4.8 },

    // ============================================================================
    // ⭐ PREMIUM / HIGH-END TIER ($500 - $2,000)
    // ============================================================================
    { id: "prod_prem_01", name: "Programmable Espresso Machine", price: 599, category: "kitchen", stock: 5, rating: 4.9 },
    { id: "prod_prem_02", name: "Premium Ergonomic Office Chair", price: 950, category: "furniture", stock: 8, rating: 4.7 },
    { id: "prod_prem_03", name: "Carbon Fiber Road Bike Frame", price: 1200, category: "sports", stock: 4, rating: 4.5 },
    { id: "prod_prem_04", name: "High-Performance Creator Laptop", price: 1899, category: "electronics", stock: 14, rating: 4.6 },

    // ============================================================================
    // 💎 ULTRA-LUXURY / WHALE TIER ($2,000 - $12,000+)
    // ============================================================================
    { id: "prod_lux_01", name: "AI-Powered Smart Fitness Mirror", price: 2500, category: "sports", stock: 3, rating: 4.4 },
    { id: "prod_lux_02", name: "Professional Full-Frame Cinema Camera", price: 4200, category: "electronics", stock: 2, rating: 4.9 },
    { id: "prod_lux_03", name: "Handcrafted Swiss Automatic Watch", price: 7500, category: "accessories", stock: 1, rating: 4.8 },
    { id: "prod_lux_04", name: "Next-Gen AI Liquid-Cooled Server Rack", price: 12000, category: "electronics", stock: 2, rating: 5.0 }
];

// test cases uploaded by gemini
// ============================================================================
// 🧪 AUTOMATED TEST HARNESS SIMULATION
// ============================================================================

console.log("=== TEST CASE 1: SUCCESSFUL PURCHASE FLOW ===");
// Add a high-end creator laptop ($1899)
addData(availableProducts[16]);


console.log("\n=== TEST CASE 2: INVENTORY EXHAUSTION GUARD ===");
// Let's find an item with very low stock to deplete it completely
const premiumChair = availableProducts[14]; // Premium Office Chair (Stock: 8)
console.log(`Initial stock of ${premiumChair.name}: ${premiumChair.stock}`);

// Loop to simulate adding it 9 times (exceeding stock)
for (let i = 1; i <= 9; i++) {
    console.log(`--- Attempt #${i} ---`);
    addData(premiumChair);
}


console.log("\n=== TEST CASE 3: IMMUTABILITY BYPASS ATTACK ===");
const externalDataView = readData();
try {
    // Malicious attempt to manipulate checkout balance directly
    externalDataView.totalPrice = 0;
    console.log("Attack Successful? Total price is now: " + externalDataView.totalPrice);
} catch (error) {
    console.error("🔒 [ENGINE BLOCK]: Direct mutation failed! State is unchangeable.");
}