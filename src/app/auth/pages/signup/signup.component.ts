import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MATERIAL } from '../../../shared/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMON } from '../../../shared/common';
@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, ...MATERIAL, ...COMMON],
})
export class SignupComponent {
  form!: FormGroup;
  errorMessage = ''
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.auth.signup(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.errorMessage =
            'Account already exists. Please log in.';
        } else {
          this.errorMessage = 'Signup failed. Try again.';
        }
      },
    });
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
}

