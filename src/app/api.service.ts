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
    ' Bearer  BQAUBgrp5o7pt8ii8NgyP89LCMnqFHkIcUwZQQ8l38dlGldexHdMtsPpDEe1yqqGi41z9iSRCFfBapu9yWuiTrkp6TvSesz-nyBiJOcGwefxQBMHeoA'
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
