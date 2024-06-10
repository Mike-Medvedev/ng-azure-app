import { Component } from '@angular/core';

@Component({
  selector: 'Navlink',
  standalone: true,
  imports: [],
  template: `<div class="flex gap-3 h-full">
    <a
      href="https://www.instagram.com"
      target="_blank"
      class="text-decoration: no-underline flex justify-content-center align-items-center"
    >
      <i class="pi pi-instagram text-2xl"></i>
    </a>
    <a
      href="https://www.github.com"
      target="_blank"
      class="text-decoration: no-underline flex justify-content-center align-items-center"
    >
      <i class="pi pi-github text-2xl"></i>
    </a>
    <a
      href="https://www.youtube.com"
      target="_blank"
      class="text-decoration: no-underline flex justify-content-center align-items-center"
    >
      <i class="pi pi-youtube text-2xl"></i>
    </a>
    <a
      href="https://www.spotify.com"
      target="_blank"
      class="text-decoration: no-underline flex justify-content-center align-items-center"
      ><i class="pi pi-headphones text-2xl"></i
    ></a>
  </div>`,
  styles: ``,
})
export class Navlink {}
