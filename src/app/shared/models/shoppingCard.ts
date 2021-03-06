export class ShoppingCard {
    constructor(public items) {}

    get totalCountOfProduct() {
        let count = 0;
        this.items.forEach(element => {
            count += element.amount.quantity;
        });

        return count;
    }

    get totalCountOfPrice() {
        let count = 0;

        this.items.forEach(element => {
            count += element.amount.quantity * element.product.price;
        });
        return count.toFixed(2);
    }

}
