import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {
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

  onDelete(id: number | string) {
    this.productService.setID = id.toString();

    this.productService.deleteProduct().subscribe({
      next: () => {},
      error: (er) => {
        console.log(er.error.message);
      },
      complete: () => {
        this.onFetchData();
      },
    });
  }
}
