import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  getSubscription(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`);
  }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }

  updateSubscription(id: number, subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${id}`, subscription);
  }

  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
