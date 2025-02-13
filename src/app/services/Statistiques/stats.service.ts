import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private customersUrl = 'http://localhost:8080/api/customers';
  private subscriptionsUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return forkJoin({
      customers: this.http.get<any[]>(this.customersUrl),
      subscriptions: this.http.get<any[]>(this.subscriptionsUrl)
    });
  }
}
