import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from "@angular/common/http";
import { TokenService } from "./token.service";
import { environment } from "../../environments/environments";
import { Profile } from "../model/profile";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // header!: HttpHeaders;
  data_payload = new BehaviorSubject({});
  constructor(private http: HttpClient, private tokenSvc: TokenService) {}
  // getArtist(): Observable<string> {
  //   return this.http.get('https://api.spotify.com/v1/artists/7rN3Agir6FaZNfhf5V7mfN').pipe(
  //     map((data: any): string => {
  //       return data.images[0].url;
  //     }),
  //   );
  // }
  search(query: string): Observable<{}> {
    const q = { query: query };
    return this.http.post(`${environment.api_url}/search`, q);
  }

  rec(query: string): Observable<{}> {
    console.log("making request", query);
    return this.http.post(`${environment.api_url}/rec`, { prompt: query });
  }

  fetchProfile() {
    return this.http.get<Profile>(`${environment.api_url}/profile`);
  }
}
