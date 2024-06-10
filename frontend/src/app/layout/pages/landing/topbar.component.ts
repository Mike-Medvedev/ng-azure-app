import { Component } from '@angular/core';
import { Navlink } from '../../shared/navlink.component';
@Component({
  selector: 'topbar-section',
  standalone: true,
  imports: [Navlink],
  template: `
    <div class="flex justify-content-around align-items-center p-3 ">
      <div class="flex gap-3 align-items-center h-full">
        <i
          class="pi pi-spin pi-headphones text-6xl"
          style="background: linear-gradient(0.75turn, rgb(221, 145, 13), rgb(22, 159, 187)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        ></i>
        <div
          class="text-6xl"
          style="background: linear-gradient(0.75turn, rgb(221, 145, 13), rgb(22, 159, 187)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >
          Fizzle
        </div>
      </div>
      <div class="flex-column ">
        <div
          class=" text-center text-6xl text-800 font-bold"
          style="background: linear-gradient(0.75turn, rgb(221, 145, 13), rgb(22, 159, 187)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >
          Discover Your Next Favorite Song
        </div>
      </div>
      <Navlink></Navlink>
    </div>
  `,
  styles: ``,
})
export class Topbar {}
