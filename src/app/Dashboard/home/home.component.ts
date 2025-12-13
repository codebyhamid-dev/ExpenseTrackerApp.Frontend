import { Component, HostListener, OnInit } from '@angular/core';
import {
  DashboardChartDto,
  TransactionDashboardCardsDto,
} from '../../../interfaces/transactionInterface';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';

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
export class HomeComponent implements OnInit {
  dashboardCards?: TransactionDashboardCardsDto;

  pieChartData: any[] = [];

  // Responsive chart settings
  view: [number, number] = [700, 350];
  showLegend = true;
  legendPosition: LegendPosition = LegendPosition.Right;

  legendTitle = 'Expenses';

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#4caf50',
      '#f44336',
      '#2196f3',
      '#ff9800',
      '#9c27b0',
      '#00bcd4',
      '#e91e63',
      '#8bc34a',
      '#ffc107',
      '#795548',
      '#607d8b',
    ],
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.updateChartLayout();
    this.loadDashboardCards();
    this.loadDashboardChart();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartLayout();
  }

  updateChartLayout() {
    const width = window.innerWidth;

    // Desktop
    if (width >= 1200) {
      this.view = [900, 400];
      this.legendPosition = LegendPosition.Right;
      this.showLegend = true;
    }
    // Tablet
    else if (width >= 768) {
      this.view = [650, 350];
      this.legendPosition = LegendPosition.Below;
      this.showLegend = true;
    }
    // Mobile
    else {
      this.view = [width - 30, 300];
      this.legendPosition = LegendPosition.Below;
      this.showLegend = false;
    }
  }

  loadDashboardCards() {
    this.transactionService.getDashboardCards().subscribe({
      next: (res) => (this.dashboardCards = res),
      error: (err) => console.error('Error loading dashboard stats:', err),
    });
  }

  loadDashboardChart() {
    this.transactionService.getDashboardChartCards().subscribe({
      next: (res: DashboardChartDto[]) => {
        this.pieChartData = res.map((item) => ({
          name: `${item.category} (${item.percentage}%)`,
          value: item.amount,
        }));
      },
      error: (err) => console.error('Error loading chart data:', err),
    });
  }
}
