import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css'],
})
export class ProductListComponent implements OnDestroy {
  userId: string;
  isAuthenticated: boolean = false;
  imgPath = 'http://localhost:5000/images/'
  @Input() isAdmin = false;
  @Input() product!: Product;
  @Output() delEmit = new EventEmitter<number | string>();
  onDestroy$ = new Subject<void>();
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {
    authService.userId$.pipe(takeUntil(this.onDestroy$)).subscribe((user) => {
      this.userId = user;
    });
    authService.isAuthenticated$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((auth) => {
        this.isAuthenticated = auth;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onEdit(id: number | string) {
    this.router.navigate(['/add-product', id]);
  }

  onDel(id: number | string) {
    this.delEmit.emit(id);
  }

  AddCart(id: number | string) {
    this.cartService.setProductID = id;

    this.cartService.createCart().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });
  }
}
