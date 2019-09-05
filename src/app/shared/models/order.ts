import { ShoppingCard } from './shoppingCard';

export class Order {

    constructor(public cart: ShoppingCard, public form)  {} 

    get totalMoney() {
       let count = 0;
       this.cart.items.forEach(element => {
           console.log(`to jest ilosc produktu ${element.amount.quantity}  -------------- to jest cena tego produktu ${element.price}`);
           count += element.amount.quantity * element.product.price;
           console.log(`to jest aktualna cena totalna po przejsciu ${count}`);
        });
       return count;
    }
}