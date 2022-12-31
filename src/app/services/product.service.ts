import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:5000/api';
  private id!: string;
  private title!: string;
  private note!: string;
  private image!: any;
  private price!: number;

  constructor(private http: HttpClient, private authService: AuthService) {}

  set setID(value: string) {
    this.id = value;
  }
  set setTitle(value: string) {
    this.title = value;
  }
  set setPrice(value: number) {
    this.price = value;
  }
  set setImage(value: any) {
    this.image = value;
  }
  set setNote(value: string) {
    this.note = value;
  }

  getAllProduct(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.url + '/products', {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.url + '/products/getOne/' + this.id);
  }

  createProduct(): Observable<any> {
    const f: FormData = new FormData();
    f.append('title', this.title);
    f.append('note', this.note);
    f.append('price', this.price.toString());
    f.append('image', this.image);
    return this.http.post<any>(this.url + '/products', f, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
  }

  updateProduct(): Observable<any> {
    return this.http.put(
      this.url + '/products',
      {
        productId: this.id,
        title: this.title,
        price: this.price,
        note: this.note,
        imageUrl: this.image,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }

  deleteProduct(): Observable<any> {
    return this.http.post(
      this.url + '/products/delete',
      {
        productId: this.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }
}
