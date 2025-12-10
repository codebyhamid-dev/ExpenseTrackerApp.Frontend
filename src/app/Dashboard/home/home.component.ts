import { Component } from '@angular/core';
import { TransactionDashboardCardsDto } from '../../../interfaces/transactionInterface';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dashboardCards?: TransactionDashboardCardsDto; //interface
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getDashboardCards().subscribe({
      next: (res) => {
        this.dashboardCards = res;
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
      },
    });
  }
}
