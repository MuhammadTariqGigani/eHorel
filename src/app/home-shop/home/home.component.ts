import { DbService } from '../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DbService) { }

 ngOnInit() {

}

}