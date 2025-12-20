import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { noAuthGuard } from './no-auth.guard';
import { authGuard } from './auth.guard';
import { TransactionComponent } from './Dashboard/transaction/transaction.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { CreateTransactionComponent } from './transactions/create-transaction/create-transaction.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // This is the layout/shell
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home
      { path: 'home', component: HomeComponent }, // Dashboard content
      { path: 'transactions', component: TransactionComponent }, // Transactions content
      // ✅ FIXED CREATE ROUTE
      { path: 'transactions/create', component: CreateTransactionComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
