import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    RippleModule
  ]
})
export class AdminLayoutModule { }
