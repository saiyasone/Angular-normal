import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
  }

  onFetchData() {
    this.cartService
      .getAllCartItem()
      .pipe(map((el) => el.cart))
      .subscribe({
        next: (response) => {
          this.cart = response;
        },
        error: () => {},
        complete: () => {},
      });
  }

  onDelete(item: Cart) {
    // this.cartService.setCartID = item._id;
    // this.cartService.setUserID = this.cart.userId;
    this.cartService.setProductID = item.productId._id;
    this.cartService.deleteCart().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.onFetchData();
      },
    });
  }

  onShopOrder() {
    this.router.navigate(['/']);
  }

  onOrders() {
    this.cartService.createOrder().subscribe({
      next: () => {
        this.onFetchData();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
