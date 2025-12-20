import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DashboardChartDto,
  PagedResultDto,
  TransactionCreateDto,
  TransactionDashboardCardsDto,
  TransactionInputDto,
  TransactionReadDto,
} from '../../interfaces/transactionInterface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private appUrl = 'https://localhost:44360/api/Transaction/';

  constructor(private http: HttpClient) {}

  // GET: /api/Transaction/get-transaction-dashboard-cards
  getDashboardCards(): Observable<TransactionDashboardCardsDto> {
    return this.http.get<TransactionDashboardCardsDto>(
      `${this.appUrl}get-transaction-dashboard-cards`
    );
  }
  // GET: /api/Transaction/get-transaction-dashboard-chart
  getDashboardChartCards(): Observable<DashboardChartDto[]> {
    return this.http.get<DashboardChartDto[]>(
      `${this.appUrl}get-dashboard-chart`
    );
  }

  // POST: /api/Transaction/add-transaction
  addTransaction(data: TransactionCreateDto): Observable<TransactionCreateDto> {
    return this.http.post<TransactionCreateDto>(
      `${this.appUrl}add-transaction`,
      data
    );
  }

  // Get: /api/Transaction/get-all-transactions
  getAllTransactions(
    input: TransactionInputDto
  ): Observable<PagedResultDto<TransactionReadDto>> {
    let params = new HttpParams();

    Object.entries(input).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PagedResultDto<TransactionReadDto>>(
      `${this.appUrl}get-all-transactions`,
      { params }
    );
  }
}
