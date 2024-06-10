import { Component } from '@angular/core';
import { Footer } from './footer.component';
import { MainSection } from './mainsection.component';
import { Topbar } from './topbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MainSection, Topbar, Footer],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
