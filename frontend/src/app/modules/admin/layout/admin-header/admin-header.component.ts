import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { AuthHttpService } from "@api/services/auth-http.service";
import { SecurityService } from "@services/security.service";
import { first } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
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
        label: `Signed in as\n${ this.userName }`,
        visible: isAuthenticated
      },
      {
        separator: true,
        items: [
          {
            label: 'Website',
            icon: 'fa-solid fa-globe',
            routerLink: '/'
          }
        ]
      },
      {
        separator: true,
        items: [
          {
            label: 'Your profile',
            icon: 'fa-solid fa-user',
            routerLink: '/profile',
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
