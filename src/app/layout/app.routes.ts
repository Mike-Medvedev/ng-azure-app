import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './maincomponent.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoadingComponent } from './pages/loading/loading.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'callback', component: LoadingComponent },
  { path: 'main', component: MainComponent, children: [] },
];
