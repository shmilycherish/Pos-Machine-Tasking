
const items = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function printReceipt(barcodes) {
    let items = tagItems(barcodes);
    console.log(generateReceipt(generateReceiptBody(items), getTotalPrice(items)));
}

function findItemByBarcode(barcode) {
   return items.find(item => item.id === barcode);
}

function tagItems(barcodes) {
    return barcodes.reduce((result, barcode) => {
        let itemInResult = result.find(item => item.id === barcode);
        if(itemInResult !== undefined) {
            itemInResult.count++;
        } else {
            let item = findItemByBarcode(barcode);
            item.count = 1;
            result.push(item);
        }
        return result;
    }, [])
}

function generateItemForReceipt(item) {
    return `${item.name}${generateSpace(32 - item.name.length)}${item.price}          ${item.count}`
}

function generateSpace(count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += ' ';
    }
    return result;
}

function generateReceiptBody(items) {
    return items.map(item => generateItemForReceipt(item)).join('\n');
}

function getTotalPrice(items) {
    return items.reduce((total, item) => total + item.price * item.count, 0)
}

function generateReceipt(receiptBody, total) {
    return `Receipts
------------------------------------------------------------
${receiptBody}
------------------------------------------------------------
Price: ${total}`;
}

module.exports = {printReceipt, findItemByBarcode, tagItems,
    generateItemForReceipt, generateReceiptBody, getTotalPrice, generateReceipt};