import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
    CommonModule
  ]
})
export class UsersModule { }
