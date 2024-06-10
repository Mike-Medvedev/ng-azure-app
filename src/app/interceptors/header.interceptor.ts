import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { tap, switchMap, mergeMap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // const tokenSvc = inject(TokenService);

  // const isTokenRequest = req.url.includes('https://accounts.spotify.com/api/token');

  // const test = req.url.includes('https://api.spotify.com/v1/artists/');

  // if (!isTokenRequest) {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     return next(
  //       req.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }),
  //     );
  //   } else {
  //     return tokenSvc.getToken().pipe(
  //       tap((token: string) => {
  //         localStorage.setItem('token', token);
  //       }),
  //       mergeMap((token: string) => {
  //         return next(
  //           req.clone({
  //             setHeaders: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }),
  //         );
  //       }),
  //     );
  //   }
  // } else {
  //   return next(req);
  // }
  return next(req);
};
