import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  header = new HttpHeaders().set(
    'Authorization',
    ' Bearer  BQBKg4rzxaB37UzHmSvW4wHUP5WNqEWOKgLdOdvLwY7o2a-URGrplSRzbCfc7ZPwT3w62qiszDWxc9x6AbbsHz_PXLQSHFKdIcUcJDdI09HgSzeC4n4'
  );
  constructor(private http: HttpClient) {}

  getArtist(): Observable<any> {
    return this.http.get(
      'https://api.spotify.com/v1/artists/7rN3Agir6FaZNfhf5V7mfN',
      { headers: this.header }
    );
  }

  search(query: string): Observable<any> {
    return this.http.get(
      'https://api.spotify.com/v1/search?' + query + '&type=album,artist,track',
      {
        headers: this.header,
      }
    );
  }
}
