import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
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
import queryString from 'query-string';
import { ActivatedRoute, Router } from '@angular/router';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  exchangeCodeForToken(): void {
    const queryParams = this.route.snapshot.queryParams;
    const code = queryParams['code'];
    const code_verifier = localStorage.getItem('code_verifier');

    this.http
      .post(`${environment.api_url}/exchangeCodeforToken`, {
        code: code,
        code_verifier: code_verifier,
      })
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 3000);
        },
        error: err => {
          console.error(err);
          throw new Error('Error details: ' + err.message);
        },
      });
  }
  // private accessTokenSubject = new BehaviorSubject<string>('');
  // private expiry: number = 0;
  // redirect_uri = 'http://localhost:4200/';
  // scope = 'user-read-private user-read-email';
  // constructor(private http: HttpClient) {}
  // userAuth() {
  //   console.log('hi-');
  //   this.http.get(
  //     'https://accounts.spotify.com/authorize?' +
  //       queryString.stringify({
  //         response_type: 'code',
  //         client_id: environment.client_id,
  //         scope: this.scope,
  //         redirect_uri: this.redirect_uri,
  //       }),
  //   );
  // }
  // requestToken() {
  //   const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //   const body = `grant_type=client_credentials&client_id=${environment.client_id}&client_secret=${environment.client_secret}`;
  //   this.http
  //     .post<TokenResponse>('https://accounts.spotify.com/api/token', body, {
  //       headers: header,
  //     })
  //     .pipe(
  //       tap(res => {
  //         this.accessTokenSubject.next(res.access_token);
  //         localStorage.setItem('token', res.access_token);
  //         this.expiry = res.expires_in;
  //         this.startTokenTimer();
  //       }),
  //       catchError(err => {
  //         console.error('Failed to request token', err);
  //         throw 'Error requesting token. Details: ' + err;
  //       }),
  //     )
  //     .subscribe();
  // }
  // getToken(): Observable<string> {
  //   return this.accessTokenSubject.asObservable();
  // }
  // private startTokenTimer() {
  //   const now = Date.now();
  //   const nextHour = new Date(now + 3600000);
  //   const delayToNextHour = nextHour.getTime() - now;
  //   timer(delayToNextHour, 3600000).subscribe(() => {
  //     this.requestToken();
  //   });
  // }
}
