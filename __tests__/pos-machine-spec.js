
const {printReceipt, findItemByBarcode, tagItems} = require('../pos-machine');

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

describe('tag items', () => {
    it('should return item details when find the item', () => {
        const expectText = [{"id": "0001", "name" : "Coca Cola", "price": 3, "count": 1},
            {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count": 2},
            {"id": "0005", "name" : "Dr Pepper", "price": 7, "count": 1}];
        expect(tagItems(['0001', '0003', '0005', '0003'])).toEqual(expectText);
    });
});
