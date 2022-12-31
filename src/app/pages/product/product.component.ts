import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
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
        next: (response) => {
          // console.log(response);
          this.products = response;
        },
        error: () => {},
        complete: () => {},
      });
  }
}
