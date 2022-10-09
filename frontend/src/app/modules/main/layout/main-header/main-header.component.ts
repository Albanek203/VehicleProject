import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { first } from "rxjs";
import { AuthHttpService } from "@api/services/auth-http.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  isLoginIn: boolean = false;
  userName: string = 'albanekpiss2222@gmail.com';

  userMenuItems: MenuItem[] = [
    {
      label: `Signed in as\n${ this.userName }`
    },
    {
      separator: true,
      items: [
        {
          label: 'Admin panel',
          icon: 'fa-solid fa-screwdriver-wrench',
          routerLink: '/admin'
        }
      ]
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
          }
        }
      ]
    },
    {
      separator: true,
      items: [
        {
          label: 'Sign out',
          icon: 'fa-solid fa-right-from-bracket',
          command: () => this.logout()
        }
      ]
    }
  ];

  constructor(private authHttpService: AuthHttpService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authHttpService.logout()
      .pipe(first())
      .subscribe({
        next: user => console.log("log out"),
        error: error => console.log("error log out"),
      });
  }

  signUp() {
    console.log("signUp");
  }
}
