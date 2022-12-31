import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated = false;
  constructor(private authService: AuthService) {
    authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }

  logout() {
    this.authService.signOut();
  }
}
