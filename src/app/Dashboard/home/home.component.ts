import { Component, HostListener } from '@angular/core';
import {
  DashboardChartDto,
  TransactionDashboardCardsDto,
} from '../../../interfaces/transactionInterface';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    CurrencyPipe,
    NgxChartsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dashboardCards?: TransactionDashboardCardsDto; //interface

  // Pie chart data
  pieChartData: any[] = [];
  view: [number, number] = [500, 350];

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#4caf50', // green
      '#f44336', // red
      '#2196f3', // blue
      '#ff9800', // orange
      '#9c27b0', // purple
      '#00bcd4', // cyan
      '#e91e63', // pink
      '#8bc34a', // light green
      '#ffc107', // amber
      '#795548', // brown
      '#607d8b', // blue grey
    ],
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadDashboardCards();
    this.loadDashboardChart();
  }

  chartWidth = window.innerWidth > 1200 ? 1000 : window.innerWidth - 50;

  @HostListener('window:resize')
  onResize() {
    this.chartWidth = window.innerWidth > 1200 ? 1000 : window.innerWidth - 50;
  }

  // Load dashboard cards
  loadDashboardCards() {
    this.transactionService.getDashboardCards().subscribe({
      next: (res) => (this.dashboardCards = res),
      error: (err) => console.error('Error loading dashboard stats:', err),
    });
  }

  // Load pie chart data
  loadDashboardChart() {
    this.transactionService.getDashboardChartCards().subscribe({
      next: (res: DashboardChartDto[]) => {
        // Convert API data to ngx-charts format with percentage in label
        this.pieChartData = res.map((item) => ({
          name: `${item.category} (${item.percentage}%)`,
          value: item.amount,
        }));
      },
      error: (err) => console.error('Error loading chart data:', err),
    });
  }
}
