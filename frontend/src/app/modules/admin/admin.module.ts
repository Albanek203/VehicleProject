import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from "@modules/admin/admin.routing";
import { AdminLayoutComponent } from './layout/admin-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    routing,
    CommonModule
  ]
})
export class AdminModule { }
