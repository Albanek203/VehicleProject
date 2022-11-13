import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    CommonModule,
    ButtonModule,
    RippleModule
  ]
})
export class DashboardModule {
}
