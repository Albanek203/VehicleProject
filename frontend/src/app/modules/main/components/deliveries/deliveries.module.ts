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
import { ImageModule } from "primeng/image";
import { DividerModule } from "primeng/divider";
import { FieldsetModule } from "primeng/fieldset";
import { PanelModule } from "primeng/panel";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { BlockUIModule } from "primeng/blockui";

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
        InputTextModule,
        ImageModule,
        DividerModule,
        FieldsetModule,
        PanelModule,
        CardModule,
        RippleModule,
        DialogModule,
        InputTextareaModule,
        ConfirmPopupModule,
        BlockUIModule
    ]
})
export class DeliveriesModule {
}
