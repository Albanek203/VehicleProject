import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from "@modules/main/main.routing";
import { MainLayoutComponent } from './layout/main-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    routing,
    CommonModule
  ]
})
export class MainModule { }
