import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { first } from "rxjs";
import { AuthHttpService } from "@api/services/auth-http.service";
import { SecurityService } from "@services/security.service";
import { Role } from "@api/models/enum/Role";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  userName: string = this.securityService.getUser()?.email;
  userMenuItems: MenuItem[] = [];

  constructor(private authHttpService: AuthHttpService,
              private securityService: SecurityService,
              private messageService: MessageService) {
    this.initUserMenuItem();

    this.securityService.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe(isAuthenticated => {
        this.initUserMenuItem(isAuthenticated);
      });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authHttpService.logout()
      .pipe(first())
      .subscribe({
        next: () => this.securityService.logout(),
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: `Logout users` })
      });
  }

  initUserMenuItem(isAuthenticated: boolean = this.securityService.isAuthenticated()) {
    this.userMenuItems = [
      {
        label: 'Authorization',
        items: [
          {
            label: 'Sign in',
            icon: 'fa-solid fa-right-from-bracket',
            routerLink: '/login'
          },
          {
            label: 'Sign up',
            icon: 'fa-regular fa-address-card',
            routerLink: '/registration'
          }
        ],
        visible: !isAuthenticated
      },
      {
        label: `Signed in as\n${ this.userName }`,
        visible: isAuthenticated
      },
      {
        separator: true,
        items: [
          {
            label: 'Admin panel',
            icon: 'fa-solid fa-screwdriver-wrench',
            routerLink: '/admin'
          }
        ],
        visible: this.securityService.hasRole(Role.ADMIN)
      },
      {
        separator: true,
        items: [
          {
            label: 'Your profile',
            icon: 'fa-solid fa-user',
            routerLink: '/profile'
          },
          {
            label: 'Your deliveries',
            icon: 'fa-solid fa-truck',
            routerLink: '/profile',
            visible: this.securityService.hasRole(Role.CUSTOMER)
          },
          {
            label: 'Your offers',
            icon: 'fa-solid fa-truck',
            routerLink: '/profile',
            visible: this.securityService.hasRole(Role.TRANSPORTER)
          }
        ],
        visible: isAuthenticated
      },
      {
        separator: true,
        items: [
          {
            label: 'Sign out',
            icon: 'fa-solid fa-right-from-bracket',
            command: () => this.logout()
          }
        ],
        visible: isAuthenticated
      }
    ];
  }
}
