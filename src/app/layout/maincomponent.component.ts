import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { ApiService } from "../services/api.service";
import { catchError, map, Observable, tap } from "rxjs";
import { ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { Footer } from "./pages/landing/footer.component";
import { Navlink } from "./shared/navlink.component";
import { Profile } from "../model/profile";

@Component({
  selector: "main-component",
  standalone: true,
  imports: [
    Footer,
    Navlink,
    ButtonModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./maincomponent.component.html",
  styleUrl: "./maincomponent.component.scss",
})
export class MainComponent implements OnInit {
  title = "ng-azure";
  searchResult$!: Observable<any>;
  songRec$!: Observable<any>;
  profile$!: Observable<Profile>;
  code_verifier!: any;
  searchForm!: FormGroup;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [""],
    });
    const queryParams = this.route.snapshot.queryParams;
    const code = queryParams["code"];
    const code_verifier = localStorage.getItem("code_verifier");
    this.fetchProfile();
  }

  logout() {
    this.router.navigate([""]);
  }

  search() {
    const q = `q=${this.searchForm.get("search")?.value}`;
    this.searchResult$ = this.api.search(q).pipe(
      map((r: any) => {
        return r.tracks.items[0];
      }),
      catchError(err => {
        console.error(err.message);
        throw new Error(err);
      }),
    );
  }

  rec() {
    const input = this.searchForm.get("search")?.value;
    if (input) {
      this.songRec$ = this.api.rec(input).pipe(
        map((r: any) => {
          const response: string = r.prompt[0];
          return response.replaceAll(/\n/g, "");
        }),
      );
    } else {
      console.error("Error no input");
    }
  }

  fetchProfile() {
    this.profile$ = this.api.fetchProfile().pipe();
  }
}
