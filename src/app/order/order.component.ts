import { ShoppingCartService } from './../shopping-cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { ShoppingCard } from '../models/shoppingCard';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form;
  cart$: Observable<ShoppingCard>;
  items: ShoppingCard;

  constructor(private fb: FormBuilder,
              private cart: ShoppingCartService,
              private order: OrderService) { }

  async ngOnInit() {
    this.form = this.fb.group({
      contact: this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        postCode: ['', Validators.required],
        phone: ['', Validators.required],
        mail: ['', Validators.required],
      }),
      paymants: this.fb.group ({
        paymentType : ['', Validators.required],
        delivery : ['', Validators.required]
      })
    });
    this.cart$ = await this.cart.getCart();
    this.cart$.subscribe( res => this.items = res);
}
  makeOrder() {
    this.order.makeOrder(new Order(this.items, this.form));
  }
}
