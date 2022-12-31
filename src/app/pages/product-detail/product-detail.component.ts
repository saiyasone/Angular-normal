import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  isAuthenticated = false;
  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      if (data.get('id')) {
        this.productService.setID = data.get('id') || '';
        this.productService.getProduct().subscribe({
          next: (res) => {
            this.product = res;
          },
          error: (er) => {
            console.log(er);
          },
          complete: () => {},
        });
      }
    });
  }

  onAddCart() {
    this.cartService.setProductID = this.product._id;
    this.cartService.createCart().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });
  }
}
