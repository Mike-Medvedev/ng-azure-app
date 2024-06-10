import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { environment } from "../../../../environments/environments";

@Component({
  selector: "main-section",
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="flex flex-column justify-content-center align-items-center h-full gap-3">
      <div class="text-xl text-300">Explore Ai generated Music Recommendations</div>
      <div class="text-center">
        <p-button (click)="login()">Login with Spotify</p-button>
      </div>
    </div>
  `,
  styleUrl: "./landing.component.scss",
})
export class MainSection {
  clientId: string = environment.client_id;
  redirectUri: string = environment.redirect_url;
  scope: string = "user-read-private user-read-email";

  constructor(private http: HttpClient, private router: Router) {}

  async login() {
    const codeVerifier = this.generateRandomString(64);
    localStorage.setItem("code_verifier", codeVerifier);

    const codeChallenge = await this.pkce_challenge_from_verifier(codeVerifier);

    const authUrl: URL = new URL("https://accounts.spotify.com/authorize");
    const params: any = {
      response_type: "code",
      client_id: this.clientId,
      scope: this.scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  private generateRandomString = (length: number): string => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(values)
      .map(x => possible[x % possible.length])
      .join("");
  };

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }

  private base64urlencode(a: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(a)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  private async pkce_challenge_from_verifier(v: any): Promise<string> {
    const hashed = await this.sha256(v);
    const base64encoded = this.base64urlencode(hashed);
    return base64encoded;
  }
}
