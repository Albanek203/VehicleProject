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
import { SecurityService } from "@services/security.service";
import { PasswordModule } from "primeng/password";
import { MessageService } from 'primeng/api';

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

  constructor(private authHttpService: AuthHttpService,
              private securityService: SecurityService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.authHttpService.login(this.credential)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: user => {
          console.log(user);
          this.securityService.login(user);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login in' });
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Login in' })
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
    RippleModule,
    PasswordModule
  ]
})
export class LoginModule {
}
