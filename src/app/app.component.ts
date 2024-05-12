import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TokenService } from './token.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  title = 'ng-azure';
  image!: string;
  searchForm = this.fb.group({
    search: [''],
  });
  song!: string;
  artist!: string;
  playback!: string;
  isLoading = false;
  artistImage$: Observable<string> = this.api.getArtist();
  constructor(private api: ApiService, private fb: FormBuilder, private tokenSvc: TokenService) {}
  ngOnInit() {
    this.tokenSvc.requestToken();

    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(searchValue => {});
  }

  search() {
    this.isLoading = true;
    const q = `q=${this.searchForm.get('search')?.value}`;
    this.api.search(q).subscribe({
      next: data => {
        this.song = data.tracks.items[0].name;
        this.artistImage$ = of(data.tracks.items[0].album.images[0].url);
        this.artist = data.tracks.items[0].artists[0].name;
        this.playback = data.tracks.items[0].preview_url;
        console.log(this.playback);
        console.log(data);
      },
      error: () => {
        console.error('Error searching spotify');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
