import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { AuthHttpService } from "@api/services/auth-http.service";
import { finalize, first } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  credential = {
    email: '',
    password: ''
  }

  constructor(private authHttpService: AuthHttpService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    console.log(this.credential);
    this.authHttpService.login(this.credential)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: user => console.log("Login in", user),
        error: error => console.log("error login in"),
      });
  }
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    CommonModule,
    FormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule,
    RippleModule
  ]
})
export class LoginModule {
}
