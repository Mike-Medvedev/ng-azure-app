import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  header!: HttpHeaders;
  constructor(private http: HttpClient, private tokenSvc: TokenService) {}

  getArtist(): Observable<string> {
    return this.http.get('https://api.spotify.com/v1/artists/7rN3Agir6FaZNfhf5V7mfN').pipe(
      map((data: any): string => {
        return data.images[0].url;
      }),
    );
  }

  search(query: string): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/search?' + query + '&type=album,artist,track');
  }
}
