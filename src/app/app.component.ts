import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-azure';
  image!: string;
  searchForm = this.fb.group({
    search: [''],
  });
  song!: string;
  artist!: string;
  playback!: string;
  constructor(private api: ApiService, private fb: FormBuilder) {}
  ngOnInit() {
    this.api.getArtist().subscribe((data) => {
      this.image = data.images[0].url;
    });

    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchValue) => {});
  }

  search() {
    const q = `q=${this.searchForm.get('search')?.value}`;
    this.api.search(q).subscribe((data) => {
      this.song = data.tracks.items[0].name;
      this.image = data.tracks.items[0].album.images[0].url;
      this.artist = data.tracks.items[0].artists[0].name;
      this.playback = data.tracks.items[0].preview_url;
      console.log(this.playback);
      console.log(data);
    });
  }
}
