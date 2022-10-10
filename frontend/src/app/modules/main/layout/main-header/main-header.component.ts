import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { first } from "rxjs";
import { AuthHttpService } from "@api/services/auth-http.service";
import { SecurityService } from "../../../../services/security.service";
import { Role } from "@api/models/enum/Role";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  userName: string = this.securityService.getUser()?.email;

  userMenuItems: MenuItem[] = [];

  constructor(private authHttpService: AuthHttpService,
              private securityService: SecurityService) {
    this.initUserMenuItem();

    // TODO: unsubscribe an destroy
    this.securityService.isAuthenticated$.subscribe(isAuthenticated => {
      this.initUserMenuItem();
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.authHttpService.logout()
      .pipe(first())
      .subscribe({
        next: user => {
          console.log("log out");
          this.securityService.logout();
        },
        error: error => console.log(error),
      });
  }

  initUserMenuItem() {
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
        visible: !this.securityService.isAuthenticated()
      },
      {
        label: `Signed in as\n${ this.userName }`,
        visible: this.securityService.isAuthenticated()
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
            command: () => {
              console.log("Link your profile");
            }
          },
          {
            label: 'Your deliveries',
            icon: 'fa-solid fa-truck',
            command: () => {
              console.log("Link your deliveries");
            },
            visible: this.securityService.hasRole(Role.CUSTOMER)
          }
        ],
        visible: this.securityService.isAuthenticated()
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
        visible: this.securityService.isAuthenticated()
      }
    ];
  }
}
