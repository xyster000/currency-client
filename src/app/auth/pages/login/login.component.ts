import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MATERIAL } from '../../../shared/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMON } from '../../../shared/common';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, ...MATERIAL, ...COMMON],
})
export class LoginComponent {
  errorMessage = '';

  form!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        console.log('...redirecting')
        this.router.navigate(['/currency']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.errorMessage = 'Account not found. Please sign up first.';
        } else if (err.status === 401) {
          this.errorMessage = 'Incorrect password.';
        }
      },
    });
  }
  signup() {
    this.router.navigate(['/auth/signup']);
  }
}

