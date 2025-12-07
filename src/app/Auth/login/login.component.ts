import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../../interfaces/AuthInterface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // Needed for routerLink
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  OnSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const dto = this.loginForm.getRawValue() as LoginDto;

    this.authService.login(dto).subscribe({
      next: (res) => {
        this.loading = false;
        // Save tokens
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('refreshTokenExpiry', res.refreshTokenExpiry);

        // Save user info
        const user = res.user;
        localStorage.setItem('Name', user.name);
        localStorage.setItem('Email', user.email);

        alert('User logged in successfully!');
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        this.loading = false;

        console.error(err);
        alert(err?.error?.message || 'Login failed, please try again.');
      },
    });
  }

  resetForm() {
    this.loginForm.reset();
    this.loading = false;
  }
}
