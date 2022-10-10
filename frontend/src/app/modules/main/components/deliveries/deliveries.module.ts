import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { RouterModule, Routes } from "@angular/router";
import { DeliveryComponent } from './delivery/delivery.component';
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

const routes: Routes = [
  { path: '', component: DeliveryListComponent },
  { path: 'item', component: DeliveryComponent },
  { path: 'item/:id', component: DeliveryComponent }
]

@NgModule({
  declarations: [
    DeliveryListComponent,
    DeliveryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    RatingModule,
    DataViewModule,
    DropdownModule,
    ButtonModule,
    InputTextModule
  ]
})
export class DeliveriesModule {
}
