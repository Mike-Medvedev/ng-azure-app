import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { ApiService } from './api.service';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessTokenSubject = new BehaviorSubject<string>('');
  private expiry: number = 0;
  constructor(private http: HttpClient) {}

  requestToken() {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=client_credentials&client_id=${environment.client_id}&client_secret=${environment.client_secret}`;

    this.http
      .post<TokenResponse>('https://accounts.spotify.com/api/token', body, {
        headers: header,
      })
      .pipe(
        tap(res => {
          this.accessTokenSubject.next(res.access_token);
          localStorage.setItem('token', res.access_token);
          this.expiry = res.expires_in;
          this.startTokenTimer();
        }),
        catchError(err => {
          console.error('Failed to request token', err);
          throw 'Error requesting token. Details: ' + err;
        }),
      )
      .subscribe();
  }

  getToken(): Observable<string> {
    return this.accessTokenSubject.asObservable();
  }

  private startTokenTimer() {
    // Calculate the delay to the next hour boundary
    const now = Date.now();
    const nextHour = new Date(now + 3600000); // Add 1 hour in milliseconds
    const delayToNextHour = nextHour.getTime() - now;

    // Start the timer with the calculated delay and a period of 1 hour
    timer(delayToNextHour, 3600000).subscribe(() => {
      this.requestToken();
    });
  }
}
