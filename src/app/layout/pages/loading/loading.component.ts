import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { TokenService } from '../../../services/token.service';
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ProgressBarModule],
  template: ` <div class="h-full w-full flex justify-content-center align-items-center">
    <div class="flex flex-column h-full w-3 justify-content-center">
      <p-progressBar mode="indeterminate" [style]="{ height: '6px' }" />
    </div>
  </div>`,
  styles: ``,
})
export class LoadingComponent {
  constructor(private tokenSvc: TokenService) {}

  ngOnInit() {
    this.tokenSvc.exchangeCodeForToken();
  }
}
