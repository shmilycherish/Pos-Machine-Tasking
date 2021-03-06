
const {printReceipt, findItemByBarcode, tagItems, generateItemForReceipt, generateReceiptBody, getTotalPrice, generateReceipt} = require('../pos-machine');

describe('find item by barcode', () => {
    it('should return item details when find the item', () => {
        expect(findItemByBarcode('0001')).toEqual({"id": "0001", "name" : "Coca Cola", "price": 3});
    });

    it('should return undefined when not find the item', () => {
        expect(findItemByBarcode('')).toBeUndefined();
    });
});

describe('tag items', () => {
    it('should return item details when find the item', () => {
        const expectText = [{"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},
            {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2},
            {"id": "0005", "name" : "Dr Pepper", "price": 7, "count": 1}];
        expect(tagItems(['0001', '0003', '0005', '0003'])).toEqual(expectText);
    });
});

describe('generate item line', () => {
    it('should return item printable format when given the item', () => {
        const expectText = "Coca Cola                       3          1";
        expect(generateItemForReceipt({"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1})).toEqual(expectText);
    });
});


describe('generate receipt body', () => {
    it('should return all items printable format when given the items', () => {
        const expectText = `Coca Cola                       3          1
Pepsi-Cola                      5          2`;
        expect(generateReceiptBody([{"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},{"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2}])).toEqual(expectText);
    });
});

describe('get total price', () => {
    it('should return all items total price format when given the items', () => {
        expect(getTotalPrice([{"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},{"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2}])).toBe(13);
    });
});

describe('get receipt', () => {
    it('should return receipt at when given the items', () => {
        const receiptBody = `Coca Cola                       3          1
Pepsi-Cola                      5          2`;
        const expectText = `Receipts
------------------------------------------------------------
Coca Cola                       3          1
Pepsi-Cola                      5          2
------------------------------------------------------------
Price: 13`;
        expect(generateReceipt(receiptBody, 13)).toBe(expectText);
    });
});

describe('print receipt', () => {
    it('should return receipt at when given the items', () => {
        spyOn(console, 'log');
         const barcodes = ['0001', '0003', '0005', '0003'];
        const expectText = `Receipts
------------------------------------------------------------
Coca Cola                       3          1
Pepsi-Cola                      5          2
Dr Pepper                       7          1
------------------------------------------------------------
Price: 20`;
        printReceipt(barcodes);
        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});