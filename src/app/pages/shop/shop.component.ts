import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './shop.component.html',
  // styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
    this.productService
      .getAllProduct()
      .pipe(map((product) => product.products))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        complete: () => {},
      });
  }

  onFilter(id: number) {
    this.productService.setID = id.toString();
    this.productService.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (er) => {
        console.log(er);
      },
      complete: () => {},
    });
  }
}
