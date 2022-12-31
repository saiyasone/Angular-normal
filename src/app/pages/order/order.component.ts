import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
    this.cartService
      .getOrder()
      .pipe(map((el) => el.order))
      .subscribe({
        next: (response) => {
          this.orders = response;
        },
        complete: () => {},
      });
  }
}
