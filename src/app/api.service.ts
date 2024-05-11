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
    ' Bearer  BQAz2QDBmTdQBPs6A0-xUTGdnCJgqWC0iUszaPhfv9OGNWcvBwlYuXeHAOpZUHJ5T_92Siwe1BPkTZOyE0uygz4sqGIcmu8VHWwWzKspAyFDLFlyHKE'
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
