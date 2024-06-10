import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../src/app/layout/app.config';
import { AppComponent } from '../src/app/layout/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
