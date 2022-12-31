import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './reset-password.component.html',
  styles: [''],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get f() {
    return this.form.controls;
  }

  onResetPassword() {
    if (this.form) {
      return this.form.markAllAsTouched();
    }
  }
}
