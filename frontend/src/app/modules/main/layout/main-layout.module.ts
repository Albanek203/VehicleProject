import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from "@modules/main/layout/main-layout.component";
import { RouterOutlet } from "@angular/router";

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet
  ]
})
export class MainLayoutModule { }
