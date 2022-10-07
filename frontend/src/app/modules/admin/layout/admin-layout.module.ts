import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminLayoutModule { }
