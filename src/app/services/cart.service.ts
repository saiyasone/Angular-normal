import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:5000/api';
  private productId!: number | string;
  private cartId!: number;
  private userId!: number;

  constructor(private http: HttpClient, private authService: AuthService) {}

  set setProductID(value: number | string) {
    this.productId = value;
  }
  set setCartID(value: number) {
    this.cartId = value;
  }
  set setUserID(value: number) {
    this.userId = value;
  }

  // Sequelize
  // getAllCartItem(): Observable<{ cart: Cart }> {
  //   return this.http.get<{ cart: Cart }>(this.url + '/products/cart');
  // }

  getAllCartItem(): Observable<{ cart: Cart[] }> {
    return this.http.get<{ cart: Cart[] }>(this.url + '/products/cart', {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }
  getCartItemCount(): Observable<{ count: any }> {
    return this.http.get<{ count: any }>(this.url + '/products/cart-count');
  }
  getOrder(): Observable<any> {
    return this.http.get<any>(this.url + '/products/order', {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }

  createCart(): Observable<any> {
    return this.http.post<any>(
      this.url + '/products/cart',
      {
        productId: this.productId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }

  createOrder(): Observable<any> {
    return this.http.post<any>(
      this.url + '/products/order',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }
  //  ============ Sequelize =============
  // createOrder(): Observable<any> {
  //   return this.http.post<any>(this.url + '/order', {});
  // }

  // Mongo DB
  deleteCart(): Observable<any> {
    return this.http.post<any>(
      this.url + '/products/cart/delete',
      {
        productId: this.productId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }
  //  ============ Sequelize =============
  // deleteCart(): Observable<any> {
  //   return this.http.post<any>(this.url + '/products/cart/delete', {
  //     productId: this.productId,
  //     cartId: this.cartId,
  //     userId: this.userId,
  //   });
  // }
}
