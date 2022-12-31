import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl('f@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('1', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  onSignIn() {
    if (this.form.invalid) {
      return;
    }

    this.authService.setEmail = this.f['email'].value;
    this.authService.setPassword = this.f['password'].value;

    this.authService.login().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
