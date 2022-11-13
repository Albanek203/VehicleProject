import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RestPage } from "@api/models/RestPage";
import { Delivery } from "@api/models/Delivery";
import { DeliveryHttpService } from "@api/services/delivery-http.service";
import { Pagination } from "@api/models/Pagination";
import { finalize, first } from "rxjs";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { MessageService } from "primeng/api";
import { PrimeNgUtil } from "@api/utils/PrimeNgUtil";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  deliveries: RestPage<Delivery> = new RestPage<Delivery>();
  loading: boolean = false;

  constructor(private deliveryHttpService: DeliveryHttpService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onLazyLoad(event: any) {
    this.loadDeliveries(PrimeNgUtil.ngPrimeTableFiltersToParams(event.filters), Pagination.fromPrimeNg(event));
  }

  loadDeliveries(filters: { [key: string]: string } = {}, pagination: Pagination = new Pagination()) {
    this.loading = true;
    console.log(pagination)
    this.deliveryHttpService.getAll(filters, pagination)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: deliveries => this.deliveries = deliveries,
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Load deliveries' })
      })
  }
}

@NgModule({
  declarations: [
    DeliveriesComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: DeliveriesComponent }]),
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule
  ]
})
export class DeliveriesModule {
}
