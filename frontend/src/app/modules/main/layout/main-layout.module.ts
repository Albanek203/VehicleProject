import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from "@modules/main/layout/main-layout.component";
import { RouterOutlet } from "@angular/router";
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet
  ]
})
export class MainLayoutModule { }
