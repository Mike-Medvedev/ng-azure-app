import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token.service';
import { tap, switchMap, mergeMap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSvc = inject(TokenService);

  // Check if the request URL is the token endpoint
  const isTokenRequest = req.url.includes('https://accounts.spotify.com/api/token');

  const test = req.url.includes('https://api.spotify.com/v1/artists/');

  // Get the token only if it's not a token request
  if (!isTokenRequest) {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists in local storage, directly use it
      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    } else {
      // If token doesn't exist in local storage, fetch it from the service
      return tokenSvc.getToken().pipe(
        // Save the token to local storage when fetched
        tap((token: string) => {
          localStorage.setItem('token', token);
        }),
        // Use the token in the request headers
        mergeMap((token: string) => {
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            }),
          );
        }),
      );
    }
  } else {
    // If it's a token request, proceed without modifying the request
    return next(req);
  }
};
