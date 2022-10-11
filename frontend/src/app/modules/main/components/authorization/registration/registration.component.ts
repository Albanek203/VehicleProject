import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Role } from "@api/models/enum/Role";
import { finalize, first } from "rxjs";
import { AuthHttpService } from "@api/services/auth-http.service";
import { MessageService } from "primeng/api";
import { SecurityService } from "@services/security.service";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { SelectButtonModule } from "primeng/selectbutton";
import { RadioButtonModule } from "primeng/radiobutton";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  loading: boolean = false;
  stateOptions: any[] = [{ label: 'Customer', value: 'CUSTOMER' }, { label: 'Transporter', value: 'TRANSPORTER' }]
  credential = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: Role.CUSTOMER
  }
  confirmPassword: string = '';

  constructor(private authHttpService: AuthHttpService,
              private securityService: SecurityService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    if(this.confirmPassword !== this.credential.password) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The passwords do not match' });
      return;
    }
    this.loading = true;
    this.authHttpService.register(this.credential)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => {
          this.authHttpService.login({
            email: this.credential.email,
            password: this.credential.password
          }).pipe()
            .subscribe({
              next: user => {
                this.securityService.login(user);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login in' });
                this.messageService.add({
                  severity: 'info',
                  summary: 'Information',
                  detail: 'Go to your profile and fill in the details',
                  life: 10000
                });
              },
              error: () => this.router.navigate(['/login'])
            });
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register' });
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Register' })
      });
  }
}

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: RegistrationComponent }]),
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    DividerModule,
    SelectButtonModule,
    RadioButtonModule
  ]
})
export class RegistrationModule {
}
