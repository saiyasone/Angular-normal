import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  errors: any[] = [];
  form!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl('f@'),
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

    this.authService.register().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let errors = [];
        err.error.forEach((err) => {
          errors.push({ ...err });
        });
        this.errors = errors;
      },
      complete: () => {},
    });
  }
}
