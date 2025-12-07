import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userName: string | null = '';
  isSidebarOpen = false;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    // Get logged-in user name from localStorage
    this.userName = localStorage.getItem('Name');
  }

  OnLogout() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      // No refresh token — just clear storage and redirect
      localStorage.clear();
      this.router.navigate(['/login']);
      return;
    }

    this.authService.logout({ refreshToken }).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
        alert('Logged out successfully.');
      },
      error: (err) => {
        // Even if API fails, force logout on client
        alert(err?.error?.message || 'Logout failed, please try again.');
      },
    });
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }
}
