import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TransactionReadDto } from '../../../interfaces/transactionInterface';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import {
  GridModule,
  PageService,
  SortService,
  FilterService,
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    GridModule,
  ],
  providers: [SortService, PageService, FilterService],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  transactions: TransactionReadDto[] = [];

  pageSettings = { pageSize: 10, currentPage: 1 };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService
      .getAllTransactions({
        skipCount: 0,
        maxResultCount: 50,
        sortDescending: true,
      })
      .subscribe((res) => {
        this.transactions = res.items;
      });
  }

  // ValueAccessor for enums
  transactionTypeValueAccessor = (field: string, data: TransactionReadDto) => {
    return data.transactionType === 0 ? 'Credit' : 'Debit';
  };

  paymentModeValueAccessor = (field: string, data: TransactionReadDto) => {
    return ['Cash', 'Bank', 'Card'][data.paymentMode] ?? '';
  };

  // Edit transaction
  editTransaction(id: string) {
    console.log('Edit transaction:', id);
    // Add your edit logic here
  }

  // Delete transaction
  deleteTransaction(id: string) {
    console.log('Delete transaction:', id);
    // Add your delete logic here
  }

  // Filter search box
  onSearch(event: any) {
    const value = event.target.value.toLowerCase();
    this.transactions = this.transactions.filter((t) =>
      t.category?.toLowerCase().includes(value)
    );
  }
}
