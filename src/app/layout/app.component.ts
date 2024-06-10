import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './maincomponent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-azure';
  constructor() {}
  ngOnInit() {}
}
