
const {printReceipt, findItemByBarcode} = require('../pos-machine');

it('sample test', () => {
    expect(printReceipt()).toBe(0);
});

describe('find item by barcode', () => {
    it('should return item details when find the item', () => {
        expect(findItemByBarcode('0001')).toEqual({"id": "0001", "name" : "Coca Cola", "price": 3});
    });

    it('should return undefined when not find the item', () => {
        expect(findItemByBarcode('')).toBeUndefined();
    });
});
